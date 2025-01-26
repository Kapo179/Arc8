import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  
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
          backgroundColor: Colors.dark.background,
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
              backgroundColor: Colors.dark.background,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            },
            android: {
              backgroundColor: Colors.dark.background,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
  },
});
