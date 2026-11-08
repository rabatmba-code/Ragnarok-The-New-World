import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatZeny,
  calculateClassMatch,
  filterMarketItems,
  INITIAL_MARKET_STALLS,
  GAME_CLASSES,
} from './gameData.ts';

test('formatZeny formats millions and thousands properly', () => {
  assert.equal(formatZeny(18500000), '18.5M Zeny');
  assert.equal(formatZeny(450000), '450K Zeny');
  assert.equal(formatZeny(500), '500 Zeny');
});

test('calculateClassMatch returns correct class based on preference', () => {
  const wizard = calculateClassMatch({
    preferredCombat: 'magic',
    teamRole: 'solo',
    dailyGoal: 'dungeon',
  });
  assert.equal(wizard.id, 'wizard');

  const knight = calculateClassMatch({
    preferredCombat: 'frontline',
    teamRole: 'lead',
    dailyGoal: 'pvp',
  });
  assert.equal(knight.id, 'knight');

  const merchant = calculateClassMatch({
    preferredCombat: 'wealth',
    teamRole: 'solo',
    dailyGoal: 'trading',
  });
  assert.equal(merchant.id, 'whitesmith');
});

test('filterMarketItems filters correctly by category and search text', () => {
  const cards = filterMarketItems(INITIAL_MARKET_STALLS, '', 'Card');
  assert.ok(cards.length > 0);
  assert.ok(cards.every((c) => c.category === 'Card'));

  const searchResults = filterMarketItems(INITIAL_MARKET_STALLS, 'Ghostring', 'All');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].itemName, 'Ghostring MVP Card');
});

test('all game classes have valid stats and role', () => {
  assert.equal(GAME_CLASSES.length, 6);
  for (const c of GAME_CLASSES) {
    assert.ok(c.name.length > 0);
    assert.ok(c.keySkills.length >= 3);
    assert.ok(c.recommendedStats.str >= 0);
    assert.ok(c.recommendedStats.vit >= 0);
  }
});
