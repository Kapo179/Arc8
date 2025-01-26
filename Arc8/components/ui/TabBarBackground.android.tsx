import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBarBackground() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={{ 
        backgroundColor: '#151718',
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }} 
    />
  );
}

export function useBottomTabOverflow() {
  const insets = useSafeAreaInsets();
  return insets.bottom;
} 