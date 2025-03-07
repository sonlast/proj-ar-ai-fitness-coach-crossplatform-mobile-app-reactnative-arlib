import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient_ from '../components/LinearGradient_';
import { Fonts } from '../constants/Fonts';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Input } from '@rneui/themed';

const search = () => {
  const [searching, setSearching] = useState('');

  const updateSearch = (searching: any) => {
    setSearching(searching);
  }

  return (
    <View style={styles.container}>
      <LinearGradient_ />
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
      </View>
    </View>
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
    fontSize: 13,
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
  }
})

export default search;