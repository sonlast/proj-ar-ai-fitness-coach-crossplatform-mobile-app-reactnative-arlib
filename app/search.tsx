import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, Modal, Pressable, StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { faClockRotateLeft, faMagnifyingGlass, faMicrophone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Input } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import LinearGradient_ from '../components/LinearGradient_';
import BackgroundImage from '../components/BackgroundImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const workouts = [
  {
    id: '1',
    title: 'Push Ups',
    workoutDesc: 'Push ups are a great way to work out your chest, shoulders, and triceps.',
  },
  {
    id: '2',
    title: 'Sit Ups',
    workoutDesc: 'Sit ups are a great way to work out your core.',
  },
  {
    id: '3',
    title: 'Planks',
    workoutDesc: 'Planks are a great way to work out your core.',
  },
  {
    id: '4',
    title: 'Squats',
    workoutDesc: 'Squats are a great way to work out your legs.',
  },
  {
    id: '5',
    title: 'Pull Ups',
    workoutDesc: 'Pull ups are a great way to work out your back and biceps.',
  },
  {
    id: '6',
    title: 'Lunges',
    workoutDesc: 'Lunges are a great way to work out your legs.',
  },
  {
    id: '7',
    title: 'Burpees',
    workoutDesc: 'Burpees are a great way to work out your whole body.',
  },
  {
    id: '8',
    title: 'Jumping Jacks',
    workoutDesc: 'Jumping jacks are a great way to work out your whole body.',
  },
  {
    id: '9',
    title: 'Mountain Climbers',
    workoutDesc: 'Mountain climbers are a great way to work out your whole body.',
  },
  {
    id: '10',
    title: 'High Knees',
    workoutDesc: 'High knees are a great way to work out your whole body.',
  },
]

type WorkoutData = {
  id: string;
  title: string;
  workoutDesc: string;
}

