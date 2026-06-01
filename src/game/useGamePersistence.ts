/**
 * Loads the saved game from AsyncStorage once on mount, then persists every
 * subsequent state change so a game survives the app being closed mid-round.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';

import { GameState } from '@/game/types';

const STORAGE_KEY = 'flip7tracker:game:v1';

export function useGamePersistence(state: GameState, hydrate: (state: GameState) => void) {
  const [loaded, setLoaded] = useState(false);
  const didHydrate = useRef(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          try {
            hydrate(JSON.parse(raw) as GameState);
          } catch {
            // Corrupt payload — fall back to the default initial state.
          }
        }
      })
      .finally(() => {
        if (!cancelled) {
          didHydrate.current = true;
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
    // Run exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!didHydrate.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  return { loaded };
}
