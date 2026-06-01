/**
 * Overlay shown after flipping Freeze or Flip 3: pick which still-active player
 * to hand the card to (yourself allowed). Logic lives in useRound.
 */

import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { PendingAction, Player } from '@/game/types';

type Props = {
  pending: PendingAction;
  targets: Player[];
  activePlayerId: string;
  onPick: (targetId: string) => void;
  onCancel: () => void;
};

const COPY = {
  freeze: { title: '❄ Freeze', verb: 'Freeze' },
  flip3: { title: '↻ Flip 3', verb: 'Give Flip 3 to' },
};

export function ActionTargetPicker({ pending, targets, activePlayerId, onPick, onCancel }: Props) {
  if (!pending) return null;
  const copy = COPY[pending.kind];

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.subtitle}>Choose a player still in the round</Text>

          <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            {targets.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => onPick(p.id)}
                style={({ pressed }) => [styles.target, pressed && styles.pressed]}>
                <Text style={styles.targetName}>
                  {p.name}
                  {p.id === activePlayerId ? ' (you)' : ''}
                </Text>
                <Text style={styles.verb}>{copy.verb}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <GameButton label="Cancel" variant="ghost" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: Spacing.four },
  sheet: {
    backgroundColor: Palette.surface,
    borderColor: Palette.border,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.two,
    maxHeight: '80%',
  },
  title: { color: Palette.gold, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: Palette.textMuted, fontSize: 13, textAlign: 'center', marginBottom: Spacing.one },
  list: { gap: Spacing.two },
  target: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Palette.surfaceRaised,
    borderColor: Palette.border,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  pressed: { opacity: 0.7, borderColor: Palette.gold },
  targetName: { color: Palette.text, fontSize: 17, fontWeight: '700' },
  verb: { color: Palette.textFaint, fontSize: 12, fontWeight: '600' },
});
