/**
 * Core domain types for the Flip 7 score tracker.
 * Pure data shapes — no UI, no side effects.
 */

/** A number card holds a face value 1–7 and counts toward the hand total. */
export type NumberCard = {
  kind: 'number';
  /** Face value 1–7. Also used to detect duplicates (a bust). */
  value: number;
};

/** A modifier card adjusts the hand total but never causes a bust. */
export type ModifierCard = {
  kind: 'modifier';
  /** 'x2' doubles the number-card sum; '+N' adds a flat bonus. */
  modifier: 'x2' | '+2' | '+4' | '+6' | '+8' | '+10';
};

/** Action cards change the flow of a turn rather than the raw total. */
export type ActionCard = {
  kind: 'action';
  action: 'freeze' | 'flip3' | 'secondChance';
};

export type Card = NumberCard | ModifierCard | ActionCard;

/** Where a player stands within the current round. */
export type HandStatus = 'active' | 'stayed' | 'busted';

export type Hand = {
  cards: Card[];
  status: HandStatus;
  /** True once a Second Chance card is held and not yet spent. */
  hasSecondChance: boolean;
};

export type Player = {
  id: string;
  name: string;
  /** Cumulative score banked across all completed rounds. */
  totalScore: number;
};

/** A Freeze or Flip 3 has been flipped and is waiting to be handed to a player. */
export type PendingAction = { kind: 'freeze' | 'flip3' } | null;

export type RoundState = {
  number: number;
  /** Seat index of the player who opened the round. */
  starterIndex: number;
  /** Seat index of the player currently flipping cards. */
  activePlayerIndex: number;
  /** Seat index of the last player to act; seeds the next round's starter. */
  lastActedIndex: number | null;
  hands: Record<string, Hand>;
  /** Set while the active player must hand off a flipped Freeze / Flip 3. */
  pendingAction: PendingAction;
  /** Remaining cards the active player must flip (from a received Flip 3). */
  forcedFlips: number;
  /**
   * Seat of whoever flipped the active Flip 3. When the forced flips finish,
   * play resumes after this seat — not after the player who did the flipping.
   */
  flip3OriginIndex: number | null;
};

/** Per-player outcome shown on the round summary screen. */
export type RoundResult = {
  playerId: string;
  delta: number;
  busted: boolean;
  totalAfter: number;
};

export type GamePhase = 'setup' | 'playing' | 'roundSummary' | 'gameOver';

export type GameState = {
  phase: GamePhase;
  players: Player[];
  /** Chosen seat index that opens the very first round. */
  startingPlayerIndex: number;
  round: RoundState | null;
  /** Results of the most recently completed round (for the summary screen). */
  lastResults: RoundResult[];
};
