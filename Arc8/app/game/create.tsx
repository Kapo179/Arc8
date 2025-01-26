import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { TeamSetupModal } from '@/components/session/TeamSetupModal';
import { TeamSummary } from '@/components/session/TeamSummary';
import { PLAYERS_OPTIONS, GAME_TYPES, GameType } from '@/constants/game';
import { Image as ExpoImage } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { GradientButton } from '@/components/ui/GradientButton';
import { Button, XStack, YStack } from 'tamagui';

const EMOJIS = {
  team: '⚽',
  league: '🏆',
};

const SECTIONS = [
  {
    id: 'team',
    icon: '⚽',
    label: 'Select Team',
    value: (form: GameSetupForm) => form.homeTeam || 'Select Team',
    showLabel: false,
    chevronType: 'chevron-right',
  },
];

interface TeamSetup {
  homeTeam: string;
  awayTeam: string;
  playersPerSide: string;
}

interface GameSetupForm {
  homeTeam: string | null;
  awayTeam: string | null;
  gameType: 'private' | 'ranked';  // Changed from 'friendly' to 'private'
}

export default function CreateGameScreen() {
  const router = useRouter();
  const [showGameTypes, setShowGameTypes] = useState(false);
  const [showTeamSetup, setShowTeamSetup] = useState(false);
  const [form, setForm] = useState<GameSetupForm>({
    homeTeam: null,
    awayTeam: null,
    gameType: 'private',  // Changed from 'friendly' to 'private'
  });
  const [teamSetup, setTeamSetup] = useState({
    homeTeam: '',
    awayTeam: '',
    playersPerSide: '5-a-side',
  });
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const handleCreate = (type: 'private' | 'ranked') => {
    // TODO: Validate and submit form with type
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

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          ExpoImage.prefetch(require('@/assets/images/Gradient1.png')),
          ExpoImage.prefetch(require('@/assets/images/Gradient2.png')),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const renderTeamSection = () => {
    if (teamSetup.homeTeam || teamSetup.awayTeam) {
      return (
        <>
          <View style={styles.teamContainer}>
            <TeamSummary
              homeTeam={teamSetup.homeTeam}
              awayTeam={teamSetup.awayTeam}
              playersPerSide={teamSetup.playersPerSide}
              onEdit={() => setShowTeamSetup(true)}
            />
          </View>
          <Pressable 
            style={styles.editTeamSection}
            onPress={() => setShowTeamSetup(true)}
          >
            <View style={styles.sectionContent}>
              <View style={[styles.iconContainer, styles.editIconContainer]}>
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
            <ThemedText style={styles.icon}>⚽</ThemedText>
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

  const renderActionButtons = () => (
    <YStack
      space="$4"
      padding="$4"
      paddingBottom={insets.bottom}
      borderTopWidth={1}
      borderTopColor="$borderColor"
    >
      <Button
        size="$6"
        theme="arc8"
        backgroundColor="$background"
        pressStyle={{ opacity: 0.8 }}
        onPress={() => handleCreate('private')}
        icon={<MaterialCommunityIcons name="account-group" size={24} color="#000000" />}
      >
        Private Match
      </Button>

      <Button
        size="$6"
        theme="arc8"
        backgroundColor="$background"
        pressStyle={{ opacity: 0.8 }}
        onPress={() => handleCreate('ranked')}
        icon={<MaterialCommunityIcons name="trophy" size={24} color="#000000" />}
      >
        Ranked Match
      </Button>
    </YStack>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Create Match',
          headerShown: true,
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              tint="dark"
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          ),
          headerTintColor: '#FFFFFF',
          headerBackTitle: 'Home',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: insets.top + 44 + 20, // header height (44) + safe area + extra padding
          }
        ]}
      >
        <View style={styles.headerSection}>
          <ThemedText style={styles.title}>Create Match</ThemedText>
          <ThemedText style={styles.subtitle}>Create your match and invite players</ThemedText>
        </View>

        {renderTeamSection()}
        
        {SECTIONS.filter(section => section.id !== 'team' && section.id !== 'gameType').map((section) => (
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
              {section.chevronType !== 'none' && (
                <MaterialCommunityIcons 
                  name="chevron-right"
                  size={24}
                  color="#ccff33"
                  style={styles.chevron}
                />
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {renderActionButtons()}

      <TeamSetupModal
        visible={showTeamSetup}
        onClose={() => setShowTeamSetup(false)}
        onSave={handleTeamSetup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'FunnelSans-BoldItalic',
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'FunnelSans-Bold',
    fontSize: 16,
    color: '#9BA1A6',
    lineHeight: 24,
    marginTop: 8,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A2A',
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000002',
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
    marginBottom: 8,
    fontFamily: 'FunnelSans-Bold',
  },
  value: {
    fontSize: 17,
    color: '#808080',
  },
  chevron: {
    marginLeft: 8,
  },
  createButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    fontFamily: 'FunnelSans-Bold',
  },
  teamContainer: {
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
  editTeamSection: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A2A',
  },
  editIconContainer: {
    backgroundColor: '#000002',
  },
  sectionDisabled: {
    opacity: 0.5,
  },
  labelDisabled: {
    color: '#404040',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2A2A2A',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ccff33',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'FunnelSans-Bold',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
}); 