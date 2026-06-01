/**
 * One tappable card tile in the flip grid. A number already held is flagged in
 * danger colors as a bust warning (tapping it still records the flip / bust).
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius } from '@/constants/theme';
import { CardDef } from '@/game/cards';

const ACCENT: Record<CardDef['accent'], string> = {
  number: Palette.numberCard,
  modifier: Palette.modifier,
  freeze: Palette.freeze,
  flip3: Palette.flip3,
  secondChance: Palette.secondChance,
};

type Props = { def: CardDef; isDuplicate: boolean; onPress: () => void };

export function CardButton({ def, isDuplicate, onPress }: Props) {
  const isNumber = def.accent === 'number';
  const bg = isDuplicate ? Palette.dangerSoft : ACCENT[def.accent];
  const fg = isDuplicate ? Palette.danger : isNumber ? Palette.numberCardText : '#fff';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: bg },
        isDuplicate && styles.dupTile,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, { color: fg }, def.label.length > 2 && styles.smallLabel]}>
        {def.label}
      </Text>
      {isDuplicate && (
        <View style={styles.warnBadge}>
          <Text style={styles.warnText}>DUP</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1.15,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  dupTile: { borderColor: Palette.danger, borderStyle: 'dashed' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.95 }] },
  label: { fontSize: 22, fontWeight: '800' },
  smallLabel: { fontSize: 13 },
  warnBadge: { position: 'absolute', top: 3, right: 3, backgroundColor: Palette.danger, borderRadius: 4, paddingHorizontal: 3 },
  warnText: { color: '#fff', fontSize: 8, fontWeight: '800' },
});
