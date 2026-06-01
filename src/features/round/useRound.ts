/**
 * Logic for the Round screen. Derives everything the table, active panel, and
 * card grid render, plus the flip / stay / bust handlers.
 */

import { useCallback, useMemo } from 'react';

import { useGame, useGameDispatch } from '@/game/GameContext';
import { computeBreakdown } from '@/game/scoring';
import { Card, Hand, Player } from '@/game/types';

export type SeatInfo = {
  player: Player;
  index: number;
  status: Hand['status'];
  cardCount: number;
  hasSecondChance: boolean;
  isActive: boolean;
};

export function useRound() {
  const { round, players } = useGame();
  const dispatch = useGameDispatch();

  const activeIndex = round?.activePlayerIndex ?? 0;
  const activePlayer = players[activeIndex];
  const activeHand = round ? round.hands[activePlayer.id] : null;

  const breakdown = useMemo(
    () => computeBreakdown(activeHand?.cards ?? []),
    [activeHand?.cards],
  );

  const heldNumbers = useMemo(() => {
    const set = new Set<number>();
    for (const c of activeHand?.cards ?? []) if (c.kind === 'number') set.add(c.value);
    return set;
  }, [activeHand?.cards]);

  const seats: SeatInfo[] = useMemo(() => {
    if (!round) return [];
    return players.map((player, index) => {
      const hand = round.hands[player.id];
      return {
        player,
        index,
        status: hand.status,
        cardCount: hand.cards.length,
        hasSecondChance: hand.hasSecondChance,
        isActive: index === activeIndex,
      };
    });
  }, [round, players, activeIndex]);

  const eligibleTargets = useMemo(
    () => seats.filter((s) => s.status === 'active').map((s) => s.player),
    [seats],
  );

  const flip = useCallback((card: Card) => dispatch({ type: 'flipCard', card }), [dispatch]);
  const stay = useCallback(() => dispatch({ type: 'stay' }), [dispatch]);
  const bust = useCallback(() => dispatch({ type: 'bust' }), [dispatch]);
  const assignAction = useCallback(
    (targetId: string) => dispatch({ type: 'assignAction', targetId }),
    [dispatch],
  );
  const cancelAction = useCallback(() => dispatch({ type: 'cancelAction' }), [dispatch]);

  return {
    round,
    players,
    activePlayer,
    activeHand,
    breakdown,
    heldNumbers,
    hasSecondChance: activeHand?.hasSecondChance ?? false,
    ifYouStay: (activePlayer?.totalScore ?? 0) + breakdown.total,
    seats,
    pendingAction: round?.pendingAction ?? null,
    forcedFlips: round?.forcedFlips ?? 0,
    eligibleTargets,
    flip,
    stay,
    bust,
    assignAction,
    cancelAction,
  };
}