type workoutProps = {
  workout: WorkoutData;
  setSelectedWorkout: Dispatch<SetStateAction<WorkoutData | null>>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const Workout = ({ workout, setSelectedWorkout, setModalVisible }: workoutProps) => {
  return (
    <View style={styles.workout}>
      <Pressable
        onPress={() => {
          setSelectedWorkout(workout);
          setModalVisible(true);
        }}
      >
        <View style={styles.horizontalContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.workoutImage}
            />
          </View>
          <View style={styles.workoutTextDescContainer}>
            <Text style={styles.workoutText}>
              {workout.title}
            </Text>
            <Text style={styles.workoutDesc}>
              {workout.workoutDesc}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const search = () => {
  const [searching, setSearching] = useState('');
  const [filterWorkouts, setFilterWorkouts] = useState(workouts);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSTT, setModalSTT] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData | null>(null);
  const { transcription } = useLocalSearchParams();

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem('recentSearches');
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };

    loadRecentSearches();
  }, []);

  const updateSearch = (searching: any) => {
    setSearching(searching);
    setShowRecent(searching === '');
  }

  const addToRecentSearches = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    try {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter(item => item.toLowerCase() !== searchTerm.toLowerCase())
      ].slice(0, 5); // Keep only 5 most recent items

      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  useEffect(() => {
    if (transcription) {
      const cleanTranscription = transcription as string;
      setSearching(cleanTranscription);
      addToRecentSearches(cleanTranscription);
      setShowRecent(false);
    }
  }, [transcription]);

  useEffect(() => {
    if (searching) {
      setFilterWorkouts(
        workouts.filter(workout =>
          workout.title.toLowerCase().includes(searching.toLowerCase())
        )
      );
      setShowRecent(false);
    } else {
      setFilterWorkouts(workouts);
    }
  }, [searching]);

  const handleRecentSearchPress = (searchTerm: string) => {
    setSearching(searchTerm);
    addToRecentSearches(searchTerm);
    setShowRecent(false);
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient_ />
      <BackgroundImage />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          setShowRecent(false);
        }}
      >
        <View style={styles.content}>
          <Text style={styles.appName}> AR FitCoach </Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalSTT}
            onRequestClose={() => setModalSTT(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalSTT(false)}>
              <BlurView
                intensity={50}
                tint="systemThickMaterialDark"
                style={StyleSheet.absoluteFill}
              />
              {/* <View style={styles.modalOverlay} /> */}
            </TouchableWithoutFeedback>

            <View style={styles.modalSTTContainer}>
              {/* <View style={styles.modalContent}> */}
              <View style={styles.modalMic}>
                <FontAwesomeIcon icon={faMicrophone} size={50} color="#fff" />
              </View>
              {/* </View> */}
            </View>
          </Modal>
          <Input
            placeholder='Search workout...'
            placeholderTextColor="#fff"
            value={searching}
            onChangeText={updateSearch}
            onFocus={() => searching === '' && setShowRecent(true)}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onPressIn={(e) => e.stopPropagation()}
            rightIcon={
              searching ? (
                <Pressable
                  onPress={() => {
                    setSearching('');
                    setShowRecent(true);
                  }}
                  style={styles.searchIconContainer}
                  hitSlop={{
                    top: 5,
                    right: 5,
                    bottom: 5,
                    left: 5,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={20}
                    color='#fff'
                  />
                </Pressable>
              ) : (
                <Pressable
                  style={styles.searchIconContainer}
                  onPress={() => {
                    setModalSTT(true);
                  }}
                >
                  <FontAwesomeIcon
                    //TODO: STT Feature in Search Screen
                    icon={faMicrophone}
                    // icon={faMagnifyingGlass}
                    color="#fff"
                    size={20}
                  />
                </Pressable>
              )
            }
            autoFocus={false}
            autoComplete='off'
            cursorColor={'#fff'}
          />
          {showRecent && recentSearches.length > 0 && (
            <View style={styles.recentSearchesContainer}>
              <View style={styles.recentHeader}>
                <FontAwesomeIcon icon={faClockRotateLeft} color="#fff" size={16} />
                <Text style={styles.recentTitle}>Recent Searches</Text>
                <Pressable onPress={clearRecentSearches} style={styles.clearButton}>
                  <Text style={styles.clearText}>CLEAR</Text>
                </Pressable>
              </View>
              {recentSearches.map((searchTerm, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleRecentSearchPress(searchTerm)}
                  style={styles.recentItem}
                >
                  <Text style={styles.recentText}>
                    {searchTerm}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <BlurView
                intensity={50}
                tint="systemChromeMaterialDark"
                style={StyleSheet.absoluteFill}
              />
              {/* <View style={styles.modalOverlay} /> */}
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../assets/images/icon.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedWorkout?.title || 'Workout'}</Text>
                <Text style={styles.modalDescription}>
                  {selectedWorkout?.workoutDesc || 'No description available.'}
                </Text>
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesomeIcon icon={faXmark} size={20} color="#fff" />
                </Pressable>
              </View>
            </View>
          </Modal>
          <FlatList
            data={filterWorkouts}
            renderItem={({ item }) => <Workout workout={item} setSelectedWorkout={setSelectedWorkout} setModalVisible={setModalVisible} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => {
              Keyboard.dismiss();
              setShowRecent(false);
            }}
            ListHeaderComponent={
              searching !== '' ? (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.miscText}>Matched {filterWorkouts.length === 0 ? "no" : filterWorkouts.length === 1 ? "a" : filterWorkouts.length} result{filterWorkouts.length !== 1 ? 's' : ''}</Text>
                </View>
              ) : null
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 3,
  },
  content: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: '7%',
    zIndex: 3,
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontFamily: Fonts.mainFont,
    textAlign: 'center',
  },
  containerStyle: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainer: {
    backgroundColor: '#666',
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  input: {
    color: 'white',
    fontSize: 15,
    fontFamily: Fonts.mainFont,
    marginLeft: 25,
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#000',
    borderRadius: 50,
    height: 45,
    width: 45,
  },
  workout: {
    padding: 12,
    marginVertical: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '#fff',
    shadowColor: '#fff',
    elevation: 15,
  },
  horizontalContent: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#666',
    borderRadius: 50,
  },
  workoutImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  workoutTextDescContainer: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  workoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.mainFont,
  },
  workoutDesc: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.mainFont,
  },
  miscText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.mainFont,
  },
  recentSearchesContainer: {
    position: 'absolute',
    top: 95, // Adjust this value based on your header height
    left: '3%',
    right: '3%',
    backgroundColor: '#666',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    zIndex: 10, // Higher than FlatList
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.mainFont,
    marginLeft: 8,
    flex: 1,
  },
  clearButton: {
    padding: 5,
  },
  clearText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: Fonts.mainFont,
  },
  recentItem: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  recentText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.mainFont,
  },
  //! STYLES FOR TEMP MODAL USING REACT-NATIVE-MODAL 
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSTTContainer: {
    position: 'absolute',
    top: '30%', // Adjust this as needed for positioning
    // Remove bottom, left, right positioning
    width: 250, // Set a fixed width (make this whatever size you want)
    height: 250, // Same as width to make it a perfect circle
    borderRadius: 125, // Half of width/height
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center horizontally
    paddingVertical: 50,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Add background color
    borderWidth: 1,
    borderColor: '#fff',
  },
  modalContent: {
    width: '85%',
    borderRadius: 20,
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    // elevation: 5,
    overflow: 'hidden',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalMic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: Fonts.mainFont,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.mainFont,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 5,
  },
})

export default search;