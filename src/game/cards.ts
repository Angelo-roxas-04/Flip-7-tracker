/**
 * Static card catalogue and presentation metadata for the tap grid.
 * Logic that consumes these lives in scoring.ts and gameReducer.ts.
 */

import { Card } from '@/game/types';

/** Number of points awarded for collecting all 7 unique number cards. */
export const FLIP7_BONUS = 15;

/** Hitting this cumulative score ends the game after the round resolves. */
export const WIN_THRESHOLD = 200;

export type CardKey = string;

/** A grid cell: the card it represents plus how to render it. */
export type CardDef = {
  key: CardKey;
  card: Card;
  /** Short label shown on the chip. */
  label: string;
  /** Accent color so action/modifier cards read differently from numbers. */
  accent: 'number' | 'modifier' | 'freeze' | 'flip3' | 'secondChance';
};

const numberDefs: CardDef[] = Array.from({ length: 12 }, (_, i) => {
  const value = i + 1;
  return {
    key: `n${value}`,
    card: { kind: 'number', value },
    label: String(value),
    accent: 'number',
  };
});

const modifierDefs: CardDef[] = (['x2', '+2', '+4', '+6', '+8', '+10'] as const).map(
  (modifier) => ({
    key: `m${modifier}`,
    card: { kind: 'modifier', modifier },
    label: modifier,
    accent: 'modifier',
  }),
);

const actionDefs: CardDef[] = [
  { key: 'aFreeze', card: { kind: 'action', action: 'freeze' }, label: 'Freeze', accent: 'freeze' },
  { key: 'aFlip3', card: { kind: 'action', action: 'flip3' }, label: 'Flip 3', accent: 'flip3' },
  {
    key: 'aSecond',
    card: { kind: 'action', action: 'secondChance' },
    label: '2nd Chance',
    accent: 'secondChance',
  },
];





export const NUMBER_CARDS = numberDefs;
export const SPECIAL_CARDS = [...modifierDefs, ...actionDefs];
