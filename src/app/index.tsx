/**
 * Phase router. The whole game lives on one route; which screen renders is
 * driven by the game state's `phase`, so navigation always matches the model.
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';
import { GameOverScreen } from '@/features/gameOver/GameOverScreen';
import { RoundScreen } from '@/features/round/RoundScreen';
import { SetupScreen } from '@/features/setup/SetupScreen';
import { RoundSummaryScreen } from '@/features/summary/RoundSummaryScreen';
import { useGame, useGameLoaded } from '@/game/GameContext';

export default function GameRoute() {
  const { phase } = useGame();
  const loaded = useGameLoaded();

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Palette.gold} size="large" />
      </View>
    );
  }

  switch (phase) {
    case 'playing':
      return <RoundScreen />;
    case 'roundSummary':
      return <RoundSummaryScreen />;
    case 'gameOver':
      return <GameOverScreen />;
    case 'setup':
    default:
      return <SetupScreen />;
  }
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Palette.feltDeep },
});
