import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';
import { Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import LinearGradient_ from '../components/LinearGradient_';
import BackgroundImage from '../components/BackgroundImage';
import { uploadFile } from '../utils/supabase';

import { Fonts } from '../constants/Fonts';

const index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [iconColor, setIconColor] = useState("#000");
  const [textColor, setTextColor] = useState("#fff");
  const [borderColor, setBorderColor] = useState("#D9D9D9");
  const [transcription, setTranscription] = useState('');
  // const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.55.100:8080');
  
    ws.onopen = () => console.log('WebSocket connection established');
  
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'transcription') {
        if (message.data === "End of Transcript") {
          console.log("Transcript completed.");
        } else if (message.data && !message.data.includes("Partial Transcript")) {
          // Only update the transcription state for the final transcript
          setTranscription(message.data);
        } else {
          // Log partial transcripts for debugging purposes
          console.log('Partial Transcript:', message.data);
        }
      }
      console.log('Received message:', message);
    };
  
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket connection closed');
  
    return () => ws.close();
  }, []); // Ensure it only runs once

  const startRecording = async () => {
    try {
      setTranscription('');
      // console.log("Starting recording...");
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Permission to access microphone was denied');
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          extension: '.m4a',
          outputFormat: 2,
          audioEncoder: 3,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: "aac ",
          audioQuality: 127,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
        // isMeteringEnabled: true,
      });
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      setIconColor("#0f0");
      setTextColor("#0f0");
      setBorderColor("#0f0");

      setTimeout(() => {
        setIconColor("#f00");
        setTextColor("#f00");
        setBorderColor("#f00");
      }, 1000);

      // console.log("Recording started");
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // const uploadAudioForTranscription = async (audioUri: string) => {
  //   const formData = new FormData();
  //   formData.append('audio', {
  //     uri: audioUri,
  //     name: 'audio.m4a',
  //     type: 'audio/m4a',
  //   } as any);

  //   try {
  //     const response = await fetch('http://192.168.55.100:3000/transcribe', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     const data = await response.json();
  //     console.log('Transcription:', data.transcript);
  //     Alert.alert('Transcription Result', data.transcript);
  //   } catch (error) {
  //     console.error('Error uploading audio:', error);
  //     Alert.alert('Error', 'Failed to transcribe audio');
  //   }
  // };

  const stopRecording = async () => {
    try {
      // console.log("Stopping recording...");
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      // console.log("Recording stopped and stored at", uri);

      if (!uri) {
        throw new Error("Recording URI is null");
      }

      //! Read file as binary (Base64)
      const fileData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      //! Convert Base64 to a valid format for Supabase Storage
      const fileBlob = new Uint8Array(
        atob(fileData).split("").map((char) => char.charCodeAt(0))
      );


      const filePath = `recordings/${Date.now()}.m4a`;

      await uploadFile(filePath, fileBlob)

      setRecording(null);
      setIsRecording(false);
      setIconColor("#000");
      setTextColor("#fff");
      setBorderColor("#D9D9D9");

      // const response = await fetch('https://ar-fitcoach.onrender.com/transcribe', {
      const response = await fetch('http://192.168.55.100:3000/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });

      const data = await response.json();
      console.log('Transcription:', data.transcription);
      Alert.alert('Transcription Result', data.transcription);

      // await uploadAudioForTranscription(uri);
      // console.log("Recording stopped");
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
  // console.log(`SUPABASE URL: ${process.env.EXPO_PUBLIC_SUPABASE_URL}`)
  // console.log(`SUPABASE KEY: ${process.env.EXPO_PUBLIC_SUPABASE_KEY}`)
  return (
    <View style={styles.container}>
      <LinearGradient_ />
      <BackgroundImage />
      <View style={styles.container}>
        <Text style={styles.appName}> AR FitCoach </Text>
        <Pressable onPress={isRecording ? stopRecording : startRecording} style={[styles.speakButton, { borderWidth: 3, borderColor: borderColor }]}>
          <FontAwesomeIcon icon={faMicrophone} size={50} style={{ color: iconColor }} />
        </Pressable>
        <View style={{ marginTop: 40 }}>
          <Text style={[styles.miscText, { color: textColor }]}>
            {isRecording ? "TAP TO STOP" : "TAP TO SPEAK"}
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.smallText}>
            OR
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.miscText}>
            Search Manually
          </Text>
        </View>
        <Link href="/search" asChild>
          <Pressable onPress={() => console.log("Search")} style={styles.searchButton}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={{ color: "#fff" }} />
          </Pressable>
        </Link>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.miscText}>
            Transcription: {transcription}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
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
  miscText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Fonts.mainFont
  },
  smallText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.mainFont
  },
})

export default index;

