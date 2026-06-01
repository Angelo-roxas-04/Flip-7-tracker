/**
 * Themed pressable button with poker-table variants. Presentation only.
 */

import { ActivityIndicator, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Palette, Radius, Spacing } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'danger' | 'gold' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const VARIANTS: Record<ButtonVariant, { bg: string; border: string; text: string }> = {
  primary: { bg: Palette.feltLight, border: Palette.feltLight, text: Palette.text },
  danger: { bg: Palette.danger, border: Palette.danger, text: '#fff' },
  gold: { bg: Palette.gold, border: Palette.gold, text: '#241B00' },
  ghost: { bg: 'transparent', border: Palette.border, text: Palette.text },
};

export function GameButton({ label, onPress, variant = 'primary', disabled, loading, style }: Props) {
  const v = VARIANTS[variant];
  const off = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: off }}
      disabled={off}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: v.bg, borderColor: v.border },
        pressed && !off && styles.pressed,
        off && styles.disabled,
        style,
      ]}>
      <View style={styles.inner}>
        {loading && <ActivityIndicator color={v.text} size="small" />}
        <Text style={[styles.label, { color: v.text }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
  label: { fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
});
