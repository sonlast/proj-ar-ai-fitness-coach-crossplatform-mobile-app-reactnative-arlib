import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';
import LinearGradient_ from '../components/LinearGradient_';

import { Fonts } from '../constants/Fonts';

const index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [iconColor, setIconColor] = useState("#000");
  const [borderColor, setBorderColor] = useState("#D9D9D9");
  const startRecording = async () => {
    try {
      console.log("Starting recording...");
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission to access microphone was denied');
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      setIconColor("#0f0");
      setBorderColor("#0f0");

      setTimeout(() => {
        setIconColor("#f00");
        setBorderColor("#f00");
      }, 1000);

      console.log("Recording started");
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      console.log("Stopping recording...");
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setRecording(null);
      setIsRecording(false);
      setIconColor("#000");
      setBorderColor("#D9D9D9");
      console.log("Recording stopped");
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission to access microphone was denied');
      }
    }
    requestPermission();
  }, []);

  // console.log(`REVAI API KEY: ${process.env.EXPO_PUBLIC_REVAI_API}`)
  return (
    <View style={styles.container}>
      <LinearGradient_ />
      <View style={styles.container}>
        <Text style={styles.appName}> AR FitCoach </Text>
        <Pressable onPress={isRecording ? stopRecording : startRecording} style={[styles.speakButton, { borderWidth: 3, borderColor: borderColor }]}>
          <FontAwesomeIcon icon={faMicrophone} size={50} style={{ color: iconColor }} />
        </Pressable>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.basicText}>
            {isRecording ? "TAP TO STOP" : "TAP TO SPEAK"}
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