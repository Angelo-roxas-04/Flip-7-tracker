/**
 * Single source of truth for game state transitions.
 * Turn-based: every flip, stay, or bust ends the active player's turn and
 * rotates play to the next still-active seat (authentic Flip 7 flow).
 */

import { Card, GameState, Player } from '@/game/types';
import { makeRound, nextStarterIndex, someoneWon } from '@/game/roundHelpers';
import { assignAction, cancelAction, flipCard, setHandStatus } from '@/game/turnFlow';

export const initialState: GameState = {
  phase: 'setup',
  players: [],
  startingPlayerIndex: 0,
  round: null,
  lastResults: [],
};

let idSeq = 0;
function makePlayer(name: string): Player {
  idSeq += 1;
  return { id: `p${Date.now().toString(36)}${idSeq}`, name: name.trim(), totalScore: 0 };
}

export type GameAction =
  | { type: 'hydrate'; state: GameState }
  | { type: 'addPlayer'; name: string }
  | { type: 'removePlayer'; id: string }
  | { type: 'movePlayer'; index: number; direction: -1 | 1 }
  | { type: 'setStartingPlayer'; index: number }
  | { type: 'startGame' }
  | { type: 'flipCard'; card: Card }
  | { type: 'assignAction'; targetId: string }
  | { type: 'cancelAction' }
  | { type: 'stay' }
  | { type: 'bust' }
  | { type: 'nextRound' }
  | { type: 'finishGame' }
  | { type: 'newGame' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'hydrate':
      return action.state;

    case 'addPlayer': {
      if (!action.name.trim()) return state;
      return { ...state, players: [...state.players, makePlayer(action.name)] };
    }
    case 'removePlayer': {
      const players = state.players.filter((p) => p.id !== action.id);
      const startingPlayerIndex = Math.min(state.startingPlayerIndex, Math.max(0, players.length - 1));
      return { ...state, players, startingPlayerIndex };
    }
    case 'movePlayer': {
      const { index, direction } = action;
      const target = index + direction;
      if (target < 0 || target >= state.players.length) return state;
      const players = [...state.players];
      [players[index], players[target]] = [players[target], players[index]];
      return { ...state, players };
    }
    case 'setStartingPlayer':
      return { ...state, startingPlayerIndex: action.index };

    case 'startGame': {
      if (state.players.length < 1) return state;
      const round = makeRound(state.players, 1, state.startingPlayerIndex);
      return { ...state, round, lastResults: [], phase: 'playing' };
    }

    case 'flipCard':
      return flipCard(state, action.card);
    case 'assignAction':
      return assignAction(state, action.targetId);
    case 'cancelAction':
      return cancelAction(state);
    case 'stay':
      return setHandStatus(state, 'stayed');
    case 'bust':
      return setHandStatus(state, 'busted');

    case 'nextRound': {
      if (!state.round) return state;
      if (someoneWon(state.players)) return { ...state, phase: 'gameOver' };
      const starter = nextStarterIndex(state.players, state.round);
      const round = makeRound(state.players, state.round.number + 1, starter);
      return { ...state, round, lastResults: [], phase: 'playing' };
    }
    case 'finishGame':
      return { ...state, phase: 'gameOver' };

    case 'newGame':
      return {
        ...initialState,
        players: state.players.map((p) => ({ ...p, totalScore: 0 })),
      };

    default:
      return state;
  }
}
