import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Session } from '@/types/session';
import { useSessionStore } from '@/stores/sessionStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HostViewProps {
  session: Session;
}

export function HostView({ session }: HostViewProps) {
  const { invitePlayers, setScore, nominateRef } = useSessionStore();

  const handleInvite = () => {
    // TODO: Open player selection modal
  };

  const handleSetScore = () => {
    // TODO: Open score input modal
  };

  const handleNominateRef = () => {
    // TODO: Open referee selection modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Teams</ThemedText>
          <Pressable onPress={handleInvite} style={styles.actionButton}>
            <MaterialCommunityIcons name="account-plus" size={24} color="#60A5FA" />
            <ThemedText style={styles.actionText}>Invite Players</ThemedText>
          </Pressable>
        </View>

        <View style={styles.teams}>
          <View style={styles.team}>
            <ThemedText style={styles.teamName}>{session.teams.home.name}</ThemedText>
            {session.teams.home.players.map(player => (
              <ThemedText key={player.id} style={styles.playerName}>
                {player.name}
              </ThemedText>
            ))}
          </View>

          <View style={styles.team}>
            <ThemedText style={styles.teamName}>{session.teams.away.name}</ThemedText>
            {session.teams.away.players.map(player => (
              <ThemedText key={player.id} style={styles.playerName}>
                {player.name}
              </ThemedText>
            ))}
          </View>
        </View>
      </View>

      {session.status === 'in-progress' && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Score</ThemedText>
            <Pressable onPress={handleSetScore} style={styles.actionButton}>
              <MaterialCommunityIcons name="pencil" size={24} color="#60A5FA" />
              <ThemedText style={styles.actionText}>Update Score</ThemedText>
            </Pressable>
          </View>

          <View style={styles.score}>
            <ThemedText style={styles.scoreText}>
              {session.score?.home || 0} - {session.score?.away || 0}
            </ThemedText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#60A5FA',
    fontSize: 16,
  },
  teams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  playerName: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  score: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#1F2937',
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '600',
  },
}); 