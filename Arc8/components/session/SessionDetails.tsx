import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useSessionStore } from '@/stores/sessionStore';
import { Session } from '@/types/session';
import { HostView } from './HostView';
import { PlayerView } from './PlayerView';
import { RefereeView } from './RefereeView';
import { useAuth } from '@/hooks/useAuth';

interface SessionDetailsProps {
  sessionId: string;
}

export function SessionDetails({ sessionId }: SessionDetailsProps) {
  const session = useSessionStore(state => state.currentSession);
  const { user } = useAuth();

  if (!session) return null;

  const getUserRole = () => {
    if (session.hostId === user?.id) return 'host';
    if (session.referee === user?.id) return 'referee';
    return 'player';
  };

  const renderRoleView = () => {
    const role = getUserRole();
    
    switch (role) {
      case 'host':
        return <HostView session={session} />;
      case 'referee':
        return <RefereeView session={session} />;
      default:
        return <PlayerView session={session} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{session.title}</ThemedText>
        <ThemedText style={styles.type}>{session.type} Match</ThemedText>
        <ThemedText style={styles.format}>{session.format}</ThemedText>
      </View>

      {renderRoleView()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D3748',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  type: {
    fontSize: 16,
    color: '#60A5FA',
    marginBottom: 4,
  },
  format: {
    fontSize: 14,
    color: '#9CA3AF',
  },
}); 