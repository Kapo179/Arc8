import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TeamSummaryProps {
  homeTeam: string;
  awayTeam: string;
  playersPerSide: string;
  onEdit: () => void;
}

export const TeamSummary = React.memo(({ 
  homeTeam, 
  awayTeam, 
  playersPerSide,
  onEdit 
}: TeamSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.teamsContainer}>
        <View style={styles.teamInfo}>
          <Image
            source={require('@/assets/images/Gradient1.png')}
            style={styles.teamBadge}
            resizeMode="cover"
          />
          <ThemedText style={styles.teamName}>
            {homeTeam || 'Home Team'}
          </ThemedText>
        </View>

        <ThemedText style={styles.vs}>VS</ThemedText>

        <View style={styles.teamInfo}>
          <Image
            source={require('@/assets/images/Gradient2.png')}
            style={styles.teamBadge}
            resizeMode="cover"
          />
          <ThemedText style={styles.teamName}>
            {awayTeam || 'Away Team'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <ThemedText style={styles.playersInfo}>
          {playersPerSide}
        </ThemedText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamInfo: {
    alignItems: 'center',
    flex: 1,
  },
  teamBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  vs: {
    fontSize: 16,
    color: '#ccff33',
    fontWeight: '600',
    marginHorizontal: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  playersInfo: {
    fontSize: 14,
    color: '#808080',
  },
}); 