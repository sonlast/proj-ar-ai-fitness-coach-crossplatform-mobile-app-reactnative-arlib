import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { useFonts } from 'expo-font';
import LinearGradient_ from '../components/LinearGradient_';
// import * as SplashScreen from 'expo-splash-screen';

const index = () => {
  // const [fontsLoaded, fontsError] = useFonts({
  //   'Snippet-Regular': require('../assets/fonts/Snippet-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (fontsLoaded || fontsError) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontsError]);

  // if (!fontsLoaded && !fontsError) {
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <LinearGradient_ />
      <View>
        <Text style={styles.appName}> AR FitCoach </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontFamily: 'Snippet-Regular'
  }
})

export default index;