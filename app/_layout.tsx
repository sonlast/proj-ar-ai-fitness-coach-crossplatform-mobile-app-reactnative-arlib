// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
//! Imported actionsheet from react-native-actions-sheet
import { SheetProvider } from 'react-native-actions-sheet';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//! Imported modal from @gorhom/bottom-sheet
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
//! Imported modal from react-native-paper
import { PaperProvider } from 'react-native-paper';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import '@/constants/Sheets';

const fontUsed = require('@/assets/fonts/mainFont.ttf');
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [fontsLoaded, fontsError] = useFonts({
    [Fonts.mainFont]: fontUsed,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    // ! (1) Provider for REACT NATIVE BOTTOM SHEET
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* //! Provider for REACT NATIVE PAPER */}
      <PaperProvider>
        {/* //! Provider for REACT NATIVE ACTIONS SHEET */}
        <SheetProvider>
          {/* //! (2) Provider for REACT NATIVE BOTTOM SHEET */}
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: theme.backgroundHeader },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="search" options={{ headerShown: false }} />
              {/* <Stack.Screen name="signup" options={{ headerShown: false }}/> */}
              <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="dark" />
          </BottomSheetModalProvider>
        </SheetProvider>
      </PaperProvider>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
