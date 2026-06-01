/**
 * Pure helpers for round setup, turn rotation, and round resolution.
 * Kept separate so the reducer reads as a flat list of transitions.
 */

import { WIN_THRESHOLD } from '@/game/cards';
import { bankedValue } from '@/game/scoring';
import { GameState, Hand, Player, RoundResult, RoundState } from '@/game/types';

export function freshHand(): Hand {
  return { cards: [], status: 'active', hasSecondChance: false };
}

export function makeRound(players: Player[], number: number, starterIndex: number): RoundState {
  const hands: Record<string, Hand> = {};
  for (const p of players) hands[p.id] = freshHand();
  return {
    number,
    starterIndex,
    activePlayerIndex: starterIndex,
    lastActedIndex: null,
    hands,
    pendingAction: null,
    forcedFlips: 0,
    flip3OriginIndex: null,
  };
}

/** Tally the round into player totals and move the game to the summary screen. */
export function finishRound(state: GameState, round: RoundState): GameState {
  const { results, players } = resolveRound(state, round);
  return { ...state, players, round, lastResults: results, phase: 'roundSummary' };
}

/** Next seat (cyclic) that is still flipping, starting after `from`. Null if none. */
export function nextActiveIndex(players: Player[], round: RoundState, from: number): number | null {
  for (let step = 1; step <= players.length; step += 1) {
    const idx = (from + step) % players.length;
    if (round.hands[players[idx].id].status === 'active') return idx;
  }
  return null;
}

export function roundIsOver(players: Player[], round: RoundState): boolean {
  return players.every((p) => round.hands[p.id].status !== 'active');
}

/** Tally each player's banked points for the round and the resulting totals. */
export function resolveRound(state: GameState, round: RoundState): {
  results: RoundResult[];
  players: Player[];
} {
  const results: RoundResult[] = [];
  const players = state.players.map((p) => {
    const hand = round.hands[p.id];
    const delta = bankedValue(hand);
    const totalAfter = p.totalScore + delta;
    results.push({ playerId: p.id, delta, busted: hand.status === 'busted', totalAfter });
    return { ...p, totalScore: totalAfter };
  });
  return { results, players };
}

export function someoneWon(players: Player[]): boolean {
  return players.some((p) => p.totalScore >= WIN_THRESHOLD);
}

/** Seat that opens the next round: the player after whoever last acted. */
export function nextStarterIndex(players: Player[], round: RoundState): number {
  const last = round.lastActedIndex ?? round.starterIndex;
  return (last + 1) % players.length;
}
