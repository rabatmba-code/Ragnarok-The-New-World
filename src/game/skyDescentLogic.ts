export const TOTAL_DURATION = 120;

export interface SkyItemTemplate {
  kind: 'good' | 'bad';
  icon: string;
  label: string;
  points: number;
  radius: number;
  color: string;
  weight: number;
}

export const SKY_ITEM_TEMPLATES: readonly SkyItemTemplate[] = [
  { kind: 'good', icon: '🐱', label: '+Kitty', points: 35, radius: 18, color: '#f472b6', weight: 30 },
  { kind: 'good', icon: '💎', label: '+Gem', points: 65, radius: 17, color: '#38bdf8', weight: 28 },
  { kind: 'good', icon: '🌟', label: '+Star', points: 90, radius: 18, color: '#a78bfa', weight: 18 },
  { kind: 'good', icon: '👑', label: '+Crown', points: 140, radius: 20, color: '#fbbf24', weight: 10 },
  { kind: 'bad', icon: '⛈️', label: 'Storm', points: -50, radius: 20, color: '#ef4444', weight: 18 },
  { kind: 'bad', icon: '💣', label: 'Bomb', points: -75, radius: 18, color: '#f97316', weight: 16 },
] as const;

export interface SkyEntity {
  id: number;
  kind: 'good' | 'bad';
  icon: string;
  points: number;
  radius: number;
  color: string;
  x: number;
  y: number;
  vy: number; // Negative when rising upward relative to descending player
  swayPhase: number;
  swayAmp: number;
}

export interface SkyPlayer {
  x: number;
  y: number;
  vx: number;
  speed: number;
  radius: number;
  tilt: number;
  flashTimer: number;
  flashColor: string;
}

export interface KeyState {
  left: boolean;
  right: boolean;
}

export interface StepResult {
  ended: boolean;
  scoreDelta: number;
  pickedGood: boolean;
  hitBad: boolean;
  events: Array<{
    kind: 'good' | 'bad';
    x: number;
    y: number;
    text: string;
    color: string;
    combo: number;
  }>;
}

export function formatSkyTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export function getSkyRank(score: number): string {
  if (score >= 2200) return 'S-Rank Sky Hero';
  if (score >= 1100) return 'A-Rank Cloud Ace';
  return 'B-Rank Midgard Diver';
}

export function getDifficultyFactor(timeLeft: number, totalDuration = TOTAL_DURATION): number {
  const elapsed = Math.max(0, Math.min(totalDuration, totalDuration - timeLeft));
  return elapsed / Math.max(1, totalDuration); // 0 -> 1 over round
}

export function pickWeightedTemplate(
  difficulty: number,
  rand = Math.random()
): SkyItemTemplate {
  // Early seconds favor treasures (~78% good); ramps smoothly to ~62% good / 38% hazards
  const badMultiplier = 0.65 + difficulty * 0.85;
  const weighted = SKY_ITEM_TEMPLATES.map((t) => ({
    template: t,
    effectiveWeight: t.kind === 'bad' ? t.weight * badMultiplier : t.weight,
  }));
  const totalWeight = weighted.reduce((acc, item) => acc + item.effectiveWeight, 0);
  let roll = rand * totalWeight;
  for (const item of weighted) {
    roll -= item.effectiveWeight;
    if (roll <= 0) return item.template;
  }
  return SKY_ITEM_TEMPLATES[0];
}

export function spawnSkyEntity(
  id: number,
  width: number,
  height: number,
  difficulty: number,
  rand1 = Math.random(),
  rand2 = Math.random(),
  rand3 = Math.random()
): SkyEntity {
  const template = pickWeightedTemplate(difficulty, rand1);
  const margin = 34;
  const usableWidth = Math.max(40, width - margin * 2);
  const baseRiseSpeed = 165 + difficulty * 135;
  return {
    id,
    kind: template.kind,
    icon: template.icon,
    points: template.points,
    radius: template.radius,
    color: template.color,
    x: margin + rand2 * usableWidth,
    y: height + 34,
    vy: -(baseRiseSpeed + rand3 * 95),
    swayPhase: rand2 * Math.PI * 2,
    swayAmp: template.kind === 'good' ? 14 : 8,
  };
}

