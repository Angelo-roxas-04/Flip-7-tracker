/**
 * The flip grid: number cards 1–7, then special/action cards below, laid out
 * in a uniform 4-column grid. Flags numbers already held as duplicates.
 */

import { StyleSheet, Text, View } from 'react-native';

import { Palette, Spacing } from '@/constants/theme';
import { CardButton } from '@/features/round/components/CardButton/CardButton';
import { NUMBER_CARDS, SPECIAL_CARDS, type CardDef } from '@/game/cards';
import { Card } from '@/game/types';

const COLUMNS = 4;

type Props = { heldNumbers: Set<number>; onFlip: (card: Card) => void };

export function CardGrid({ heldNumbers, onFlip }: Props) {
  const isDup = (def: CardDef) => def.card.kind === 'number' && heldNumbers.has(def.card.value);

  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>Tap the card you flipped</Text>
      <Section defs={NUMBER_CARDS} isDup={isDup} onFlip={onFlip} />
      <View style={styles.divider} />
      <Section defs={SPECIAL_CARDS} isDup={isDup} onFlip={onFlip} />
    </View>
  );
}

function Section({
  defs,
  isDup,
  onFlip,
}: {
  defs: CardDef[];
  isDup: (def: CardDef) => boolean;
  onFlip: (card: Card) => void;
}) {
  const rows = chunk(defs, COLUMNS);
  return (
    <>
      {rows.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((def) => (
            <CardButton key={def.key} def={def} isDuplicate={isDup(def)} onPress={() => onFlip(def.card)} />
          ))}
          {padCount(row.length) > 0 &&
            Array.from({ length: padCount(row.length) }).map((_, i) => (
              <View key={`pad${i}`} style={styles.spacer} />
            ))}
        </View>
      ))}
    </>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const padCount = (rowLength: number) => COLUMNS - rowLength;

const styles = StyleSheet.create({
  wrap: { gap: Spacing.one },
  caption: { color: Palette.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 2 },
  row: { flexDirection: 'row', gap: Spacing.one },
  spacer: { flex: 1 },
  divider: { height: 1, backgroundColor: Palette.border, marginVertical: Spacing.one },
});
