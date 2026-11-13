import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TOTAL_DURATION,
  formatSkyTime,
  getDifficultyFactor,
  getSkyRank,
  spawnSkyEntity,
  stepSkyDescent,
  type KeyState,
  type SkyEntity,
  type SkyPlayer,
} from '../game/skyDescentLogic';

interface CloudLayerItem {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  alpha: number;
}

interface SkyStar {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

interface WindStreak {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface FloatingPopup {
  active: boolean;
  x: number;
  y: number;
  vy: number;
  life: number;
  text: string;
  color: string;
}

const MAX_PARTICLES = 64;
const MAX_POPUPS = 12;

export const SkyDescentMiniGame: React.FC = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [displaySeconds, setDisplaySeconds] = useState(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState(false);

  const gameStateRef = useRef<'start' | 'playing' | 'ended'>('start');
  const isMountedRef = useRef(true);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const scoreRef = useRef(0);
  const comboRef = useRef(1);
  const timeLeftRef = useRef(TOTAL_DURATION);
  const lastDisplaySecRef = useRef(TOTAL_DURATION);
  const lastFrameTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const nextEntityIdRef = useRef(1);
  const shakeTraumaRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const sizeRef = useRef({ width: 380, height: 520, dpr: 1 });
  const playerRef = useRef<SkyPlayer>({
    x: 190,
    y: 118,
    vx: 0,
    speed: 410,
    radius: 22,
    tilt: 0,
    flashTimer: 0,
    flashColor: '#38bdf8',
  });
  const keysRef = useRef<KeyState>({ left: false, right: false });
  const entitiesRef = useRef<SkyEntity[]>([]);

  // Background atmosphere pools
  const starsRef = useRef<SkyStar[]>([]);
  const cloudsRef = useRef<CloudLayerItem[]>([]);
  const streaksRef = useRef<WindStreak[]>([]);

  // Zero-GC fixed ring buffers for particles & floating popups
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: MAX_PARTICLES }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0.4,
      size: 3,
      color: '#38bdf8',
    }))
  );
  const particleCursorRef = useRef(0);

  const popupsRef = useRef<FloatingPopup[]>(
    Array.from({ length: MAX_POPUPS }, () => ({
      active: false,
      x: 0,
      y: 0,
      vy: -55,
      life: 0,
      text: '',
      color: '#fbbf24',
    }))
  );
  const popupCursorRef = useRef(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const playTone = useCallback(
    (freq: number, type: OscillatorType, duration: number, vol = 0.05) => {
      if (isMutedRef.current) return;
      try {
        if (!audioCtxRef.current) {
          const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!Ctx) return;
          audioCtxRef.current = new Ctx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(now + duration);
      } catch {
        // Ignore browser audio restriction
      }
    },
    []
  );

  const emitParticles = (x: number, y: number, color: string, count: number) => {
    const pool = particlesRef.current;
    for (let i = 0; i < count; i++) {
      const idx = particleCursorRef.current;
      particleCursorRef.current = (idx + 1) % MAX_PARTICLES;
      const p = pool[idx];
      const angle = Math.random() * Math.PI * 2;
      const spd = 65 + Math.random() * 145;
      p.active = true;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * spd;
      p.vy = Math.sin(angle) * spd - 40;
      p.maxLife = 0.32 + Math.random() * 0.22;
      p.life = p.maxLife;
      p.size = 2.5 + Math.random() * 3;
      p.color = color;
    }
  };

  const emitPopup = (x: number, y: number, text: string, color: string) => {
    const pool = popupsRef.current;
    const idx = popupCursorRef.current;
    popupCursorRef.current = (idx + 1) % MAX_POPUPS;
    const pop = pool[idx];
    pop.active = true;
    pop.x = x;
    pop.y = y;
    pop.vy = -65;
    pop.life = 0.65;
    pop.text = text;
    pop.color = color;
  };

  const initAtmosphere = useCallback(() => {
    const { width, height } = sizeRef.current;
    starsRef.current = Array.from({ length: 34 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 45 + 25,
      alpha: 0.35 + Math.random() * 0.55,
    }));
    cloudsRef.current = Array.from({ length: 7 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      w: 84 + Math.random() * 90,
      h: 26 + Math.random() * 16,
      speed: 55 + Math.random() * 75,
      alpha: 0.08 + Math.random() * 0.1,
    }));
    streaksRef.current = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 28 + Math.random() * 46,
      speed: 240 + Math.random() * 180,
      alpha: 0.14 + Math.random() * 0.18,
    }));
  }, []);

  const resizeCanvas = useCallback(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = stage.clientWidth || 380;
    const height = stage.clientHeight || 520;
    sizeRef.current = { width, height, dpr };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    playerRef.current.y = Math.min(126, Math.max(96, Math.round(height * 0.23)));
    playerRef.current.x = Math.max(32, Math.min(width - 32, playerRef.current.x));
  }, []);

  const renderCanvas = useCallback((dt: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Camera trauma shake
    let shakeX = 0;
    let shakeY = 0;
    if (shakeTraumaRef.current > 0) {
      const mag = shakeTraumaRef.current * shakeTraumaRef.current * 11;
      shakeX = (Math.random() * 2 - 1) * mag;
      shakeY = (Math.random() * 2 - 1) * mag;
      shakeTraumaRef.current = Math.max(0, shakeTraumaRef.current - dt * 2.6);
    }
    ctx.save();
    ctx.translate(shakeX, shakeY);

    // 1. Twinkling high-altitude stars (drifting upward as player descends)
    for (const s of starsRef.current) {
      s.y -= s.speed * dt;
      if (s.y < -4) {
        s.y = height + 4;
        s.x = Math.random() * width;
      }
      ctx.fillStyle = `rgba(186, 230, 253, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Parallax cloud silhouettes rising from below
    for (const c of cloudsRef.current) {
      c.y -= c.speed * dt;
      if (c.y < -50) {
        c.y = height + 50;
        c.x = Math.random() * width;
      }
      ctx.fillStyle = `rgba(125, 211, 252, ${c.alpha})`;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x - c.w * 0.25, c.y + 4, c.w * 0.32, c.h * 0.4, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x + c.w * 0.25, c.y + 4, c.w * 0.3, c.h * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Vertical sky-dive wind streaks
    ctx.lineWidth = 1.5;
    for (const st of streaksRef.current) {
      st.y -= st.speed * dt;
      if (st.y < -st.len) {
        st.y = height + st.len;
        st.x = Math.random() * width;
      }
      ctx.strokeStyle = `rgba(56, 189, 248, ${st.alpha})`;
      ctx.beginPath();
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(st.x, st.y + st.len);
      ctx.stroke();
    }

    // 4. Floating treasures & sky obstacles
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (const ent of entitiesRef.current) {
      const renderX = Math.max(
        24,
        Math.min(width - 24, ent.x + Math.sin(ent.swayPhase) * ent.swayAmp)
      );

      // Halo ring to differentiate treasures vs storm obstacles cleanly
      ctx.beginPath();
      ctx.arc(renderX, ent.y, ent.radius + 5, 0, Math.PI * 2);
      ctx.fillStyle =
        ent.kind === 'good' ? 'rgba(56, 189, 248, 0.16)' : 'rgba(239, 68, 68, 0.22)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle =
        ent.kind === 'good' ? 'rgba(186, 230, 253, 0.45)' : 'rgba(248, 113, 113, 0.65)';
      ctx.stroke();

      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(ent.icon, renderX, ent.y + 1);
    }

    // 5. Descending Sky Diver Player (Parachute canopy + Chibi adventurer)
    const player = playerRef.current;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.tilt);

    // Hit / pickup glow ring
    if (player.flashTimer > 0) {
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fillStyle = player.flashColor === '#ef4444'
        ? 'rgba(239, 68, 68, 0.32)'
        : 'rgba(56, 189, 248, 0.30)';
      ctx.fill();
    }

    // Parachute cords
    ctx.strokeStyle = 'rgba(186, 230, 253, 0.75)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-22, -26);
    ctx.lineTo(-7, -2);
    ctx.moveTo(22, -26);
    ctx.lineTo(7, -2);
    ctx.moveTo(0, -30);
    ctx.lineTo(0, -4);
    ctx.stroke();

    // Midgard Sky Canopy
    const canopyGrad = ctx.createLinearGradient(-26, -42, 26, -24);
    canopyGrad.addColorStop(0, '#38bdf8');
    canopyGrad.addColorStop(0.5, '#818cf8');
    canopyGrad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = canopyGrad;
    ctx.beginPath();
    ctx.arc(0, -24, 26, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#e0f2fe';
    ctx.stroke();

    // Descending adventurer badge
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🧙‍♂️', 0, 6);
    ctx.restore();

    // 6. Pooled particles
    for (const p of particlesRef.current) {
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 7. Pooled floating score popups
    ctx.font = '800 14px Outfit, sans-serif';
    for (const pop of popupsRef.current) {
      if (!pop.active) continue;
      pop.life -= dt;
      if (pop.life <= 0) {
        pop.active = false;
        continue;
      }
      pop.y += pop.vy * dt;
      ctx.globalAlpha = Math.min(1, pop.life * 2);
      ctx.fillStyle = pop.color;
      ctx.fillText(pop.text, pop.x, pop.y);
    }
    ctx.globalAlpha = 1;

    ctx.restore();
  }, []);

  const endGame = useCallback(() => {
    isPlayingRef.current = false;
    gameStateRef.current = 'ended';
    document.body.dataset.state = 'gameover';
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    keysRef.current.left = false;
    keysRef.current.right = false;
    setDisplaySeconds(0);
    setGameState('ended');
    playTone(523.25, 'triangle', 0.14, 0.06);
    setTimeout(() => {
      if (isMountedRef.current) playTone(659.25, 'triangle', 0.18, 0.06);
    }, 110);
    setTimeout(() => {
      if (isMountedRef.current) playTone(783.99, 'triangle', 0.25, 0.07);
    }, 220);
  }, [playTone]);

  const gameLoop = useCallback(
    (now: number) => {
      if (!isPlayingRef.current) return;
      const dt = Math.min((now - lastFrameTimeRef.current) / 1000, 0.05);
      lastFrameTimeRef.current = now;

      const difficulty = getDifficultyFactor(timeLeftRef.current, TOTAL_DURATION);
      const spawnInterval = 0.56 - difficulty * 0.22; // 0.56s down to 0.34s

      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        const { width, height } = sizeRef.current;
        entitiesRef.current.push(
          spawnSkyEntity(nextEntityIdRef.current++, width, height, difficulty)
        );
      }

      const stepped = stepSkyDescent({
        player: playerRef.current,
        entities: entitiesRef.current,
        keys: keysRef.current,
        width: sizeRef.current.width,
        height: sizeRef.current.height,
        dt,
        timeLeft: timeLeftRef.current,
        score: scoreRef.current,
        combo: comboRef.current,
      });

      timeLeftRef.current = stepped.timeLeft;
      const ceilSec = Math.max(0, Math.ceil(stepped.timeLeft));
      if (ceilSec !== lastDisplaySecRef.current) {
        lastDisplaySecRef.current = ceilSec;
        setDisplaySeconds(ceilSec);
      }

      if (stepped.score !== scoreRef.current) {
        scoreRef.current = stepped.score;
        setScore(stepped.score);
      }
      if (stepped.combo !== comboRef.current) {
        comboRef.current = stepped.combo;
        setCombo(stepped.combo);
      }

      for (const ev of stepped.result.events) {
        emitParticles(ev.x, ev.y, ev.color, ev.kind === 'good' ? 10 : 18);
        emitPopup(ev.x, ev.y - 12, ev.text, ev.color);
      }

      if (stepped.result.pickedGood) {
        playTone(580 + comboRef.current * 28, 'sine', 0.09, 0.05);
      }
      if (stepped.result.hitBad) {
        shakeTraumaRef.current = 0.85;
        playTone(135, 'sawtooth', 0.18, 0.06);
      }

      if (stepped.result.ended) {
        endGame();
        return;
      }

      renderCanvas(dt);
      rafIdRef.current = requestAnimationFrame(gameLoop);
    },
    [endGame, playTone, renderCanvas]
  );

  const startGame = useCallback(() => {
    if (gameStateRef.current === 'ended') return; // Single-play enforcement: 1 play -> CTA

    scoreRef.current = 0;
    comboRef.current = 1;
    timeLeftRef.current = TOTAL_DURATION;
    lastDisplaySecRef.current = TOTAL_DURATION;
    entitiesRef.current = [];
    spawnTimerRef.current = 0;
    shakeTraumaRef.current = 0;
    keysRef.current.left = false;
    keysRef.current.right = false;

    for (const p of particlesRef.current) p.active = false;
    for (const pop of popupsRef.current) pop.active = false;

    setScore(0);
    setCombo(1);
    setDisplaySeconds(TOTAL_DURATION);
    gameStateRef.current = 'playing';
    document.body.dataset.state = 'playing';
    setGameState('playing');

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    requestAnimationFrame(() => {
      if (!isMountedRef.current) return;
      resizeCanvas();
      initAtmosphere();
      playerRef.current.x = sizeRef.current.width / 2;
      playerRef.current.vx = 0;
      playerRef.current.tilt = 0;
      isPlayingRef.current = true;
      lastFrameTimeRef.current = performance.now();
      rafIdRef.current = requestAnimationFrame(gameLoop);
    });
  }, [gameLoop, initAtmosphere, resizeCanvas]);

  useEffect(() => {
    isMountedRef.current = true;
    document.body.dataset.state = 'title';
    resizeCanvas();
    initAtmosphere();
    renderCanvas(0.016);

    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      startGame();
    }

    const handleResize = () => {
      if (gameStateRef.current !== 'ended') {
        resizeCanvas();
        if (!isPlayingRef.current) renderCanvas(0.016);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === 'ArrowLeft' || k === 'a') {
        if (isPlayingRef.current && e.key === 'ArrowLeft') e.preventDefault();
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || k === 'd') {
        if (isPlayingRef.current && e.key === 'ArrowRight') e.preventDefault();
        keysRef.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === 'ArrowLeft' || k === 'a') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || k === 'd') keysRef.current.right = false;
    };

    const clearHeldKeys = () => {
      keysRef.current.left = false;
      keysRef.current.right = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearHeldKeys);
    document.addEventListener('visibilitychange', clearHeldKeys);

    return () => {
      isMountedRef.current = false;
      isPlayingRef.current = false;
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearHeldKeys);
      document.removeEventListener('visibilitychange', clearHeldKeys);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, [initAtmosphere, renderCanvas, resizeCanvas, startGame]);

  return (
    <section
      id="sky-descent"
      className="py-16 lg:py-24 bg-[#030712] relative overflow-hidden border-b border-sky-400/25"
    >
      {/* Celestial Sky Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* =========================================================
          RAGNARÖK: DESCENT FROM THE SKY — PC HARDCORE EDITION
        ========================================================= */}
        <div className="flex justify-center items-center w-full py-2">
          <div
            data-testid="sky-descent-frame"
            data-game-state={gameState}
            className="w-full max-w-[420px] h-[680px] max-h-[88dvh] min-h-[520px] flex flex-col overflow-hidden relative select-none rounded-[24px] border-2 border-sky-400/70"
            style={{
              background: 'linear-gradient(180deg, #0c1828 0%, #030712 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.9), 0 0 35px rgba(56, 189, 248, 0.25)',
            }}
          >
            {/* Top RPG HUD Bar */}
            <header className="p-3 bg-[#080e1a]/95 border-b border-sky-400/30 flex flex-col gap-2 z-[3]">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-sky-400"
                  style={{ boxShadow: '0 0 10px #38bdf8' }}
                />
                <span className="text-[11px] font-black tracking-[0.15em] text-sky-200">
                  MIDGARD SKY DESCENT
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-[10px] bg-slate-900/95 border border-sky-400/30">
                  <span className="text-[10px] font-extrabold text-slate-400">SCORE</span>
                  <strong
                    data-testid="sky-score"
                    className="text-[15px] font-black text-white tabular-nums"
                  >
                    {score.toLocaleString()}
                  </strong>
                </div>

                <div className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-[10px] bg-slate-900/95 border border-sky-400/30">
                  <span className="text-[10px] font-extrabold text-slate-400">TIME</span>
                  <strong
                    data-testid="sky-timer"
                    className="text-[15px] font-black text-amber-400 tabular-nums"
                  >
                    {formatSkyTime(displaySeconds)}
                  </strong>
                </div>

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setIsMuted((prev) => !prev);
                  }}
                  title="Toggle Sound"
                  aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                  className="w-[34px] h-[34px] rounded-[10px] border border-sky-400/40 bg-slate-900/95 text-white text-[15px] leading-none cursor-pointer flex items-center justify-center hover:border-sky-300 transition-colors"
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </header>

            {/* Game Stage */}
            <div
              ref={stageRef}
              className="relative flex-1 w-full overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 50% 20%, #1e3a8a 0%, #0f172a 70%, #020617 100%)',
              }}
            >
              <canvas
                ref={canvasRef}
                data-testid="sky-canvas"
                className={gameState === 'ended' ? 'hidden' : 'block w-full h-full'}
              />

              {/* Start Screen Overlay */}
              {gameState === 'start' && (
                <div className="absolute inset-0 p-5 flex items-center justify-center bg-[#030712]/90 z-[5]">
                  <div
                    className="w-full rounded-[20px] p-[22px] text-center border-[1.5px] border-sky-400/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}
                  >
                    <div
                      className="text-[42px] mb-2"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.7))' }}
                    >
                      ✨🪂
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black text-sky-200 bg-sky-400/20 border border-sky-400/40 mb-2">
                      DESCEND FROM THE SKY
                    </span>
                    <h2 className="m-0 mb-2 text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400">
                      Midgard Sky Dive
                    </h2>
                    <p className="m-0 mb-4 text-[13px] text-slate-300 leading-snug">
                      Control your character descending from the clouds! Use{' '}
                      <strong className="text-white">[ A / D ]</strong> or{' '}
                      <strong className="text-white">[ ← / → ]</strong> to dodge obstacles and catch
                      floating treasures!
                    </p>

                    <button
                      type="button"
                      data-start="true"
                      onClick={startGame}
                      className="flex items-center justify-center w-full p-[13px] border-none rounded-[12px] text-[14px] font-black text-white cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(90deg, #0284c7, #2563eb)',
                        boxShadow: '0 8px 20px rgba(2, 132, 199, 0.4)',
                      }}
                    >
                      START DESCENT (02:00) ⚡
                    </button>
                    <p className="mt-2.5 text-[11px] text-slate-400 mb-0">
                      Controls: Keyboard Arrow Keys / A &amp; D
                    </p>
                  </div>
                </div>
              )}

              {/* Single-Play CTA Popup Overlay (00:00) */}
              {gameState === 'ended' && (
                <div className="absolute inset-0 p-5 flex items-center justify-center bg-[#030712]/94 z-[5]">
                  <div
                    className="w-full rounded-[20px] p-[22px] text-center border-[1.5px] border-sky-400/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}
                  >
                    <div
                      className="text-[42px] mb-2"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.7))' }}
                    >
                      🏆
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/40 mb-2">
                      LANDING COMPLETE!
                    </span>
                    <h2 className="m-0 mb-2 text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400">
                      Welcome to Midgard!
                    </h2>
                    <p className="m-0 mb-4 text-[13px] text-slate-300 leading-snug">
                      You successfully landed and claimed your adventurer rank!
                    </p>

                    <div className="bg-[#020617]/80 border border-sky-400/40 rounded-[14px] p-3 mb-4">
                      <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">
                        FINAL SCORE
                      </span>
                      <div className="text-[36px] font-black text-amber-400 my-1 leading-none tabular-nums">
                        {score.toLocaleString()}
                      </div>
                      <div className="text-[13px] font-extrabold text-sky-400">
                        {getSkyRank(score)}
                      </div>
                    </div>

                    <a
                      href="#go2offer#"
                      className="flex items-center justify-center w-full p-[13px] rounded-[12px] text-[14px] font-black text-slate-900 no-underline transition-transform hover:scale-[1.02]"
                      style={{
                        background: 'linear-gradient(90deg, #fbbf24, #fde047)',
                        boxShadow: '0 8px 25px rgba(251, 191, 36, 0.5)',
                      }}
                    >
                      DOWNLOAD &amp; PLAY NOW 🚀
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="px-3.5 py-2 bg-[#020617]/95 border-t border-sky-400/30 flex justify-between text-[10px] font-extrabold text-slate-400">
              <span>RAGNARÖK: THE NEW WORLD</span>
              <span data-testid="sky-combo" className="text-sky-400 tabular-nums">
                COMBO x{combo}
              </span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};
