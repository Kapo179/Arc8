import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateSessionForm } from '@/components/session/CreateSessionForm';
import { ThemedView } from '@/components/ThemedView';

export default function CreateSessionScreen() {
  return (
    <ThemedView style={styles.container}>
      <CreateSessionForm />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 