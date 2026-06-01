/**
 * Round screen container. Composes the poker table, active-player panel, card
 * grid, and action bar. All game logic comes from useRound.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer/ScreenContainer';
import { Palette, Spacing } from '@/constants/theme';
import { ActionBar } from '@/features/round/components/ActionBar/ActionBar';
import { ActionTargetPicker } from '@/features/round/components/ActionTargetPicker/ActionTargetPicker';
import { ActivePanel } from '@/features/round/components/ActivePanel/ActivePanel';
import { CardGrid } from '@/features/round/components/CardGrid/CardGrid';
import { PokerTable } from '@/features/round/components/PokerTable/PokerTable';
import { useRound } from '@/features/round/useRound';

export function RoundScreen() {
  const r = useRound();
  if (!r.round || !r.activePlayer || !r.activeHand) return null;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.round}>Round {r.round.number}</Text>
        {r.forcedFlips > 0 ? (
          <Text style={styles.forced}>↻ {r.activePlayer.name} must flip {r.forcedFlips} more</Text>
        ) : (
          <Text style={styles.hint}>Highest score over 200 wins</Text>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <PokerTable seats={r.seats}>
          <ActivePanel
            player={r.activePlayer}
            cards={r.activeHand.cards}
            breakdown={r.breakdown}
            ifYouStay={r.ifYouStay}
            hasSecondChance={r.hasSecondChance}
          />
        </PokerTable>

        <CardGrid heldNumbers={r.heldNumbers} onFlip={r.flip} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionBar ifYouStay={r.ifYouStay} onStay={r.stay} onBust={r.bust} disabled={r.forcedFlips > 0} />
      </View>

      <ActionTargetPicker
        pending={r.pendingAction}
        targets={r.eligibleTargets}
        activePlayerId={r.activePlayer.id}
        onPick={r.assignAction}
        onCancel={r.cancelAction}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: Spacing.two, paddingBottom: Spacing.one },
  round: { color: Palette.gold, fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  hint: { color: Palette.textFaint, fontSize: 12 },
  forced: { color: Palette.flip3, fontSize: 13, fontWeight: '700' },
  scroll: { gap: Spacing.two, paddingBottom: Spacing.two },
  footer: { paddingVertical: Spacing.two },
});
