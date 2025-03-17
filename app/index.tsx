import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';
import { Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import LinearGradient_ from '../components/LinearGradient_';
import BackgroundImage from '../components/BackgroundImage';
import { supabase } from '../utils/supabase';

import { Fonts } from '../constants/Fonts';

const index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [iconColor, setIconColor] = useState("#000");
  const [textColor, setTextColor] = useState("#fff");
  const [borderColor, setBorderColor] = useState("#D9D9D9");
  // const [data, setData] = useState<any[]>([]);

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
      // console.log("Recording stopped and stored at", uri);

      if (!uri) {
        throw new Error("Recording URI is null");
      }

      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log(`File info: ${JSON.stringify(fileInfo)}`);

      const base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      // const fileContent = await FileSystem.readAsStringAsync(uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      // const response  = await fetch(uri);
      // const fileBlob = await response.blob();      

      const filePath = `recordings/${Date.now()}.m4a`;

      const { data, error } = await supabase.storage
        .from('ar-fitcoach')
        .upload(filePath, base64Data, {
          contentType: "audio/m4a",
          upsert: true,
        });

      if (error) throw error;

      console.log("Uploaded audio file:", data);

      setRecording(null);
      setIsRecording(false);
      setIconColor("#000");
      setTextColor("#fff");
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

  // useEffect(() => {
  //   const fetchDataFromSupabase = async () => {
  //     try {
  //       const files = await fetchData("recordings"); // Use your actual bucket name
  //       setData(files);
  //     } catch (error) {
  //       console.error("Error fetching files: ", error);
  //     }
  //   };

  //   fetchDataFromSupabase();
  // }, []); // Runs once when component mounts

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
  }
})

export default index;

// import React, { useState } from 'react';

// import { View, TextInput, StyleSheet } from 'react-native';



// const ExpandableSearchBar = () => {

//   const [isExpanded, setIsExpanded] = useState(false);



//   const handleIconPress = () => {

//     setIsExpanded(!isExpanded);

//   };



//   return (

//     <View style={styles.container}>

//       <TouchableOpacity onPress={handleIconPress}>

//         {/* Render your search icon here */}

//       </TouchableOpacity>

//       {isExpanded && (

//         <TextInput

//           style={styles.searchInput}

//           placeholder="Search..."

//           onFocus={() => setIsExpanded(true)}

//         />

//       )}

//     </View>

//   );

// };



// const styles = StyleSheet.create({

//   container: {

//     // ... Container styling

//   },

//   searchInput: {

//     // ... Expanded search bar styling

//   },

// });



// export default ExpandableSearchBar;
