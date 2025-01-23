/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: Platform.select({
      ios: '#0a7ea4',
      android: '#2196F3',
    }),
    border: Platform.select({
      ios: '#C7C7CC',
      android: '#E0E0E0',
    }),
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: Platform.select({
      ios: '#0a7ea4',
      android: '#2196F3',
    }),
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    border: '#272729',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};
