/**
 * Logic for the round summary: join the round's results with player names,
 * sort into standings, and expose the next-round / finish-game transitions.
 */

import { useCallback, useMemo } from 'react';

import { WIN_THRESHOLD } from '@/game/cards';
import { useGame, useGameDispatch } from '@/game/GameContext';

export type StandingRow = {
  id: string;
  name: string;
  delta: number;
  busted: boolean;
  total: number;
  rank: number;
};

export function useRoundSummary() {
  const { players, round, lastResults } = useGame();
  const dispatch = useGameDispatch();

  const standings: StandingRow[] = useMemo(() => {
    const byId = new Map(lastResults.map((r) => [r.playerId, r]));
    return players
      .map((p) => {
        const result = byId.get(p.id);
        return {
          id: p.id,
          name: p.name,
          delta: result?.delta ?? 0,
          busted: result?.busted ?? false,
          total: p.totalScore,
        };
      })
      .sort((a, b) => b.total - a.total)
      .map((row, i) => ({ ...row, rank: i + 1 }));
  }, [players, lastResults]);

  const gameOver = standings.some((s) => s.total >= WIN_THRESHOLD);

  const nextRound = useCallback(() => dispatch({ type: 'nextRound' }), [dispatch]);
  const finishGame = useCallback(() => dispatch({ type: 'finishGame' }), [dispatch]);

  return {
    roundNumber: round?.number ?? 0,
    standings,
    gameOver,
    threshold: WIN_THRESHOLD,
    nextRound,
    finishGame,
  };
}
