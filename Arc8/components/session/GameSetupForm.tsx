import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

interface FormatOption {
  value: '5-a-side' | '8-a-side' | '11-a-side' | 'custom';
  label: string;
  emoji: string;
}

const formatOptions: FormatOption[] = [
  { value: '5-a-side', label: '5-a-side', emoji: '⚡️' },
  { value: '8-a-side', label: '8-a-side', emoji: '🏃' },
  { value: '11-a-side', label: 'Full Game', emoji: '⚽️' },
  { value: 'custom', label: 'Custom', emoji: '🎮' },
];

interface MatchType {
  value: 'league' | 'playoff' | 'cup' | 'preseason' | 'friendly';
  label: string;
}

const matchTypes: MatchType[] = [
  { value: 'league', label: 'League' },
  { value: 'playoff', label: 'Play off' },
  { value: 'cup', label: 'Cup' },
  { value: 'preseason', label: 'Pre season' },
  { value: 'friendly', label: 'Friendly' },
];

export function GameSetupForm({ onClose }: { onClose: () => void }) {
  const [matchType, setMatchType] = useState<MatchType['value']>('friendly');
  const [startDate, setStartDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date(Date.now() - 30 * 60000)); // 30 mins before
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const handleDateTimeConfirm = (date: Date) => {
    if (showDatePicker) {
      setStartDate(date);
    } else if (showTimePicker) {
      setArrivalTime(date);
    }
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
        </Pressable>
        <ThemedText style={styles.title}>Create match</ThemedText>
      </View>

      {/* Match Preview Card */}
      <View style={styles.previewCard}>
        <View style={styles.dateTime}>
          <ThemedText style={styles.date}>{format(startDate, 'dd MMM')}</ThemedText>
          <ThemedText style={styles.time}>{format(startDate, 'HH:mm')}</ThemedText>
        </View>

        <View style={styles.teams}>
          <View style={styles.team}>
            <Image 
              source={require('@/assets/images/Gradient1.png')} 
              style={styles.teamLogo}
            />
            <ThemedText style={styles.teamName}>Sicarios</ThemedText>
          </View>

          <ThemedText style={styles.vs}>VS</ThemedText>

          <View style={styles.team}>
            <Image 
              source={require('@/assets/images/Gradient2.png')} 
              style={styles.teamLogo}
            />
            <ThemedText style={styles.teamName}>Club name</ThemedText>
            <ThemedText style={styles.subText}>Team name</ThemedText>
          </View>
        </View>

        <View style={styles.homeAway}>
          <Pressable 
            style={[styles.homeAwayButton, isHome && styles.homeAwaySelected]}
            onPress={() => setIsHome(true)}
          >
            <ThemedText style={styles.homeAwayText}>Home</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.homeAwayButton, !isHome && styles.homeAwaySelected]}
            onPress={() => setIsHome(false)}
          >
            <ThemedText style={styles.homeAwayText}>Away</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Match Type */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Type of match</ThemedText>
        <Pressable style={styles.typeSelector}>
          <ThemedText style={styles.selectedType}>{matchTypes.find(t => t.value === matchType)?.label}</ThemedText>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Date & Time */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Matchday & time</ThemedText>
        
        <Pressable 
          style={styles.dateTimeInput}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText style={styles.label}>Day & starting time</ThemedText>
          <ThemedText style={styles.value}>
            {format(startDate, "EEEE (MMM dd, yyyy), HH:mm")}
          </ThemedText>
        </Pressable>

        <Pressable 
          style={styles.dateTimeInput}
          onPress={() => setShowTimePicker(true)}
        >
          <ThemedText style={styles.label}>Arrival time</ThemedText>
          <ThemedText style={styles.value}>{format(arrivalTime, "HH:mm")}</ThemedText>
        </Pressable>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Location</ThemedText>
        <View style={styles.locationInput}>
          <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
          <TextInput
            placeholder="Where is the match?"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
        </View>
        <Pressable style={styles.saveLocation}>
          <MaterialCommunityIcons name="content-save" size={20} color="#60A5FA" />
          <ThemedText style={styles.saveLocationText}>Save default location for Sicarios</ThemedText>
        </Pressable>
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <View style={styles.notesHeader}>
          <ThemedText style={styles.sectionTitle}>Notes</ThemedText>
          <ThemedText style={styles.noteCount}>0/50</ThemedText>
        </View>
        <TextInput
          placeholder="(e.g., Meet at the club)"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={styles.notesInput}
        />
      </View>

      <Button onPress={() => {}} style={styles.createButton}>
        Create match
      </Button>

      <Modal
        visible={showDatePicker || showTimePicker}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                {showDatePicker ? 'Select Date & Time' : 'Select Arrival Time'}
              </ThemedText>
              <Pressable onPress={() => {
                setShowDatePicker(false);
                setShowTimePicker(false);
              }}>
                <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Here you can add your custom date/time picker UI */}
            <View style={styles.pickerContainer}>
              {/* Add custom date/time picker implementation */}
              <Button 
                onPress={() => handleDateTimeConfirm(new Date())}
                style={styles.confirmButton}
              >
                Confirm
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  closeButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  previewCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  time: {
    fontSize: 16,
    color: '#10B981',
    backgroundColor: '#064E3B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  vs: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  homeAway: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 4,
  },
  homeAwayButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  homeAwaySelected: {
    backgroundColor: '#374151',
  },
  homeAwayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
  },
  selectedType: {
    fontSize: 16,
  },
  dateTimeInput: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  saveLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  saveLocationText: {
    marginLeft: 8,
    color: '#60A5FA',
    fontSize: 14,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  noteCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  notesInput: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  pickerContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    width: '100%',
    marginTop: 16,
  },
}); 