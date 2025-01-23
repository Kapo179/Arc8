import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBar } from '@/components/ui/TabBar';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('For You');
  const tabs = ['For You', 'Activity'];

  return (
    <SafeAreaView style={styles.container}>
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'Featured' ? (
          <ThemedText style={styles.text}>For You</ThemedText>
        ) : (
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
});
