import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const Loading = () => {
  return (
    <ActivityIndicator size={50} color="#000000" style={styles.loading} />
  )
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
  },
})

export default Loading;