import React from 'react';
import styled from 'styled-components/native';
import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlowingButtonProps {
  text?: string;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

const StyledPressable = styled.Pressable<{ disabled?: boolean }>`
  min-width: 120px;
  min-height: 44px;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const StyledText = styled.Text<{ selected?: boolean }>`
  color: ${props => props.selected ? '#000000' : '#FFFFFF'};
  font-size: 15px;
  font-family: FunnelSans-Bold;
  text-align: center;
`;

const GlowingButton = ({ 
  text = "Ranked", 
  onPress, 
  selected = false,
  disabled = false 
}: GlowingButtonProps) => {
  const gradientColors = selected ? 
    ['#ccff33', '#ccff33', '#ccff33'] : 
    ['hsla(217, 100%, 56%, 1)', 'hsla(194, 100%, 69%, 1)', 'hsla(217, 100%, 56%, 1)'];

  return (
    <StyledPressable onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 14,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          shadowColor: selected ? '#ccff33' : 'rgba(71, 184, 255, 0.5)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 20,
          elevation: 5,
        }}
      >
        <StyledText selected={selected}>{text}</StyledText>
      </LinearGradient>
    </StyledPressable>
  );
}

export default GlowingButton; 