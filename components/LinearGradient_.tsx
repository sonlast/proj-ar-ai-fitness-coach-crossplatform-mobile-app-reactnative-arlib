import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const LinearGradient_ = () => {
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

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 1,
  },
})

export default LinearGradient_;