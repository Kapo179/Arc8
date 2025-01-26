import { StyleSheet } from 'react-native';
import auth from '@/src/config/firebase';
import { signOut } from 'firebase/auth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function ProfileScreen() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="h1">Profile</ThemedText>
      {auth.currentUser && (
        <ThemedText style={styles.email}>
          Email: {auth.currentUser?.email}
        </ThemedText>
      )}
      <ThemedText style={styles.signOut} onPress={handleSignOut}>
        Sign Out
      </ThemedText>
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
  email: {
    marginTop: 20,
    fontSize: 16,
  },
  signOut: {
    marginTop: 20,
    color: '#0a7ea4',
    fontSize: 16,
  },
}); 