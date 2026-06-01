/**
 * Game over container. Crowns the winner, lists the final standings, and
 * offers a rematch with the same roster.
 */

import { StyleSheet, Text, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { ScreenContainer } from '@/components/ScreenContainer/ScreenContainer';
import { Palette, Spacing } from '@/constants/theme';
import { FinalStandings } from '@/features/gameOver/components/FinalStandings/FinalStandings';
import { WinnerBanner } from '@/features/gameOver/components/WinnerBanner/WinnerBanner';
import { useGameOver } from '@/features/gameOver/useGameOver';

export function GameOverScreen() {
  const g = useGameOver();
  if (!g.winner) return null;

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Game Over</Text>
        <WinnerBanner winner={g.winner} />
      </View>

      <Text style={styles.sectionLabel}>Final Standings</Text>
      <View style={styles.flex}>
        <FinalStandings rows={g.standings} />
      </View>

      <View style={styles.footer}>
        <GameButton label="Play Again" variant="primary" onPress={g.newGame} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  title: { color: Palette.text, fontSize: 28, fontWeight: '800' },
  sectionLabel: { color: Palette.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, fontSize: 12, marginBottom: Spacing.one },
  footer: { paddingVertical: Spacing.three },
});
