import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient_ from '../components/LinearGradient_';
import { Fonts } from '../constants/Fonts';

const search = () => {
  return (
    <View style={styles.container}>
      <LinearGradient_ />
      <View style={styles.container}>
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
    color: 'white',
    fontSize: 22,
    fontFamily: Fonts.mainFont
  }
})

export default search;