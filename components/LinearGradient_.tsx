import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default class LinearGradient_ extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#666666", "#000000"]}
        style={
          styles.linearGradient
        }
        start={[0.5, 0.5]}
      >
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
})