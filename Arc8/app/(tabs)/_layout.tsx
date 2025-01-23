import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#687076',
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#151718',
        },
        headerTitleStyle: {
          fontFamily: 'DMSans-Medium',
          color: '#ffffff',
        },
        tabBarStyle: [
          styles.tabBar,
          {
            height: Platform.select({
              ios: 50 + insets.bottom,
              android: 60,
            }),
            paddingBottom: Platform.select({
              ios: insets.bottom,
              android: 8,
            }),
          },
          Platform.select({
            ios: {
              backgroundColor: '#151718',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            },
            android: {
              backgroundColor: '#151718',
              elevation: 8,
            },
          }),
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="house"
              color={color}
              filled={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={26} 
              name="bell"
              color={color}
              filled={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="trophy"
              color={color}
              filled={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="shirt"
              color={color}
              filled={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="person"
              color={color}
              filled={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#151718',
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarIOS: {
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabBarAndroid: {
    elevation: 8,
    backgroundColor: '#151718',
  },
});
