import React, { useState, memo } from 'react';
import { View, StyleSheet, Modal, Pressable, Image, Platform, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from '@/components/ui/TextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { PLAYERS_OPTIONS, PlayersPerSide } from '@/constants/game';

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

const TeamBadge = memo(({ 
  side, 
  value, 
  onChange 
}: { 
  side: 'home' | 'away';
  value: string;
  onChange: (text: string) => void;
}) => (
  <View style={styles.teamSection}>
    <View style={styles.badgeWrapper}>
      <Image
        source={side === 'home' 
          ? require('@/assets/images/Gradient1.png')
          : require('@/assets/images/Gradient2.png')
        }
        style={styles.teamBadge}
        resizeMode="cover"
      />
    </View>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={`Enter ${side} team name`}
      placeholderTextColor="#808080"
      style={styles.input}
      autoCapitalize="words"
      autoCorrect={false}
      maxLength={30}
    />
  </View>
));

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

  const handleTeamNameChange = (side: 'home' | 'away', text: string) => {
    setSetup(prev => ({
      ...prev,
      [`${side}Team`]: text,
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
                <TeamBadge 
                  side="home"
                  value={setup.homeTeam}
                  onChange={(text) => handleTeamNameChange('home', text)}
                />
              </View>
              <View style={styles.vsContainer}>
                <ThemedText style={styles.vsText}>VS</ThemedText>
              </View>
              <View style={styles.teamColumn}>
                <TeamBadge 
                  side="away"
                  value={setup.awayTeam}
                  onChange={(text) => handleTeamNameChange('away', text)}
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
    backgroundColor: '#151718',
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
    fontWeight: '600',
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
    alignItems: 'center',
    width: '100%',
  },
  badgeWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    overflow: 'hidden',
  },
  teamBadge: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '90%',
    height: 44,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderWidth: 0,
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
  },
  dropdownTextSelected: {
    color: '#ccff33',
    fontWeight: '500',
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