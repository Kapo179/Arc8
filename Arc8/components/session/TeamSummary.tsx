import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { Skeleton } from '@/components/ui/Skeleton';
import Animated, { FadeIn } from 'react-native-reanimated';

interface TeamSummaryProps {
  homeTeam: string;
  awayTeam: string;
  playersPerSide: string;
  onEdit: () => void;
  loading?: boolean;
}

export const TeamSummary = React.memo(({ 
  homeTeam, 
  awayTeam, 
  playersPerSide,
  onEdit,
  loading = false
}: TeamSummaryProps) => {
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.teamsContainer}>
          <View style={styles.teamInfo}>
            <Skeleton width={48} height={48} borderRadius={24} />
            <View style={styles.skeletonText}>
              <Skeleton width={80} height={20} />
            </View>
          </View>

          <ThemedText style={styles.vs}>VS</ThemedText>

          <View style={styles.teamInfo}>
            <Skeleton width={48} height={48} borderRadius={24} />
            <View style={styles.skeletonText}>
              <Skeleton width={80} height={20} />
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Skeleton width={60} height={16} />
        </View>
      </View>
    );
  }

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(300)}
    >
      <View style={styles.teamsContainer}>
        <View style={styles.teamInfo}>
          <Image
            source={require('@/assets/images/Gradient1.png')}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
            style={styles.teamBadge}
          />
          <ThemedText style={styles.teamName}>
            {homeTeam || 'Home Team'}
          </ThemedText>
        </View>

        <ThemedText style={styles.vs}>VS</ThemedText>

        <View style={styles.teamInfo}>
          <Image
            source={require('@/assets/images/Gradient2.png')}
            placeholder={blurhash}
            contentFit="cover"
            transition={200}
            style={styles.teamBadge}
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
    </Animated.View>
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
  skeletonText: {
    marginTop: 8,
  },
}); 