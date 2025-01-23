import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBarBackground() {
  const insets = useSafeAreaInsets();
  
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="dark"
      intensity={100}
      style={[
        StyleSheet.absoluteFill,
        {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: 'hidden',
        },
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  const insets = useSafeAreaInsets();
  return insets.bottom;
}
