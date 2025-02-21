import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fonts } from '@/src/config/fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import { useUIStore } from '@/stores/uiStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Italic': require('../assets/fonts/DMSans-Italic.ttf'),
    'FunnelSans-Regular': require('../assets/fonts/FunnelSans-Regular.ttf'),
    'FunnelSans-Medium': require('../assets/fonts/FunnelSans-Medium.ttf'),
    'FunnelSans-Bold': require('../assets/fonts/FunnelSans-Bold.ttf'),
    'FunnelSans-BoldItalic': require('../assets/fonts/FunnelSans-BoldItalic.ttf'),
    // ... other fonts
  });
  const isModalOpen = useUIStore(state => state.isModalOpen);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#151718',
            },
            tabBarStyle: {
              display: isModalOpen ? 'none' : 'flex',
            },
          }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar 
          style="light"
          backgroundColor="#151718"
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
