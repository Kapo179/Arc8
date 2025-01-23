import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { TeamSetupModal } from '@/components/session/TeamSetupModal';
import { TeamSummary } from '@/components/session/TeamSummary';
import { PLAYERS_OPTIONS, GAME_TYPES, GameType } from '@/constants/game';

const EMOJIS = {
  team: '🛡️',
  league: '🏆',
  location: '📍',
  date: '📅',
  time: '⏰',
};

const SECTIONS = [
  {
    id: 'team',
    icon: '🛡️',
    label: 'Select Team',
    value: (form: GameSetupForm) => form.homeTeam || 'Select Team',
    showLabel: false,
    chevronType: 'chevron-right',
  },
  {
    id: 'gameType',
    icon: '🏆',
    label: 'Game Type',
    value: (form: GameSetupForm) => GAME_TYPES.find(t => t.value === form.gameType)?.label,
    showLabel: true,
    chevronType: 'chevron-down',
  },
  {
    id: 'location',
    icon: '📍',
    label: 'Location',
    value: (form: GameSetupForm) => form.location || 'Select location',
    showLabel: true,
    chevronType: 'chevron-right',
  },
  {
    id: 'date',
    icon: '📅',
    label: 'Date',
    value: (form: GameSetupForm) => format(form.date, 'EEE, MMM d, yyyy'),
    showLabel: true,
    chevronType: 'chevron-right',
  },
  {
    id: 'time',
    icon: '⏰',
    label: 'Time',
    value: (form: GameSetupForm) => format(form.time, 'h:mm a'),
    showLabel: true,
    chevronType: 'chevron-right',
  },
];

export default function CreateGameScreen() {
  const router = useRouter();
  const [showGameTypes, setShowGameTypes] = useState(false);
  const [showTeamSetup, setShowTeamSetup] = useState(false);
  const [form, setForm] = useState<GameSetupForm>({
    homeTeam: null,
    awayTeam: null,
    gameType: 'friendly',
    location: '',
    date: new Date(),
    time: new Date(),
  });
  const [teamSetup, setTeamSetup] = useState({
    homeTeam: '',
    awayTeam: '',
    playersPerSide: '5-a-side',
  });

  const handleCreate = () => {
    // TODO: Validate and submit form
    router.back();
  };

  const updateForm = (updates: Partial<GameSetupForm>) => {
    setForm(current => ({ ...current, ...updates }));
  };

  const handleTeamSetup = (setup: TeamSetup) => {
    setTeamSetup({
      homeTeam: setup.homeTeam,
      awayTeam: setup.awayTeam,
      playersPerSide: PLAYERS_OPTIONS.find(opt => opt.value === setup.playersPerSide)?.label || '5-a-side',
    });
    updateForm({
      homeTeam: setup.homeTeam,
      awayTeam: setup.awayTeam,
    });
  };

  const handleSectionPress = (sectionId: string) => {
    switch (sectionId) {
      case 'team':
        setShowTeamSetup(true);
        break;
      case 'gameType':
        setShowGameTypes(true);
        break;
      // ... handle other sections
    }
  };

  const renderTeamSection = () => {
    if (teamSetup.homeTeam || teamSetup.awayTeam) {
      return (
        <>
          <TeamSummary
            homeTeam={teamSetup.homeTeam}
            awayTeam={teamSetup.awayTeam}
            playersPerSide={teamSetup.playersPerSide}
            onEdit={() => setShowTeamSetup(true)}
          />
          <Pressable 
            style={styles.editSection}
            onPress={() => setShowTeamSetup(true)}
          >
            <View style={styles.sectionContent}>
              <View style={styles.iconContainer}>
                <ThemedText style={styles.icon}>✏️</ThemedText>
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.label}>Team Setup</ThemedText>
                <ThemedText style={styles.value}>Edit Teams</ThemedText>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="#ccff33"
                style={styles.chevron}
              />
            </View>
          </Pressable>
        </>
      );
    }

    return (
      <Pressable 
        style={styles.section}
        onPress={() => setShowTeamSetup(true)}
      >
        <View style={styles.sectionContent}>
          <View style={styles.iconContainer}>
            <ThemedText style={styles.icon}>🛡️</ThemedText>
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={styles.value}>Select Teams</ThemedText>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color="#ccff33"
            style={styles.chevron}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Create Match',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFFFFF',
          headerBackTitle: 'Home',
          headerBackTitleVisible: true,
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {renderTeamSection()}
        
        {SECTIONS.filter(section => section.id !== 'team').map((section) => (
          <Pressable 
            key={section.id}
            style={styles.section}
            onPress={() => handleSectionPress(section.id)}
          >
            <View style={styles.sectionContent}>
              <View style={styles.iconContainer}>
                <ThemedText style={styles.icon}>{section.icon}</ThemedText>
              </View>
              <View style={styles.textContainer}>
                {section.showLabel && (
                  <ThemedText style={styles.label}>{section.label}</ThemedText>
                )}
                <ThemedText style={styles.value}>
                  {section.value(form)}
                </ThemedText>
              </View>
              <MaterialCommunityIcons 
                name={section.chevronType} 
                size={24} 
                color="#ccff33"
                style={styles.chevron}
              />
            </View>
          </Pressable>
        ))}

        <Pressable onPress={handleCreate}>
          <LinearGradient
            colors={['#ccff33', '#9ef01a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createButton}
          >
            <ThemedText style={styles.createButtonText}>Create Match</ThemedText>
          </LinearGradient>
        </Pressable>
      </ScrollView>

      <TeamSetupModal
        visible={showTeamSetup}
        onClose={() => setShowTeamSetup(false)}
        onSave={handleTeamSetup}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 16,
    gap: 8, // Spacing between sections
  },
  section: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    marginBottom: 8,
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
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#808080',
    marginBottom: 2,
  },
  value: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  chevron: {
    marginLeft: 8,
  },
  createButton: {
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
  createButtonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
  editSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    marginBottom: 8,
    marginTop: -4, // Tighter spacing with summary
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
}); 