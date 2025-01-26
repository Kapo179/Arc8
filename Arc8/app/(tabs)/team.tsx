import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function TeamScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="h1">Team</ThemedText>
      <ThemedText style={styles.subtitle}>Your team information</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
}); 