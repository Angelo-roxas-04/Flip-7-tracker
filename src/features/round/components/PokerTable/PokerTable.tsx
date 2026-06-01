/**
 * The felt oval. Measures its own width, positions each seat around the rim,
 * and renders the active-player panel in the center.
 */

import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { Palette, Radius } from '@/constants/theme';
import { PlayerSeat, SEAT_SIZE } from '@/features/round/components/PlayerSeat/PlayerSeat';
import { seatPositions } from '@/features/round/components/PokerTable/seatLayout';
import { SeatInfo } from '@/features/round/useRound';

const TABLE_HEIGHT = 300;

type Props = { seats: SeatInfo[]; children: React.ReactNode };

export function PokerTable({ seats, children }: Props) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const positions = seatPositions(seats.length, width, TABLE_HEIGHT, SEAT_SIZE);

  return (
    <View style={styles.frame} onLayout={onLayout}>
      <View style={styles.felt}>
        <View style={styles.center}>{children}</View>
      </View>
      {seats.map((seat, i) => (
        <View key={seat.player.id} style={[styles.seatSlot, positions[i]]}>
          <PlayerSeat seat={seat} />
        </View>
      ))}
    </View>
  );
}

const RAIL = SEAT_SIZE / 2;

const styles = StyleSheet.create({
  frame: { height: TABLE_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' },
  felt: {
    position: 'absolute',
    top: RAIL,
    bottom: RAIL,
    left: RAIL,
    right: RAIL,
    borderRadius: Radius.pill,
    backgroundColor: Palette.felt,
    borderWidth: 6,
    borderColor: Palette.feltRail,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  center: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  seatSlot: { position: 'absolute' },
});
