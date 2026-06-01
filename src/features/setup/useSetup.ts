/**
 * Logic for the Setup screen: drafting the player roster, choosing who opens
 * round one, and starting the game. UI lives in SetupScreen + its components.
 */

import { useCallback, useState } from 'react';

import { useGame, useGameDispatch } from '@/game/GameContext';

export const MAX_PLAYERS = 12;

export function useSetup() {
  const { players, startingPlayerIndex } = useGame();
  const dispatch = useGameDispatch();
  const [draftName, setDraftName] = useState('');

  const trimmed = draftName.trim();
  const canAdd = trimmed.length > 0 && players.length < MAX_PLAYERS;
  const canStart = players.length >= 2;

  const addPlayer = useCallback(() => {
    if (!trimmed) return;
    dispatch({ type: 'addPlayer', name: trimmed });
    setDraftName('');
  }, [dispatch, trimmed]);

  const removePlayer = useCallback((id: string) => dispatch({ type: 'removePlayer', id }), [dispatch]);

  const movePlayer = useCallback(
    (index: number, direction: -1 | 1) => dispatch({ type: 'movePlayer', index, direction }),
    [dispatch],
  );

  const chooseStarter = useCallback(
    (index: number) => dispatch({ type: 'setStartingPlayer', index }),
    [dispatch],
  );

  const startGame = useCallback(() => dispatch({ type: 'startGame' }), [dispatch]);

  return {
    players,
    startingPlayerIndex,
    draftName,
    setDraftName,
    canAdd,
    canStart,
    addPlayer,
    removePlayer,
    movePlayer,
    chooseStarter,
    startGame,
  };
}
