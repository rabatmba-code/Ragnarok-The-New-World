import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectSupportedLanguage,
  getAngleHeroVariant,
  normalizeLanguageCode,
  parseAbAngle,
} from './trackingAndLocale';
import { GAME_CLASSES, calculateClassMatch } from './gameData';

test('normalizeLanguageCode maps en, id, th, zh variants cleanly', () => {
  assert.equal(normalizeLanguageCode('en-US'), 'en');
  assert.equal(normalizeLanguageCode('id-ID'), 'id');
  assert.equal(normalizeLanguageCode('th-TH'), 'th');
  assert.equal(normalizeLanguageCode('zh-Hans'), 'zh');
  assert.equal(normalizeLanguageCode('zh-CN'), 'zh');
  assert.equal(normalizeLanguageCode('fr-FR'), null);
});

test('detectSupportedLanguage prioritizes query param > storage > navigator > en', () => {
  assert.equal(
    detectSupportedLanguage({
      search: '?lang=th',
      stored: 'id',
      browserLanguages: ['zh-CN'],
    }),
    'th'
  );
  assert.equal(
    detectSupportedLanguage({
      search: '',
      stored: 'id',
      browserLanguages: ['zh-CN'],
    }),
    'id'
  );
  assert.equal(
    detectSupportedLanguage({
      search: '',
      stored: null,
      browserLanguages: ['es-ES', 'zh-CN'],
    }),
    'zh'
  );
  assert.equal(
    detectSupportedLanguage({
      search: '',
      stored: null,
      browserLanguages: ['de-DE'],
    }),
    'en'
  );
});

test('parseAbAngle sanitizes ?angle= query and falls back cleanly', () => {
  assert.equal(parseAbAngle('?angle=Druid'), 'druid');
  assert.equal(parseAbAngle('?angle=idle_2026!@#'), 'idle_2026');
  assert.equal(parseAbAngle('', 'new_era'), 'new_era');
  assert.equal(parseAbAngle('', null), 'default');
});

test('getAngleHeroVariant returns localized copy for druid, idle, and new_era angles', () => {
  assert.ok(getAngleHeroVariant('druid', 'en')?.badge.includes('DRUID'));
  assert.ok(getAngleHeroVariant('druid', 'zh')?.note.includes('德鲁伊'));
  assert.ok(getAngleHeroVariant('idle', 'id')?.badge.includes('IDLE'));
  assert.ok(getAngleHeroVariant('new_era', 'th')?.note.includes('Gravity Game Vision Limited'));
  assert.equal(getAngleHeroVariant('default', 'en'), null);
});

test('GAME_CLASSES contains 8 launch classes including shapeshifting Druid', () => {
  assert.equal(GAME_CLASSES.length, 8);
  const druid = GAME_CLASSES.find((c) => c.id === 'druid');
  assert.ok(druid, 'Druid launch class must exist');
  assert.equal(
    calculateClassMatch({
      preferredCombat: 'shapeshift',
      teamRole: 'lead',
      dailyGoal: 'dungeon',
    }).id,
    'druid'
  );
});
