import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

export default function GameActionScreen() {
  const { action } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="h1" style={styles.title}>Pick your mode</ThemedText>
      
      <Pressable 
        style={styles.modeButton}
        onPress={() => router.push(`/game/${action}/ranked`)}>
        <ThemedText style={styles.buttonTitle}>Ranked</ThemedText>
        <ThemedText style={styles.buttonSubtitle}>Compete for leaderboard positions!</ThemedText>
      </Pressable>

      <Pressable 
        style={styles.modeButton}
        onPress={() => router.push(`/game/${action}/friendly`)}>
        <ThemedText style={styles.buttonTitle}>Friendly</ThemedText>
        <ThemedText style={styles.buttonSubtitle}>Play casual games with friends</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  title: {
    marginBottom: 30,
  },
  modeButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
}); 