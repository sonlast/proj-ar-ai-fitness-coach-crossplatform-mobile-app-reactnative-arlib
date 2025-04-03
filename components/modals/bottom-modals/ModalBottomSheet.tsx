import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Fonts } from '@/constants/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

type ModalBottomSheetProps = {
  // title: string;
  // onPress: () => void;
  // children: React.ReactNode;
  onClose?: () => void;
};

const ModalBottomSheet = forwardRef<BottomSheetModal, ModalBottomSheetProps>((props, ref) => {
  const snapPoints = useMemo(() => ['25%'], []);
  const scaleAnim = new Animated.Value(1);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      ])
    ).start();
  }

  useEffect(() => {
    pulse();
    return () => scaleAnim.stopAnimation();
  }, [])

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      backgroundStyle={{ backgroundColor: '#333' }}
      handleIndicatorStyle={{ backgroundColor: 'transparent' }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          backgroundColor: '#333',
          height: 270,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={styles.titleText}
        >
          Speak To Search
        </Text>
        <View
          style={{
            padding: 40,
          }}
        >
          <Pressable>
            <Animated.View
              style={[styles.micButton, { transform: [{ scale: scaleAnim}]}]}
            >
                <FontAwesomeIcon icon={faMicrophone} size={50} style={styles.micIcon} />
            </Animated.View>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
});

const styles = StyleSheet.create({
  // !! STYLES FOR REACT NATIVE BOTTOM 
  titleText: {
    fontFamily: Fonts.mainFont,
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff',
  },
  micButton: {
    backgroundColor: '#666',
    borderRadius: 60,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    color: '#fff',
  },
})

export default ModalBottomSheet;