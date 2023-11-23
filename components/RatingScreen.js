import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { adminDb, firebase } from '../config';
import { AirbnbRating } from 'react-native-ratings';

const RatingScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  const [defaultRating, setDefaultRating] = useState(0);
  const [comment, setComment] = useState('');
  const [touristRef, setTouristRef] = useState(null);

  const handleRating = (rating) => {
    setDefaultRating(rating === defaultRating ? 0 : rating);
  };

  useEffect(() => {
    if (item && item.id) {
      const ref = adminDb.collection('touristSpots').doc(item.id);
      setTouristRef(ref);
    }
  }, [item]);

  const submitRate = () => {
    if (!touristRef) {
      console.error('Tourist reference not set!');
      return;
    }

    const user = firebase.auth().currentUser;

    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }


    const userId = user.uid;
  const userName = user.displayName || user.email || 'Anonymous';  // Get the user's display name

    touristRef
      .update({
        [`users.${userId}`]: { // Create a new nested object for each user
          rating: defaultRating,
          comment: comment,
          name: userName,
          // Other user information if needed
        },
        // You can also add a timestamp or other necessary fields here
      })
      .then(() => {
        console.log('Submitted rating:', defaultRating);
        console.log('Submitted comment:', comment);
        console.log('User:', user);
        console.log('Rating and comment updated for the tourist spot!');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating rating and comment: ', error);
      });
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#D2E9E9" }}>
      
      {item && (
       <View> 
        <Image source={{ uri: item.imageUrl }} style={{height: 200, width:200, borderRadius: 10}}/>
        <Text style={{ fontSize: 18, marginTop: 10, fontWeight:"bold" }}>{item.touristSpotName}</Text>
       </View>
      )}
      <Text style={{ fontSize: 24, marginBottom:16 }}>How was your Experience?</Text>
      <Text> Please Rate and leave a Comment. Thank you! </Text>
      <AirbnbRating
      reviews={["Bad", "Ok", "Good", "Very Good", "Excellent"]}
      count={5}
      defaultRating={3}
      selectedColor='yellow'
      reviewColor='black'
      reviewSize={30}
      size={25}
      onFinishRating={handleRating}
      starImage={require("../assets/star_filled.png")}
      />

      {/* Comment Input */}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginTop: 20,
          paddingHorizontal: 10,
          width: '80%',
          minHeight: 100,
        }}
        placeholder="Add a comment..."
        multiline
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#32AFA9',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        onPress={submitRate}
      >
        <Text style={{ fontSize: 20 }}>Submit Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RatingScreen;
