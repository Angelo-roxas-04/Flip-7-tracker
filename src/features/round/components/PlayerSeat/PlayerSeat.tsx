/**
 * A single seat node on the poker table: avatar disc with initial, name, and
 * cumulative score. Visually reflects active / stayed / busted status.
 */

import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius } from '@/constants/theme';
import { SeatInfo } from '@/features/round/useRound';

export const SEAT_SIZE = 76;

const STATUS_LABEL: Record<SeatInfo['status'], string> = {
  active: '',
  stayed: 'STAY',
  busted: 'BUST',
};

export function PlayerSeat({ seat }: { seat: SeatInfo }) {
  const { player, status, isActive, cardCount } = seat;
  const busted = status === 'busted';

  return (
    <View style={[styles.wrap, isActive && styles.activeWrap]}>
      <View
        style={[
          styles.disc,
          isActive && styles.activeDisc,
          status === 'stayed' && styles.stayedDisc,
          busted && styles.bustedDisc,
        ]}>
        <Text style={[styles.initial, busted && styles.dimText]}>
          {player.name.charAt(0).toUpperCase()}
        </Text>
        {status !== 'active' && <Text style={styles.statusTag}>{STATUS_LABEL[status]}</Text>}
        {status === 'active' && cardCount > 0 && <Text style={styles.count}>{cardCount}🂠</Text>}
      </View>
      <Text style={[styles.name, busted && styles.dimText]} numberOfLines={1}>
        {player.name}
      </Text>
      <Text style={[styles.score, isActive && styles.activeScore]}>{player.totalScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: SEAT_SIZE, alignItems: 'center', gap: 1 },
  activeWrap: { transform: [{ scale: 1.06 }] },
  disc: {
    width: 46,
    height: 46,
    borderRadius: Radius.pill,
    backgroundColor: Palette.surfaceRaised,
    borderWidth: 2,
    borderColor: Palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDisc: { borderColor: Palette.gold, backgroundColor: Palette.feltLight, shadowColor: Palette.gold, shadowOpacity: 0.7, shadowRadius: 8, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  stayedDisc: { borderColor: Palette.success },
  bustedDisc: { borderColor: Palette.danger, opacity: 0.6 },
  initial: { color: Palette.text, fontSize: 20, fontWeight: '800' },
  statusTag: { position: 'absolute', bottom: -6, fontSize: 9, fontWeight: '800', color: Palette.text, backgroundColor: Palette.surfaceMuted, paddingHorizontal: 4, borderRadius: 4, overflow: 'hidden' },
  count: { position: 'absolute', bottom: -6, fontSize: 9, color: Palette.gold, fontWeight: '700' },
  name: { color: Palette.textMuted, fontSize: 11, fontWeight: '600', maxWidth: SEAT_SIZE },
  score: { color: Palette.text, fontSize: 14, fontWeight: '800' },
  activeScore: { color: Palette.gold },
  dimText: { color: Palette.textFaint },
});
