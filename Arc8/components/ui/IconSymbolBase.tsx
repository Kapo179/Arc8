import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export type IconSymbolName = 'house' | 'bell' | 'trophy' | 'shirt' | 'person' | 'chevron-right';

/**
 * An icon component that uses Expo vector icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  filled = false,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  filled?: boolean;
}) {
  const iconStyle = [{ paddingTop: 4 }, style];

  switch (name) {
    case 'house':
      return <MaterialCommunityIcons name={filled ? "home" : "home-outline"} size={size} color={color} style={iconStyle} />;
    case 'bell':
      return <MaterialCommunityIcons name={filled ? "bell" : "bell-outline"} size={size} color={color} style={iconStyle} />;
    case 'trophy':
      return <MaterialCommunityIcons name={filled ? "trophy" : "trophy-outline"} size={size} color={color} style={iconStyle} />;
    case 'shirt':
      return <MaterialCommunityIcons name={filled ? "tshirt-crew" : "tshirt-crew-outline"} size={size} color={color} style={iconStyle} />;
    case 'person':
      return <Ionicons name={filled ? "person-circle" : "person-circle-outline"} size={size} color={color} style={iconStyle} />;
    case 'chevron-right':
      return <Ionicons name="chevron-forward" size={size} color={color} style={iconStyle} />;
    default:
      console.warn(`Icon "${name}" not found`);
      return null;
  }
} 