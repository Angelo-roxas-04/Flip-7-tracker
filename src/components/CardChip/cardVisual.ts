/**
 * Maps a played Card to its on-chip label and colors. UI-side concern, so it
 * lives with the chip component rather than in the domain layer.
 */

import { Palette } from '@/constants/theme';
import { Card } from '@/game/types';

export type CardVisual = { label: string; bg: string; fg: string };

export function describeCard(card: Card): CardVisual {
  if (card.kind === 'number') {
    return { label: String(card.value), bg: Palette.numberCard, fg: Palette.numberCardText };
  }
  if (card.kind === 'modifier') {
    return { label: card.modifier, bg: Palette.modifier, fg: '#fff' };
  }
  switch (card.action) {
    case 'freeze':
      return { label: '❄', bg: Palette.freeze, fg: '#06222B' };
    case 'flip3':
      return { label: '↻3', bg: Palette.flip3, fg: '#2A0E30' };
    case 'secondChance':
      return { label: '🛡', bg: Palette.secondChance, fg: '#0A2A12' };
  }
}
