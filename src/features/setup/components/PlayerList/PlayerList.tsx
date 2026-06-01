/**
 * Scrollable roster of PlayerRows, or an empty-state hint when none added.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PlayerRow } from '@/features/setup/components/PlayerRow/PlayerRow';
import { Palette, Spacing } from '@/constants/theme';
import { Player } from '@/game/types';

type Props = {
  players: Player[];
  startingPlayerIndex: number;
  onChooseStarter: (index: number) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
};

export function PlayerList({ players, startingPlayerIndex, onChooseStarter, onMove, onRemove }: Props) {
  if (players.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No players yet.</Text>
        <Text style={styles.emptyHint}>Add at least two to deal in.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
      {players.map((player, index) => (
        <PlayerRow
          key={player.id}
          player={player}
          index={index}
          count={players.length}
          isStarter={index === startingPlayerIndex}
          onChooseStarter={() => onChooseStarter(index)}
          onMove={(direction) => onMove(index, direction)}
          onRemove={() => onRemove(player.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.two, paddingVertical: Spacing.one },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.one },
  emptyText: { color: Palette.textMuted, fontSize: 18, fontWeight: '600' },
  emptyHint: { color: Palette.textFaint, fontSize: 14 },
});
