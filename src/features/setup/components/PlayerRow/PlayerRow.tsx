/**
 * One roster entry: seat number, name, "deals first" crown toggle, reorder
 * arrows, and remove. Purely presentational; actions come from useSetup.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Spacing } from '@/constants/theme';
import { Player } from '@/game/types';

type Props = {
  player: Player;
  index: number;
  count: number;
  isStarter: boolean;
  onChooseStarter: () => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
};

export function PlayerRow({ player, index, count, isStarter, onChooseStarter, onMove, onRemove }: Props) {
  return (
    <View style={[styles.row, isStarter && styles.starterRow]}>
      <Text style={styles.seat}>{index + 1}</Text>
      <Pressable style={styles.nameWrap} onPress={onChooseStarter} accessibilityRole="button">
        <Text style={styles.crown}>{isStarter ? '👑' : '•'}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
      </Pressable>
      <View style={styles.actions}>
        <IconBtn label="▲" disabled={index === 0} onPress={() => onMove(-1)} />
        <IconBtn label="▼" disabled={index === count - 1} onPress={() => onMove(1)} />
        <IconBtn label="✕" danger onPress={onRemove} />
      </View>
    </View>
  );
}

function IconBtn({ label, onPress, disabled, danger }: { label: string; onPress: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.icon, pressed && styles.pressed, disabled && styles.iconOff]}>
      <Text style={[styles.iconText, danger && { color: Palette.danger }]}>{label}</Text>
    </Pressable>
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
  starterRow: { borderColor: Palette.gold },
  seat: { color: Palette.textFaint, fontWeight: '700', width: 18, textAlign: 'center' },
  nameWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  crown: { fontSize: 16, width: 20, textAlign: 'center', color: Palette.textFaint },
  name: { color: Palette.text, fontSize: 17, fontWeight: '600', flexShrink: 1 },
  actions: { flexDirection: 'row', gap: 4 },
  icon: { width: 34, height: 34, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: Palette.surfaceRaised },
  iconOff: { opacity: 0.3 },
  pressed: { opacity: 0.6 },
  iconText: { color: Palette.text, fontSize: 14, fontWeight: '700' },
});
