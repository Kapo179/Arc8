import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'bell.fill': 'notifications',
  'trophy.fill': 'emoji-events',
  'shirt.fill': 'sports-soccer',
  'person.fill': 'person',
  'chevron.right': 'chevron-right',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  return <MaterialIcons name={MAPPING[name]} size={size} color={color} style={style} />;
} 