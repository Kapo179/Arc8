import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBar } from '@/components/ui/TabBar';
import { FootballFAB } from '@/components/session/FootballFAB';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('For You');
  const router = useRouter();
  const tabs = ['For You', 'Activity'];

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route);
  };

  const renderForYou = () => (
    <View style={styles.forYouContainer}>
      <ThemedText style={styles.welcomeText}>
        Welcome to Arc8! We made your first room for you and invited all the contacts you followed.
      </ThemedText>
      
      <View style={styles.cardsContainer}>
        <Pressable 
          style={styles.card}
          onPress={() => handlePress('/game/create')}
        >
          <View style={styles.iconCircle}>
            <ThemedText style={styles.iconText}>+</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>Create a room</ThemedText>
          <ThemedText style={styles.cardDescription}>
            Build your own community! Invite your friends and let people with similar interests find you.
          </ThemedText>
        </Pressable>

        <Pressable 
          style={styles.card}
          onPress={() => handlePress('/game/join')}
        >
          <View style={styles.iconCircle}>
            <ThemedText style={styles.iconText}>○</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>Discover rooms</ThemedText>
          <ThemedText style={styles.cardDescription}>
            Hop in and join some open rooms, or follow some interesting people to see what they are up to.
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        <FootballFAB />
      </View>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'For You' ? renderForYou() : (
          <ThemedText style={styles.text}>Activity</ThemedText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  header: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  text: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#fff',
  },
  forYouContainer: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#9BA1A6',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
    color: '#000000',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
