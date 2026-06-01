/**
 * App-wide game state. Wraps the reducer in context and wires up persistence.
 * Components consume `useGame()` for state and `useGameDispatch()` for actions.
 */

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';

import { GameAction, gameReducer, initialState } from '@/game/gameReducer';
import { useGamePersistence } from '@/game/useGamePersistence';
import { GameState } from '@/game/types';

const StateContext = createContext<GameState | null>(null);
const DispatchContext = createContext<((action: GameAction) => void) | null>(null);
const LoadedContext = createContext<boolean>(false);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const hydrate = useCallback((next: GameState) => dispatch({ type: 'hydrate', state: next }), []);
  const { loaded } = useGamePersistence(state, hydrate);

  const value = useMemo(() => state, [state]);

  return (
    <LoadedContext.Provider value={loaded}>
      <StateContext.Provider value={value}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    </LoadedContext.Provider>
  );
}

export function useGame(): GameState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}

export function useGameDispatch(): (action: GameAction) => void {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useGameDispatch must be used within a GameProvider');
  return ctx;
}

export function useGameLoaded(): boolean {
  return useContext(LoadedContext);
}
