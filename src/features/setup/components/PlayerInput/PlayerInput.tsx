/**
 * Text field + add button for drafting a new player. Controlled by useSetup.
 */

import { StyleSheet, TextInput, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { Palette, Radius, Spacing } from '@/constants/theme';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  canAdd: boolean;
};

export function PlayerInput({ value, onChange, onSubmit, canAdd }: Props) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder="Player name"
        placeholderTextColor={Palette.textFaint}
        returnKeyType="done"
        maxLength={20}
        autoCapitalize="words"
      />
      <GameButton label="Add" variant="gold" onPress={onSubmit} disabled={!canAdd} style={styles.add} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.two, alignItems: 'stretch' },
  input: {
    flex: 1,
    backgroundColor: Palette.surface,
    borderColor: Palette.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    color: Palette.text,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
    height: 52,
  },
  add: { paddingVertical: 0, height: 52 },
});
