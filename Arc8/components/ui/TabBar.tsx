import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export function TabBar({ tabs, activeTab, onTabPress }: TabProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => onTabPress(tab)}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText
            ]}
          >
            {tab}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#151718',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2F32',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#687076',
  },
}); 