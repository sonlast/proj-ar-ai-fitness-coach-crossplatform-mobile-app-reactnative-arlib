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
