/**
 * Column header + scrollable list of ResultRows, sorted by total.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Palette, Spacing } from '@/constants/theme';
import { ResultRow } from '@/features/summary/components/ResultRow/ResultRow';
import { StandingRow } from '@/features/summary/useRoundSummary';

export function Standings({ rows }: { rows: StandingRow[] }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={[styles.h, styles.rank]}>#</Text>
        <Text style={[styles.h, styles.name]}>Player</Text>
        <Text style={[styles.h, styles.delta]}>Round</Text>
        <Text style={[styles.h, styles.total]}>Total</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {rows.map((row) => (
          <ResultRow key={row.id} row={row} leading={row.rank === 1} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, gap: Spacing.one },
  headerRow: { flexDirection: 'row', paddingHorizontal: Spacing.three, gap: Spacing.two },
  h: { color: Palette.textFaint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  rank: { width: 22 },
  name: { flex: 1 },
  delta: { width: 64, textAlign: 'right' },
  total: { width: 52, textAlign: 'right' },
  list: { gap: Spacing.two, paddingVertical: Spacing.one },
});
