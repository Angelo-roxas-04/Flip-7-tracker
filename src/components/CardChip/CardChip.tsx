/**
 * A small chip representing a single flipped card in a player's hand.
 */

import { StyleSheet, Text, View } from 'react-native';

import { describeCard } from '@/components/CardChip/cardVisual';
import { Radius } from '@/constants/theme';
import { Card } from '@/game/types';

type Props = { card: Card; size?: 'sm' | 'md' };

export function CardChip({ card, size = 'md' }: Props) {
  const v = describeCard(card);
  const dim = size === 'sm' ? styles.sm : styles.md;
  return (
    <View style={[styles.chip, dim, { backgroundColor: v.bg }]}>
      <Text style={[styles.label, { color: v.fg, fontSize: size === 'sm' ? 13 : 18 }]}>
        {v.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  sm: { minWidth: 26, height: 34, paddingHorizontal: 4 },
  md: { minWidth: 38, height: 50, paddingHorizontal: 6 },
  label: { fontWeight: '800' },
});