export function stepSkyDescent(state: {
  player: SkyPlayer;
  entities: SkyEntity[];
  keys: KeyState;
  width: number;
  height: number;
  dt: number;
  timeLeft: number;
  score: number;
  combo: number;
}): {
  timeLeft: number;
  score: number;
  combo: number;
  result: StepResult;
} {
  const clampedDt = Math.min(Math.max(state.dt, 0), 0.05);
  const nextTimeLeft = Math.max(0, state.timeLeft - clampedDt);

  const result: StepResult = {
    ended: nextTimeLeft <= 0,
    scoreDelta: 0,
    pickedGood: false,
    hitBad: false,
    events: [],
  };

  if (result.ended) {
    return {
      timeLeft: 0,
      score: state.score,
      combo: state.combo,
      result,
    };
  }

  // Responsive horizontal glider physics
  const dir = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
  const targetVx = dir * state.player.speed;
  const accel = 18;
  state.player.vx += (targetVx - state.player.vx) * Math.min(1, accel * clampedDt);
  state.player.x += state.player.vx * clampedDt;

  const minX = 32;
  const maxX = Math.max(minX, state.width - 32);
  if (state.player.x < minX) {
    state.player.x = minX;
    state.player.vx = 0;
  } else if (state.player.x > maxX) {
    state.player.x = maxX;
    state.player.vx = 0;
  }

  // Smooth parachute banking angle based on horizontal velocity
  const targetTilt = (state.player.vx / Math.max(1, state.player.speed)) * 0.28;
  state.player.tilt += (targetTilt - state.player.tilt) * Math.min(1, 14 * clampedDt);

  if (state.player.flashTimer > 0) {
    state.player.flashTimer = Math.max(0, state.player.flashTimer - clampedDt);
  }

  let nextScore = state.score;
  let nextCombo = state.combo;

  for (let i = state.entities.length - 1; i >= 0; i--) {
    const ent = state.entities[i];
    ent.swayPhase += clampedDt * 2.4;
    ent.y += ent.vy * clampedDt;
    const renderX = Math.max(24, Math.min(state.width - 24, ent.x + Math.sin(ent.swayPhase) * ent.swayAmp));

    const hitDistance = ent.kind === 'good'
      ? ent.radius + state.player.radius + 4
      : ent.radius + state.player.radius - 4;

    if (Math.hypot(renderX - state.player.x, ent.y - state.player.y) <= hitDistance) {
      if (ent.kind === 'good') {
        const gained = ent.points + nextCombo * 6;
        nextScore += gained;
        nextCombo = Math.min(nextCombo + 1, 15);
        result.scoreDelta += gained;
        result.pickedGood = true;
        state.player.flashTimer = 0.14;
        state.player.flashColor = ent.color;
        result.events.push({
          kind: 'good',
          x: renderX,
          y: ent.y,
          text: `+${gained}`,
          color: ent.color,
          combo: nextCombo,
        });
      } else {
        const prevScore = nextScore;
        nextScore = Math.max(0, nextScore + ent.points);
        nextCombo = 1;
        result.scoreDelta += nextScore - prevScore;
        result.hitBad = true;
        state.player.flashTimer = 0.22;
        state.player.flashColor = '#ef4444';
        result.events.push({
          kind: 'bad',
          x: renderX,
          y: ent.y,
          text: `${ent.points}`,
          color: '#ef4444',
          combo: 1,
        });
      }
      state.entities.splice(i, 1);
      continue;
    }

    // Remove entities that rose past the top of the sky viewport
    if (ent.y < -44) {
      state.entities.splice(i, 1);
    }
  }

  return {
    timeLeft: nextTimeLeft,
    score: nextScore,
    combo: nextCombo,
    result,
  };
}
