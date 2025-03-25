import React from 'react'
import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <LottieView
      source={require('../assets/loaders/loader_droplets.json')}
      autoPlay
      loop
      style={styles.loader}
    />
  )
}

const styles = StyleSheet.create({
  loader: {
    width: 140,
    height: 140,
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "center"
  }
})

export default Loading;