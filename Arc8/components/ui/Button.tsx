import React from 'react';
import { 
  Pressable, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ 
  children, 
  onPress, 
  style, 
  loading, 
  disabled,
  variant = 'primary' 
}: ButtonProps) {
  return (
    <Pressable 
      onPress={onPress}
      disabled={loading || disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <ThemedText style={[styles.text, styles[`${variant}Text`]]}>
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: '#60A5FA',
  },
  secondary: {
    backgroundColor: '#374151',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#60A5FA',
  },
}); 