/**
 * Celebratory banner naming the winner and their final score.
 */

import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Spacing } from '@/constants/theme';
import { FinalRow } from '@/features/gameOver/useGameOver';

export function WinnerBanner({ winner }: { winner: FinalRow }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.trophy}>🏆</Text>
      <Text style={styles.label}>WINNER</Text>
      <Text style={styles.name}>{winner.name}</Text>
      <Text style={styles.score}>{winner.total} points</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: 2,
    backgroundColor: Palette.surfaceRaised,
    borderColor: Palette.gold,
    borderWidth: 1.5,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  trophy: { fontSize: 56 },
  label: { color: Palette.gold, fontWeight: '800', letterSpacing: 4, fontSize: 13 },
  name: { color: Palette.text, fontSize: 36, fontWeight: '800' },
  score: { color: Palette.textMuted, fontSize: 18, fontWeight: '600' },
});
