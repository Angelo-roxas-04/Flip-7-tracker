/**
 * Setup screen container. Wires useSetup state into the roster components;
 * holds no game logic itself.
 */

import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { GameButton } from '@/components/GameButton/GameButton';
import { ScreenContainer } from '@/components/ScreenContainer/ScreenContainer';
import { Palette, Spacing } from '@/constants/theme';
import { PlayerInput } from '@/features/setup/components/PlayerInput/PlayerInput';
import { PlayerList } from '@/features/setup/components/PlayerList/PlayerList';
import { useSetup } from '@/features/setup/useSetup';

export function SetupScreen() {
  const s = useSetup();

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.kicker}>FLIP 7</Text>
          <Text style={styles.title}>Score Tracker</Text>
          <Text style={styles.subtitle}>Add players in seating order. Tap a name to set who deals first.</Text>
        </View>

        <PlayerInput
          value={s.draftName}
          onChange={s.setDraftName}
          onSubmit={s.addPlayer}
          canAdd={s.canAdd}
        />

        <View style={styles.flex}>
          <PlayerList
            players={s.players}
            startingPlayerIndex={s.startingPlayerIndex}
            onChooseStarter={s.chooseStarter}
            onMove={s.movePlayer}
            onRemove={s.removePlayer}
          />
        </View>

        <View style={styles.footer}>
          {!s.canStart && <Text style={styles.hint}>Add at least 2 players to start.</Text>}
          <GameButton label="Start Game" variant="primary" onPress={s.startGame} disabled={!s.canStart} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { gap: 4, paddingTop: Spacing.three, paddingBottom: Spacing.three },
  kicker: { color: Palette.gold, fontWeight: '800', letterSpacing: 4, fontSize: 13 },
  title: { color: Palette.text, fontSize: 34, fontWeight: '800' },
  subtitle: { color: Palette.textMuted, fontSize: 14, lineHeight: 20 },
  footer: { gap: Spacing.two, paddingVertical: Spacing.three },
  hint: { color: Palette.textFaint, textAlign: 'center', fontSize: 13 },
});
