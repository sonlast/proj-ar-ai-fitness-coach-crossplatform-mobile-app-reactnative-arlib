import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Input } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import LinearGradient_ from '../components/LinearGradient_';
import BackgroundImage from '../components/BackgroundImage';

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
  const { transcription } = useLocalSearchParams();

  const updateSearch = (searching: any) => {
    setSearching(searching);
  }

  useEffect(() => {
    if (transcription) {
      setSearching(transcription as string);
    }
  }, [transcription]);

  useEffect(() => {
    setFilterWorkouts(
      workouts.filter(workout =>
        workout.title.toLowerCase().includes(searching.toLowerCase())
      )
    );
  }, [searching]);

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
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            rightIcon={
              <Pressable
                onPress={() => console.log('searching...')}
                style={styles.searchIconContainer}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size={22}
                  color='#fff'
                />
              </Pressable>
            }
            autoFocus={true}
            autoComplete='off'
            cursorColor={'#fff'}
          />
          {searching !== '' && (
            <View style={{ marginBottom: 20 }}>
              {
                <Text style={styles.miscText}>Matched {filterWorkouts.length === 0 ? "no" : filterWorkouts.length === 1 ? "a" : filterWorkouts.length} result{filterWorkouts.length !== 1 ? 's' : ''}</Text>
              }
            </View>
          )}
          <FlatList
            data={filterWorkouts}
            renderItem={({ item }) => <Workout title={item.title} workoutDesc={item.workoutDesc} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 10,
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
})

export default search;