import React from 'react';
import styled from 'styled-components/native';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  onPress: () => void;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

const StyledPressable = styled.Pressable<{ disabled?: boolean }>`
  min-width: 120px;
  min-height: 44px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  border-radius: 8px;
  overflow: hidden;
`;

const StyledText = styled.Text<{ selected?: boolean }>`
  color: ${props => props.selected ? '#FFFFFF' : '#808080'};
  font-size: 15px;
  font-family: FunnelSans-Bold;
  text-align: center;
`;

export function GradientButton({ onPress, disabled, selected, children }: GradientButtonProps) {
  return (
    <StyledPressable
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      {selected ? (
        <LinearGradient
          colors={['#0061FF', '#47B8FF', '#0061FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <StyledText selected={selected}>{children}</StyledText>
        </LinearGradient>
      ) : (
        <StyledText selected={selected} style={styles.text}>{children}</StyledText>
      )}
    </StyledPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  gradient: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 12,
  }
}); 