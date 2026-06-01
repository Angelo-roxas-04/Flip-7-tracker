/**
 * Logic for the game-over screen: final standings (highest total wins) and the
 * "play again" reset that keeps the roster but zeroes the scores.
 */

import { useCallback, useMemo } from 'react';

import { useGame, useGameDispatch } from '@/game/GameContext';

export type FinalRow = { id: string; name: string; total: number; rank: number };

export function useGameOver() {
  const { players } = useGame();
  const dispatch = useGameDispatch();

  const standings: FinalRow[] = useMemo(
    () =>
      [...players]
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((p, i) => ({ id: p.id, name: p.name, total: p.totalScore, rank: i + 1 })),
    [players],
  );

  const winner = standings[0] ?? null;
  const newGame = useCallback(() => dispatch({ type: 'newGame' }), [dispatch]);

  return { standings, winner, newGame };
}
