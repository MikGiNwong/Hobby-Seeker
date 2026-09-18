import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#243029',
    background: '#F7F6F1',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4EEE6',
    textSecondary: '#6B746D',

    brand: '#5F8167',
    brandSoft: '#E4EEE6',
    surface: '#FFFDF9',
    border: '#E1E5DF',
    danger: '#B95C57',
  },
  dark: {
    text: '#F3F6F3',
    background: '#131814',
    backgroundElement: '#1C231E',
    backgroundSelected: '#29372D',
    textSecondary: '#AFB8B1',

    brand: '#8CB596',
    brandSoft: '#26372B',
    surface: '#1C231E',
    border: '#364139',
    danger: '#E08B85',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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

export const Radius = {
  small: 8,
  medium: 12,
  large: 20,
  xlarge: 28,
  pill: 999,
} as const;

export const Typography = {
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

export const MaxContentWidth = 800;