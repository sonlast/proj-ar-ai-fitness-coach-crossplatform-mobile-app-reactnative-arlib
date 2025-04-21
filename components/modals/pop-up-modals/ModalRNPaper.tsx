import React from 'react';
import {Image, Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {Fonts} from '@/constants/Fonts';
import {workoutImages} from '@/constants/Workout';
import {WorkoutData} from '@/types/workout';

type ModalRNPaperProps = {
  visible: boolean;
  onDismiss: () => void;
  selectedWorkout?: WorkoutData | null;
}

const ModalRNPaper = ({visible, onDismiss, selectedWorkout}: ModalRNPaperProps) => {
  const workoutImage = selectedWorkout?.title
    ? workoutImages[selectedWorkout.title as keyof typeof workoutImages]
    : require('@/assets/images/icon.png')

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          // backgroundColor: 'transparent',
          justifyContent: 'center',
          alignSelf: 'center',
          margin: 0,
          padding: 0,
          // borderRadius: 10,
          // borderWidth: 1,
          // borderColor: '#ccc',
          width: '100%',
          height: '30%',
        }}
        theme={{
          colors: {
            backdrop: '#rgba(3, 3, 3, 0.6)',
          }
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={workoutImage}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{selectedWorkout?.title || 'Workout'}</Text>
            <Text style={styles.modalDescription}>
              {selectedWorkout?.workoutDesc || 'No description available.'}
            </Text>
            <View style={styles.viewDemoAndTrackButton}>
              <Pressable
                onPress={() => ToastAndroid.show('Demo Pressed', ToastAndroid.SHORT)}
                style={styles.modalDemoAndTrackButton}
              >
                <Text style={styles.textDemoAndTrack}>
                  DEMO
                </Text>
              </Pressable>
              <Pressable
                onPress={() => ToastAndroid.show('Track Pressed', ToastAndroid.SHORT)}
                style={styles.modalDemoAndTrackButton}
              >
                <Text style={styles.textDemoAndTrack}>
                  TRACK
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.modalCloseButton}
              onPress={onDismiss}
            >
              <FontAwesomeIcon icon={faXmark} size={20} color="#fff"/>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 20,
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
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
  viewDemoAndTrackButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginHorizontal: 10
  },
  modalDemoAndTrackButton: {
    backgroundColor: '#fff',
    padding: 25,
    paddingHorizontal: 35,
    borderRadius: 100,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#333',
  },
  textDemoAndTrack: {
    fontFamily: Fonts.mainFont,
    fontSize: 15,
  }
})

export default ModalRNPaper;