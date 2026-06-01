/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/**
 * Poker / blackjack table palette used across the game screens.
 * Kept separate from the themed light/dark `Colors` above, which drive the
 * generic ThemedText/ThemedView primitives.
 */
export const Palette = {
  feltDeep: '#0B3D2E',
  felt: '#0F5132',
  feltLight: '#157347',
  feltRail: '#5A3210',
  surface: '#13231C',
  surfaceRaised: '#1C3329',
  surfaceMuted: '#0A1A14',
  border: '#2A4A3B',
  gold: '#E8C66B',
  goldDim: '#9C8442',
  text: '#F2F5F3',
  textMuted: '#9FB3AA',
  textFaint: '#6E867C',
  numberCard: '#FBFBF7',
  numberCardText: '#10241B',
  modifier: '#3C6E9E',
  freeze: '#4FB3D9',
  flip3: '#C77DD6',
  secondChance: '#6BBF73',
  danger: '#E5564E',
  dangerSoft: '#3A1D1B',
  success: '#5BD27A',
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
  pill: 999,
} as const;
