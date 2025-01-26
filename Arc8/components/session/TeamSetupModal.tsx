import React, { useState, memo, useRef } from 'react';
import { View, StyleSheet, Modal, Pressable, Platform, ScrollView, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { PLAYERS_OPTIONS, PlayersPerSide } from '@/constants/game';
import { Image as ExpoImage } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';

interface TeamSetupModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (setup: TeamSetup) => void;
}

interface TeamSetup {
  homeTeam: string;
  awayTeam: string;
  playersPerSide: PlayersPerSide;
}

const TeamInput = memo(({ 
  side, 
  value, 
  onChange 
}: { 
  side: 'Home Team' | 'Away Team';
  value: string;
  onChange: (text: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.teamSection}>
      <View style={styles.badgeWrapper}>
        <ExpoImage
          source={side === 'Home Team' 
            ? require('@/assets/images/Gradient1.png')
            : require('@/assets/images/Gradient2.png')
          }
          style={styles.teamBadge}
          contentFit="cover"
        />
      </View>
      <Pressable 
        style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}
        onPress={() => inputRef.current?.focus()}
      >
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChange}
          placeholder={`${side}`}
          placeholderTextColor="#808080"
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#ccff33"
        />
      </Pressable>
    </View>
  );
});

const PlayersDropdown = memo(({ 
  visible, 
  selectedValue, 
  onSelect 
}: {
  visible: boolean;
  selectedValue: PlayersPerSide;
  onSelect: (value: PlayersPerSide) => void;
}) => (
  <View style={[styles.playersDropdown, !visible && styles.hidden]}>
    <ScrollView>
      {PLAYERS_OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          style={[
            styles.dropdownItem,
            selectedValue === option.value && styles.dropdownItemSelected
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onSelect(option.value);
          }}
        >
          <ThemedText style={[
            styles.dropdownText,
            selectedValue === option.value && styles.dropdownTextSelected
          ]}>
            {option.label}
          </ThemedText>
        </Pressable>
      ))}
    </ScrollView>
  </View>
));

export function TeamSetupModal({ visible, onClose, onSave }: TeamSetupModalProps) {
  const [setup, setSetup] = useState<TeamSetup>({
    homeTeam: '',
    awayTeam: '',
    playersPerSide: '5',
  });
  const [showPlayersDropdown, setShowPlayersDropdown] = useState(false);

  const handleTeamNameChange = (side: 'Home Team' | 'Away Team', text: string) => {
    setSetup(prev => ({
      ...prev,
      [side === 'Home Team' ? 'homeTeam' : 'awayTeam']: text,
    }));
  };

  const handlePlayersSideSelect = (value: PlayersPerSide) => {
    setSetup(prev => ({ ...prev, playersPerSide: value }));
    setShowPlayersDropdown(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Team Setup</ThemedText>
            <Pressable 
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView style={styles.content} bounces={false}>
            <View style={styles.teamsContainer}>
              <View style={styles.teamColumn}>
                <TeamInput 
                  side="Home Team"
                  value={setup.homeTeam}
                  onChange={(text) => handleTeamNameChange('Home Team', text)}
                />
              </View>
              <View style={styles.vsContainer}>
                <ThemedText style={styles.vsText}>VS</ThemedText>
              </View>
              <View style={styles.teamColumn}>
                <TeamInput 
                  side="Away Team"
                  value={setup.awayTeam}
                  onChange={(text) => handleTeamNameChange('Away Team', text)}
                />
              </View>
            </View>

            <View style={styles.playersSection}>
              <ThemedText style={styles.sectionLabel}>Players Setup</ThemedText>
              <Pressable 
                style={styles.playersSelector}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowPlayersDropdown(!showPlayersDropdown);
                }}
              >
                <ThemedText style={styles.playersValue}>
                  {PLAYERS_OPTIONS.find(opt => opt.value === setup.playersPerSide)?.label}
                </ThemedText>
                <MaterialCommunityIcons 
                  name={showPlayersDropdown ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color="#ccff33" 
                />
              </Pressable>
              <PlayersDropdown 
                visible={showPlayersDropdown}
                selectedValue={setup.playersPerSide}
                onSelect={handlePlayersSideSelect}
              />
            </View>

            <Pressable onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onSave(setup);
              onClose();
            }}>
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#000002',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
  },
  teamSection: {
    marginBottom: 24,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  teamBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 8,
  },
  inputWrapperFocused: {
    borderBottomColor: '#ccff33',
    borderBottomWidth: 2,
  },
  input: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 8,
    height: 40,
  },
  vsContainer: {
    paddingHorizontal: 20,
  },
  vsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ccff33',
  },
  playersSection: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 15,
    color: '#808080',
    marginBottom: 12,
  },
  playersSelector: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playersValue: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  playersDropdown: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
  },
  hidden: {
    display: 'none',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  dropdownItemSelected: {
    backgroundColor: '#3A3A3A',
  },
  dropdownText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dropdownTextSelected: {
    color: '#ccff33',
    fontWeight: '800',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
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