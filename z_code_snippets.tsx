//! MODAL FROM REACT NATIVE ACTIONS SHEET
// import { SheetManager } from 'react-native-actions-sheet';

// SheetManager.show('modalSheet');

//! /! MODAL FROM REACT NATIVE MODAL BUILT IN
// import ModalRNModal from '@/components/modals/pop-up-modals/ModalRNModal';

// {/* <ModalRNModal visible={modalVisible} onClose={() => setModalVisible(false)} selectedWorkout={selectedWorkout}/> */ }

//TODO: MODAL FROM REACT NATIVE MODAL BUILT IN */}
// const [modalSTT, setModalSTT] = useState(false);

{/* <Modal
  animationType="fade"
  transparent={true}
  visible={modalSTT}
  onRequestClose={() => setModalSTT(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalSTT(false)}>
    <BlurView
      intensity={50}
      tint="systemThickMaterialDark"
      style={StyleSheet.absoluteFill}
    />
    {/* <View style={styles.modalOverlay} /> */}
// </TouchableWithoutFeedback>

// <View style={styles.modalSTTContainer}>
//   {/* <View style={styles.modalContent}> */}
//   <View style={styles.modalMic}>
//     <FontAwesomeIcon icon={faMicrophone} size={50} color="#fff" />
//   </View>
//   {/* </View> */}
// </View>
// </Modal> */}

// modalSTTContainer: {
//   position: 'absolute',
//   top: '30%', // Adjust this as needed for positioning
//   // Remove bottom, left, right positioning
//   width: 250, // Set a fixed width (make this whatever size you want)
//   height: 250, // Same as width to make it a perfect circle
//   borderRadius: 125, // Half of width/height
//   justifyContent: 'center',
//   alignItems: 'center',
//   alignSelf: 'center', // Center horizontally
//   paddingVertical: 50,
//   paddingHorizontal: 25,
//   backgroundColor: 'rgba(0, 0, 0, 0.9)', // Add background color
//   borderWidth: 1,
//   borderColor: '#fff',
// },

//TODO: MODAL USING REACT NATIVE MODAL
{/* <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    <BlurView
      intensity={50}
      tint="systemThickMaterialDark"
      style={StyleSheet.absoluteFill}
    />
    {/* <View style={styles.modalOverlay} /> */}
// </TouchableWithoutFeedback>

// <View style={styles.modalContainer}>
//   <View style={styles.modalContent}>
//     <Image
//       source={require('../assets/images/icon.png')}
//       style={styles.modalImage}
//     />
//     <Text style={styles.modalTitle}>{selectedWorkout?.title || 'Workout'}</Text>
//     <Text style={styles.modalDescription}>
//       {selectedWorkout?.workoutDesc || 'No description available.'}
//     </Text>
//     <Pressable
//       style={styles.modalCloseButton}
//       onPress={() => setModalVisible(false)}
//     >
//       <FontAwesomeIcon icon={faXmark} size={20} color="#fff" />
//     </Pressable>
//   </View>
// </View>
// </Modal> */}

//  //! STYLES FOR TEMP MODAL USING REACT-NATIVE-MODAL 
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(56, 56, 56, 0.7)',
//   },
//   modalContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     borderRadius: 20,
//     padding: 25,
//     borderWidth: 1,
//     borderColor: '#fff',
//     // shadowColor: '#fff',
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.8,
//     // shadowRadius: 10,
//     elevation: 5,
//     overflow: 'hidden',
//   },
//   modalImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     alignSelf: 'center',
//     marginBottom: 15,
//   },
//   modalTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontFamily: Fonts.mainFont,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   modalDescription: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: Fonts.mainFont,
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   modalCloseButton: {
//     position: 'absolute',
//     top: 15,
//     right: 15,
//     backgroundColor: '#333',
//     borderRadius: 20,
//     padding: 5,
//   },
//TODO: ADDING SKELETON EFFECTS
// import Skeleton from '../components/Skeleton';
// import { Skeleton } from '@rneui/base';

// const [isLoading, setIsLoading] = useState(true);

// setIsLoading(true);

// useEffect(() => {
//   // Simulate API call or data processing
//   const timer = setTimeout(() => {
//     setFilterWorkouts(
//       workouts.filter(workout =>
//         workout.title.toLowerCase().includes(searching.toLowerCase())
//       ));
//   }, 1000); // Adjust timing as needed

//   return () => clearTimeout(timer);
// }, [searching]);

// {isLoading ? (
//   <Skeleton count={10}/>
// ) : (


//TODO: FETCHING DATA FROM SUPABASE
// useEffect(() => {
//   const fetchDataFromSupabase = async () => {
//     try {
//       const files = await fetchData("recordings"); // Use your actual bucket name
//       setData(files);
//     } catch (error) {
//       console.error("Error fetching files: ", error);
//     }
//   };

//   fetchDataFromSupabase();
// }, []); // Runs once when component mounts

//TODO: SIGN UP BUTTON
{/* <View style={styles.signUpTextContainer}>
          <Link href="/signup" asChild>
            <Pressable>
              <Text style={styles.signupText}>
                Sign Up
              </Text>
            </Pressable>
          </Link>
        </View> */}

//TODO: SIGN UP TEXT STYLE

// signUpTextContainer: {
//   position: 'absolute',
//   top: 50,
//   left: -34,
//   backgroundColor: "#000",
//   borderWidth: 1,
//   borderColor: '#fff',
//   borderRadius: 10,
//   borderCurve: 'circular',
//   zIndex: 10,
// },
// signupText: {
//   color: '#fff',
//   fontSize: 16,
//   fontFamily: Fonts.mainFont,
//   padding: 8,
// }

//TODO: EXPANDABLE SEARCH BAR

// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';

// const ExpandableSearchBar = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const handleIconPress = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleIconPress}>
//         {/* Render your search icon here */}
//       </TouchableOpacity>
//       {isExpanded && (
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           onFocus={() => setIsExpanded(true)}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // ... Container styling
//   },
//   searchInput: {
//     // ... Expanded search bar styling
//   },
// });

// export default ExpandableSearchBar;
