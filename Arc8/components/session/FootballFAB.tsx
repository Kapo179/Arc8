import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export function FootballFAB() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(!isExpanded);
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
  };

  const handleHostGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(false);
    router.push('/game/create');
  };

  const handleJoinGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(false);
    router.push('/game/join');
  };

  return (
    <View style={styles.container}>
      {isExpanded && (
        <View style={styles.menu}>
          <Pressable onPress={handleHostGame} style={styles.menuItem}>
            <MaterialCommunityIcons name="whistle" size={24} color="#60A5FA" />
            <ThemedText style={styles.menuText}>Host Game</ThemedText>
          </Pressable>
          <Pressable onPress={handleJoinGame} style={styles.menuItem}>
            <MaterialCommunityIcons name="account-group" size={24} color="#60A5FA" />
            <ThemedText style={styles.menuText}>Join Game</ThemedText>
          </Pressable>
        </View>
      )}
      
      <Animated.View style={[styles.fabContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Pressable onPress={handlePress} style={styles.fab}>
          <MaterialCommunityIcons 
            name={isExpanded ? "close" : "soccer"} 
            size={24} 
            color="#FFFFFF" 
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 16,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  fabContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#60A5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 