import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinearGradient_ from '../components/LinearGradient_';
import { Fonts } from '../constants/Fonts';

const index = () => {
  console.log(`REVAI API KEY: ${process.env.EXPO_PUBLIC_REVAI_API}`)
  return (
    <View style={styles.container}>
      <LinearGradient_ />
      <View style={styles.container}>
        <Text style={styles.appName}> AR FitCoach </Text>
        <Pressable onPress={() => console.log("Speak")} style={styles.speakButton}>
          <FontAwesomeIcon icon={faMicrophone} size={50} style={{ color: "#000" }} />
        </Pressable>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.basicText}>
            TAP TO SPEAK
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.smallText}>
            OR
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.basicText}>
            Search Manually
          </Text>
        </View>
        <Pressable onPress={() => console.log("Search")} style={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={{ color: "#fff" }} />
        </Pressable>
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
    fontSize: 60,
    fontFamily: Fonts.mainFont
  },
  speakButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    marginTop: 90,
    marginHorizontal: "auto"
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    margin: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: "#000000",
    marginTop: 40,
    marginHorizontal: "auto"
  },
  basicText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Fonts.mainFont
  },
  smallText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.mainFont
  }
})

export default index;