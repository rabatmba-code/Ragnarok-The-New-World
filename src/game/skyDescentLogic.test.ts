import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TOTAL_DURATION,
  formatSkyTime,
  getDifficultyFactor,
  getSkyRank,
  spawnSkyEntity,
  stepSkyDescent,
  type SkyEntity,
  type SkyPlayer,
} from './skyDescentLogic';

function makePlayer(x = 200, y = 120): SkyPlayer {
  return {
    x,
    y,
    vx: 0,
    speed: 400,
    radius: 22,
    tilt: 0,
    flashTimer: 0,
    flashColor: '#38bdf8',
  };
}

test('TOTAL_DURATION is 120 seconds and formats cleanly', () => {
  assert.equal(TOTAL_DURATION, 120);
  assert.equal(formatSkyTime(120), '02:00');
  assert.equal(formatSkyTime(61), '01:01');
  assert.equal(formatSkyTime(5.2), '00:06');
  assert.equal(formatSkyTime(0), '00:00');
});

test('getSkyRank assigns expected adventurer ranks', () => {
  assert.equal(getSkyRank(2500), 'S-Rank Sky Hero');
  assert.equal(getSkyRank(1400), 'A-Rank Cloud Ace');
  assert.equal(getSkyRank(300), 'B-Rank Midgard Diver');
});

test('spawnSkyEntity rises upward from bottom of viewport for sky descent illusion', () => {
  const ent = spawnSkyEntity(1, 380, 520, getDifficultyFactor(120), 0.1, 0.5, 0.5);
  assert.ok(ent.y > 520, 'newly spawned sky entity starts below bottom edge');
  assert.ok(ent.vy < 0, 'sky entity velocity moves upward relative to descending player');
});

test('player moves left/right via keyboard state and clamps inside bounds', () => {
  const player = makePlayer(45, 120);
  const step1 = stepSkyDescent({
    player,
    entities: [],
    keys: { left: true, right: false },
    width: 380,
    height: 520,
    dt: 0.05,
    timeLeft: 100,
    score: 0,
    combo: 1,
  });
  assert.ok(player.x < 45);
  assert.ok(player.x >= 32);
  assert.equal(step1.result.ended, false);

  for (let i = 0; i < 10; i++) {
    stepSkyDescent({
      player,
      entities: [],
      keys: { left: true, right: false },
      width: 380,
      height: 520,
      dt: 0.05,
      timeLeft: 100,
      score: 0,
      combo: 1,
    });
  }
  assert.equal(player.x, 32);
});

test('collecting treasure increments score & combo, hitting obstacle deducts score & resets combo', () => {
  const player = makePlayer(190, 120);
  const entities: SkyEntity[] = [
    {
      id: 1,
      kind: 'good',
      icon: '💎',
      points: 65,
      radius: 17,
      color: '#38bdf8',
      x: 190,
      y: 120,
      vy: -180,
      swayPhase: 0,
      swayAmp: 0,
    },
  ];

  const afterGood = stepSkyDescent({
    player,
    entities,
    keys: { left: false, right: false },
    width: 380,
    height: 520,
    dt: 0.016,
    timeLeft: 90,
    score: 0,
    combo: 1,
  });

  assert.equal(afterGood.result.pickedGood, true);
  assert.equal(afterGood.score, 71); // 65 + combo(1)*6
  assert.equal(afterGood.combo, 2);
  assert.equal(entities.length, 0);

  entities.push({
    id: 2,
    kind: 'bad',
    icon: '💣',
    points: -75,
    radius: 18,
    color: '#f97316',
    x: 190,
    y: 120,
    vy: -180,
    swayPhase: 0,
    swayAmp: 0,
  });

  const afterBad = stepSkyDescent({
    player,
    entities,
    keys: { left: false, right: false },
    width: 380,
    height: 520,
    dt: 0.016,
    timeLeft: 89,
    score: afterGood.score,
    combo: afterGood.combo,
  });

  assert.equal(afterBad.result.hitBad, true);
  assert.equal(afterBad.score, 0); // clamped >= 0
  assert.equal(afterBad.combo, 1);
});

test('timer reaching zero ends the round cleanly', () => {
  const player = makePlayer(190, 120);
  const res = stepSkyDescent({
    player,
    entities: [],
    keys: { left: false, right: false },
    width: 380,
    height: 520,
    dt: 0.04,
    timeLeft: 0.02,
    score: 1250,
    combo: 4,
  });
  assert.equal(res.timeLeft, 0);
  assert.equal(res.result.ended, true);
});
