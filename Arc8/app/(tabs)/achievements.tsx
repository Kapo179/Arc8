import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AchievementsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Achievements</ThemedText>
      <ThemedText style={styles.subtitle}>Your trophies and achievements</ThemedText>
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