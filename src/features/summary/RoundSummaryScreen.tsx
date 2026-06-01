/**
 * Round summary container. Shows what everyone scored this round and who's
 * leading, then routes to the next round or to the final standings.
 */

import { StyleSheet, Text, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { ScreenContainer } from '@/components/ScreenContainer/ScreenContainer';
import { Palette, Spacing } from '@/constants/theme';
import { Standings } from '@/features/summary/components/Standings/Standings';
import { useRoundSummary } from '@/features/summary/useRoundSummary';

export function RoundSummaryScreen() {
  const s = useRoundSummary();
  const leader = s.standings[0];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.kicker}>ROUND {s.roundNumber} COMPLETE</Text>
        {leader && (
          <Text style={styles.leader}>
            👑 {leader.name} leads with {leader.total}
          </Text>
        )}
      </View>

      <Standings rows={s.standings} />

      <View style={styles.footer}>
        {s.gameOver ? (
          <>
            <Text style={styles.note}>Someone passed {s.threshold} — final round done!</Text>
            <GameButton label="See Final Standings" variant="gold" onPress={s.finishGame} />
          </>
        ) : (
          <GameButton label="Next Round" variant="primary" onPress={s.nextRound} />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: 4, paddingVertical: Spacing.three },
  kicker: { color: Palette.gold, fontWeight: '800', letterSpacing: 2, fontSize: 13 },
  leader: { color: Palette.text, fontSize: 18, fontWeight: '700' },
  footer: { gap: Spacing.two, paddingVertical: Spacing.three },
  note: { color: Palette.textMuted, textAlign: 'center', fontSize: 13 },
});
