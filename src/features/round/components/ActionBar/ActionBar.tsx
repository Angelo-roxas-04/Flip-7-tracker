/**
 * Stay / Bust controls for the active player, with the live "if you stay"
 * figure on the Stay button. Pinned below the grid on the round screen.
 */

import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { Spacing } from '@/constants/theme';

type Props = {
  ifYouStay: number;
  onStay: () => void;
  onBust: () => void;
  /** Disabled while the player owes forced flips (a received Flip 3). */
  disabled?: boolean;
};

export function ActionBar({ ifYouStay, onStay, onBust, disabled }: Props) {
  return (
    <View style={styles.row}>
      <GameButton label="Bust" variant="danger" onPress={onBust} disabled={disabled} style={styles.bust} />
      <GameButton label={`Stay · ${ifYouStay}`} variant="gold" onPress={onStay} disabled={disabled} style={styles.stay} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.two },
  bust: { flex: 1 },
  stay: { flex: 2 },
});
