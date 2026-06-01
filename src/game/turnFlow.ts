/**
 * In-round turn mechanics: flipping cards, rotating play, handing off Freeze /
 * Flip 3, and ending the round the instant someone flips their 7th number.
 *
 * Play is turn-based — one flip passes to the next active seat — except while a
 * player owes forced flips from a received Flip 3, when they keep flipping. A
 * lone remaining player keeps the turn (rotation lands back on them) until they
 * Flip 7, stay, or bust.
 */

import { finishRound, nextActiveIndex } from '@/game/roundHelpers';
import { hasFlip7, isDuplicateNumber } from '@/game/scoring';
import { Card, GameState, Hand } from '@/game/types';

/** Pass play to the next active seat, or end the round when none remain. After
 *  a Flip 3, play resumes after whoever flipped it — not after the target. */
function rotate(state: GameState): GameState {
  const round = state.round;
  if (!round) return state;
  const from = round.flip3OriginIndex ?? round.activePlayerIndex;
  const advanced = {
    ...round,
    lastActedIndex: round.activePlayerIndex,
    forcedFlips: 0,
    pendingAction: null,
    flip3OriginIndex: null,
  };
  const next = nextActiveIndex(state.players, advanced, from);
  if (next === null) return finishRound(state, advanced);
  return { ...state, round: { ...advanced, activePlayerIndex: next } };
}

/**
 * After a flip resolves: keep the same player if they still owe forced flips,
 * otherwise rotate. A terminal flip (bust / self-freeze) always rotates.
 */
function continueTurn(state: GameState, terminal: boolean): GameState {
  const round = state.round;
  if (!round) return state;
  if (!terminal && round.forcedFlips > 1) {
    return { ...state, round: { ...round, forcedFlips: round.forcedFlips - 1, pendingAction: null } };
  }
  return rotate(state);
}

/** Someone hit 7 unique numbers: they (already stayed) score the bonus; every
 *  other player still in banks the hand they're holding, then the round ends. */
function endOnFlip7(state: GameState, flipperIndex: number): GameState {
  const round = state.round;
  if (!round) return state;
  const hands: Record<string, Hand> = { ...round.hands };
  for (const p of state.players) {
    if (hands[p.id].status === 'active') hands[p.id] = { ...hands[p.id], status: 'stayed' };
  }
  return finishRound(state, {
    ...round,
    hands,
    lastActedIndex: flipperIndex,
    pendingAction: null,
    forcedFlips: 0,
    flip3OriginIndex: null,
  });
}

export function flipCard(state: GameState, card: Card): GameState {
  const round = state.round;
  if (!round || round.pendingAction) return state;
  const player = state.players[round.activePlayerIndex];
  const hand = round.hands[player.id];
  if (hand.status !== 'active') return state;

  // Freeze / Flip 3 are handed to a chosen player — defer until a target is picked.
  if (card.kind === 'action' && (card.action === 'freeze' || card.action === 'flip3')) {
    return { ...state, round: { ...round, pendingAction: { kind: card.action } } };
  }

  const next: Hand = { ...hand, cards: [...hand.cards] };
  let terminal = false;
  let flip7 = false;

  if (card.kind === 'number') {
    if (isDuplicateNumber(hand.cards, card.value)) {
      if (hand.hasSecondChance) next.hasSecondChance = false; // saved — discard the dupe
      else {
        next.status = 'busted';
        terminal = true;
      }
    } else {
      next.cards.push(card);
      if (hasFlip7(next.cards)) {
        next.status = 'stayed';
        flip7 = true;
      }
    }
  } else if (card.kind === 'modifier') {
    next.cards.push(card);
  } else {
    next.cards.push(card); // secondChance — kept for the next would-be bust
    next.hasSecondChance = true;
  }

  const withHand = { ...state, round: { ...round, hands: { ...round.hands, [player.id]: next } } };
  if (flip7) return endOnFlip7(withHand, round.activePlayerIndex);
  return continueTurn(withHand, terminal);
}

/** Resolve a pending Freeze / Flip 3 against the chosen target player. */
export function assignAction(state: GameState, targetId: string): GameState {
  const round = state.round;
  if (!round || !round.pendingAction) return state;
  const targetIndex = state.players.findIndex((p) => p.id === targetId);
  const targetHand = targetIndex >= 0 ? round.hands[targetId] : null;
  if (!targetHand || targetHand.status !== 'active') return state;

  if (round.pendingAction.kind === 'freeze') {
    const hands = { ...round.hands, [targetId]: { ...targetHand, status: 'stayed' as const } };
    const frozeSelf = targetIndex === round.activePlayerIndex;
    return continueTurn({ ...state, round: { ...round, hands, pendingAction: null } }, frozeSelf);
  }

  // Flip 3: jump the active turn to the target, who must flip three cards.
  // Remember the flipper so play resumes after them once the three are done.
  return {
    ...state,
    round: {
      ...round,
      pendingAction: null,
      activePlayerIndex: targetIndex,
      forcedFlips: 3,
      flip3OriginIndex: round.activePlayerIndex,
    },
  };
}

export function cancelAction(state: GameState): GameState {
  const round = state.round;
  if (!round || !round.pendingAction) return state;
  return { ...state, round: { ...round, pendingAction: null } };
}

/** Manual Stay / Bust on the active player, then rotate. */
export function setHandStatus(state: GameState, status: 'stayed' | 'busted'): GameState {
  const round = state.round;
  if (!round || round.pendingAction) return state;
  const player = state.players[round.activePlayerIndex];
  const hand = round.hands[player.id];
  if (hand.status !== 'active') return state;
  const withHand = {
    ...state,
    round: { ...round, hands: { ...round.hands, [player.id]: { ...hand, status } } },
  };
  return rotate(withHand);
}
