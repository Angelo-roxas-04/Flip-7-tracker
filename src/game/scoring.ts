/**
 * Pure scoring helpers. Given a hand's cards, derive its point value.
 * Duplicates are never stored in a hand (the reducer rejects or busts on
 * them), so every number card present is unique.
 */

import { FLIP7_BONUS } from '@/game/cards';
import { Card, Hand } from '@/game/types';

export type HandBreakdown = {
  numberSum: number;
  uniqueCount: number;
  hasMultiplier: boolean;
  flatBonus: number;
  flip7Bonus: number;
  /** Final hand value assuming the player stays (not busted). */
  total: number;
};

export function computeBreakdown(cards: Card[]): HandBreakdown {
  let numberSum = 0;
  let uniqueCount = 0;
  let hasMultiplier = false;
  let flatBonus = 0;

  for (const card of cards) {
    if (card.kind === 'number') {
      numberSum += card.value;
      uniqueCount += 1;
    } else if (card.kind === 'modifier') {
      if (card.modifier === 'x2') hasMultiplier = true;
      else flatBonus += Number(card.modifier);
    }
  }

  const flip7Bonus = uniqueCount === 7 ? FLIP7_BONUS : 0;
  const total = (hasMultiplier ? numberSum * 2 : numberSum) + flatBonus + flip7Bonus;

  return { numberSum, uniqueCount, hasMultiplier, flatBonus, flip7Bonus, total };
}

/** Points a hand banks: its computed total, or 0 if the player busted. */
export function bankedValue(hand: Hand): number {
  if (hand.status === 'busted') return 0;
  return computeBreakdown(hand.cards).total;
}

/** True when adding this number would duplicate one already in the hand. */
export function isDuplicateNumber(cards: Card[], value: number): boolean {
  return cards.some((c) => c.kind === 'number' && c.value === value);
}

/** A hand auto-completes when it reaches all 7 unique numbers ("Flip 7"). */
export function hasFlip7(cards: Card[]): boolean {
  return computeBreakdown(cards).uniqueCount === 7;
}
