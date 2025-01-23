import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { useSessionStore } from '@/stores/sessionStore';

export function CreateSessionForm() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'ranked' | 'friendly'>('friendly');
  const [format, setFormat] = useState<'5-a-side' | '8-a-side'>('5-a-side');

  const createSession = useSessionStore(state => state.createSession);
  const loading = useSessionStore(state => state.loading);

  const handleSubmit = async () => {
    await createSession({
      title,
      location: { name: location },
      type,
      format,
      status: 'pending',
      teams: {
        home: { id: '', name: 'Home Team', players: [], captain: '' },
        away: { id: '', name: 'Away Team', players: [], captain: '' }
      },
      rules: [],
      highlights: [],
      invites: []
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Session Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter session title"
      />
      
      {/* Add other form fields */}
      
      <Button 
        onPress={handleSubmit}
        loading={loading}
      >
        Create Session
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
}); 