/**
 * Final ranked list of every player with medals for the top three.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Spacing } from '@/constants/theme';
import { FinalRow } from '@/features/gameOver/useGameOver';

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function FinalStandings({ rows }: { rows: FinalRow[] }) {
  return (
    <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
      {rows.map((row) => (
        <View key={row.id} style={[styles.row, row.rank === 1 && styles.first]}>
          <Text style={styles.rank}>{MEDALS[row.rank] ?? row.rank}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {row.name}
          </Text>
          <Text style={styles.total}>{row.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.two, paddingVertical: Spacing.one },
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
  first: { borderColor: Palette.gold },
  rank: { width: 30, fontSize: 18, fontWeight: '800', color: Palette.textMuted, textAlign: 'center' },
  name: { flex: 1, color: Palette.text, fontSize: 17, fontWeight: '600' },
  total: { color: Palette.text, fontSize: 20, fontWeight: '800' },
});
