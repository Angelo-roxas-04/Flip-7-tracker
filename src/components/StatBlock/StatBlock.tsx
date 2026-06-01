/**
 * A labelled stat: a caption above an emphasized value. Presentation only.
 */

import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/constants/theme';

type Props = {
  label: string;
  value: string | number;
  accent?: boolean;
  align?: 'center' | 'flex-start';
};

export function StatBlock({ label, value, accent, align = 'center' }: Props) {
  return (
    <View style={[styles.wrap, { alignItems: align }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, accent && styles.accent]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 2 },
  label: { color: Palette.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  value: { color: Palette.text, fontSize: 26, fontWeight: '800' },
  accent: { color: Palette.gold },
});
