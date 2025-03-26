import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { faCircle, faClockRotateLeft, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Input } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
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

type workoutProps = {
  title: string;
  workoutDesc: string;
}

const Workout = ({ title, workoutDesc }: workoutProps) => {
  return (
    <View style={styles.workout}>
      <Pressable
        onPress={() => console.log(`Workout ${title} clicked.`)}
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
              {title}
            </Text>
            <Text style={styles.workoutDesc}>
              {workoutDesc}
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
      <View style={styles.content}>
        <Text style={styles.appName}> AR FitCoach </Text>
        <Input
          placeholder='Search workout...'
          placeholderTextColor="#fff"
          value={searching}
          onChangeText={updateSearch}
          onFocus={() => searching === '' && setShowRecent(true)}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
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
              <View
                style={styles.searchIconContainer}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  color="#fff"
                  size={20}
                />
              </View>
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
        <FlatList
          data={filterWorkouts}
          renderItem={({ item }) => <Workout title={item.title} workoutDesc={item.workoutDesc} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            searching !== '' ? (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.miscText}>Matched {filterWorkouts.length === 0 ? "no" : filterWorkouts.length === 1 ? "a" : filterWorkouts.length} result{filterWorkouts.length !== 1 ? 's' : ''}</Text>
              </View>
            ) : null
          }
        />
      </View>
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
    top: 90, // Adjust this value based on your header height
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
})

export default search;