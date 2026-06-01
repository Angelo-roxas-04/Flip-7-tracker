/**
 * Center-of-table readout for whoever is currently flipping: their name, the
 * live hand total, the "if you stay" projection, and the cards in hand.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CardChip } from '@/components/CardChip/CardChip';
import { Palette, Spacing } from '@/constants/theme';
import { HandBreakdown } from '@/game/scoring';
import { Card, Player } from '@/game/types';

type Props = {
  player: Player;
  cards: Card[];
  breakdown: HandBreakdown;
  ifYouStay: number;
  hasSecondChance: boolean;
};

export function ActivePanel({ player, cards, breakdown, ifYouStay, hasSecondChance }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.turn}>{player.name}&apos;s turn</Text>

      <View style={styles.stats}>
        <Stat label="Total" value={player.totalScore} />
        <Stat label="Hand" value={breakdown.total} highlight />
        <Stat label="If Stay" value={ifYouStay} gold />
      </View>

      {hasSecondChance && <Text style={styles.second}>🛡 Second Chance held</Text>}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hand}>
        {cards.length === 0 ? (
          <Text style={styles.empty}>Flip a card to begin</Text>
        ) : (
          cards.map((card, i) => <CardChip key={i} card={card} size="sm" />)
        )}
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, highlight, gold }: { label: string; value: number; highlight?: boolean; gold?: boolean }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, highlight && styles.white, gold && styles.goldText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: Spacing.one, width: '100%' },
  turn: { color: Palette.text, fontSize: 16, fontWeight: '800' },
  stats: { flexDirection: 'row', gap: Spacing.three, justifyContent: 'center' },
  stat: { alignItems: 'center' },
  statLabel: { color: '#CDE5DA', fontSize: 10, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
  statValue: { color: '#E6F2EC', fontSize: 22, fontWeight: '800' },
  white: { color: '#fff' },
  goldText: { color: Palette.gold },
  second: { color: Palette.secondChance, fontSize: 11, fontWeight: '700' },
  hand: { gap: 4, alignItems: 'center', paddingHorizontal: 4, minHeight: 38 },
  empty: { color: '#BFD8CD', fontSize: 12, fontStyle: 'italic' },
});
