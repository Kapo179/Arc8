import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from '@/components/ui/TextInput';

type TeamSide = 'home' | 'away';
type PlayersPerSide = '5' | '6' | '7' | '8' | '9' | '11';

interface TeamSetup {
  homeTeam: string;
  awayTeam: string;
  playersPerSide: PlayersPerSide;
}

const EMOJIS = {
  home: '🏠',
  away: '🏃',
  players: '👥',
};

const PLAYERS_OPTIONS: { value: PlayersPerSide; label: string }[] = [
  { value: '5', label: '5-a-side' },
  { value: '6', label: '6-a-side' },
  { value: '7', label: '7-a-side' },
  { value: '8', label: '8-a-side' },
  { value: '9', label: '9-a-side' },
  { value: '11', label: '11-a-side' },
];

export default function SelectTeamScreen() {
  const router = useRouter();
  const [showPlayersDropdown, setShowPlayersDropdown] = useState(false);
  const [setup, setSetup] = useState<TeamSetup>({
    homeTeam: '',
    awayTeam: '',
    playersPerSide: '5',
  });

  const handleSave = () => {
    // TODO: Validate and save team setup
    router.back();
  };

  const TeamBadge = ({ side }: { side: TeamSide }) => (
    <View style={styles.teamSection}>
      <View style={styles.teamHeader}>
        <ThemedText style={styles.teamHeaderText}>
          {side === 'home' ? 'Home Team' : 'Away Team'}
        </ThemedText>
        <ThemedText style={styles.emoji}>
          {side === 'home' ? EMOJIS.home : EMOJIS.away}
        </ThemedText>
      </View>
      <View style={styles.teamContent}>
        <Image
          source={side === 'home' 
            ? require('@/assets/images/Gradient1.png')
            : require('@/assets/images/Gradient2.png')
          }
          style={styles.teamBadge}
        />
        <View style={styles.teamInputContainer}>
          <TextInput
            value={side === 'home' ? setup.homeTeam : setup.awayTeam}
            onChangeText={(text) => 
              setSetup(prev => ({
                ...prev,
                [side === 'home' ? 'homeTeam' : 'awayTeam']: text
              }))
            }
            placeholder={`Enter ${side} team name`}
            placeholderTextColor="#808080"
            style={styles.teamInput}
          />
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Select Team',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFFFFF',
          headerBackTitle: 'Match Setup',
        }} 
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TeamBadge side="home" />
        <View style={styles.vsContainer}>
          <ThemedText style={styles.vsText}>VS</ThemedText>
        </View>
        <TeamBadge side="away" />

        <View style={styles.playersSection}>
          <View style={styles.playersHeader}>
            <ThemedText style={styles.playersHeaderText}>Players Setup</ThemedText>
            <ThemedText style={styles.emoji}>{EMOJIS.players}</ThemedText>
          </View>
          <Pressable 
            style={styles.playersSelector}
            onPress={() => setShowPlayersDropdown(true)}
          >
            <View style={styles.playersSelectorContent}>
              <ThemedText style={styles.playersValue}>
                {PLAYERS_OPTIONS.find(opt => opt.value === setup.playersPerSide)?.label}
              </ThemedText>
              <MaterialCommunityIcons 
                name="chevron-down" 
                size={24} 
                color="#ccff33" 
              />
            </View>
          </Pressable>
        </View>

        <Pressable onPress={handleSave}>
          <LinearGradient
            colors={['#ccff33', '#9ef01a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <ThemedText style={styles.saveButtonText}>Save Teams</ThemedText>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  teamSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamHeaderText: {
    fontSize: 15,
    color: '#808080',
    fontWeight: '500',
  },
  emoji: {
    fontSize: 20,
  },
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  teamInputContainer: {
    flex: 1,
  },
  teamInput: {
    fontSize: 17,
    color: '#FFFFFF',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    borderWidth: 0,
  },
  vsContainer: {
    alignItems: 'center',
    marginVertical: -8,
  },
  vsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ccff33',
  },
  playersSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  playersHeaderText: {
    fontSize: 15,
    color: '#808080',
    fontWeight: '500',
  },
  playersSelector: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  playersSelectorContent: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playersValue: {
    fontSize: 17,
    color: '#FFFFFF',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#ccff33',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
}); 