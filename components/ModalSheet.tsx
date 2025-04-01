import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { StyleSheet, Text, View } from 'react-native'

const ModalSheet = () => {
  return (
    <ActionSheet>
      <View>
        <Text>Modal Content</Text>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({})

export default ModalSheet;