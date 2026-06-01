/**
 * One standings row on the summary screen: rank, name, round delta, and the
 * new cumulative total. The leader is highlighted in gold.
 */

import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Spacing } from '@/constants/theme';
import { StandingRow } from '@/features/summary/useRoundSummary';

export function ResultRow({ row, leading }: { row: StandingRow; leading: boolean }) {
  const deltaLabel = row.busted ? 'BUST' : `+${row.delta}`;
  return (
    <View style={[styles.row, leading && styles.leadRow]}>
      <Text style={[styles.rank, leading && styles.gold]}>{row.rank}</Text>
      <Text style={[styles.name, leading && styles.gold]} numberOfLines={1}>
        {row.name}
      </Text>
      <Text style={[styles.delta, row.busted ? styles.bust : styles.gain]}>{deltaLabel}</Text>
      <Text style={[styles.total, leading && styles.gold]}>{row.total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  leadRow: { borderColor: Palette.gold, backgroundColor: Palette.surfaceRaised },
  rank: { color: Palette.textFaint, fontWeight: '800', width: 22, fontSize: 15 },
  name: { flex: 1, color: Palette.text, fontSize: 17, fontWeight: '600' },
  delta: { width: 64, textAlign: 'right', fontSize: 15, fontWeight: '700' },
  gain: { color: Palette.success },
  bust: { color: Palette.danger },
  total: { width: 52, textAlign: 'right', color: Palette.text, fontSize: 18, fontWeight: '800' },
  gold: { color: Palette.gold },
});
