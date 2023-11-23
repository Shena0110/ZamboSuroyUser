import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { adminDb} from '../config'; // Import Firestore instance and touristRef
import { useRoute } from '@react-navigation/native';

const Recommend = ({selectedInterests}) => {

  const navigation = useNavigation();
  const [touristSpots, setTouristSpots] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchTouristSpots(selectedInterests); // Pass selectedInterests to fetchTouristSpots
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [selectedInterests]);




  const fetchTouristSpots = async (selectedInterests) => {
    try {
      const touristRef = adminDb.collection('touristSpots');
      let categoryFilter = [];
  
      console.log("Selected Interests:", selectedInterests);
      
      selectedInterests.forEach((interest) => {
        console.log("Current Interest:", interest);
        switch (interest) {
          case 'Hiking':
          case 'Nature':
            categoryFilter.push('Waterfall'); // Add waterfall category for hiking and nature walks
            break;
          case 'Swimming':
          case 'WaterSports':
            categoryFilter.push('Beach'); // Add water activities category for swimming and water sports
            break;
          case 'RoomService':
            categoryFilter.push('Hotel'); // Add hotels category for room service
            break;
          case 'PoolsideLounging':
            categoryFilter.push('Resorts'); // Add resorts category for poolside lounging
            break;
          default:
            break;
        }
      });
  
      console.log("Category Filter:", categoryFilter);
  
      // Filter tourist spots by the mapped categories
      const queryPromises = categoryFilter.map(async (category) => {
        const querySnapshot = await touristRef.where('category', '==', category).get();
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
  
      const resultDocs = await Promise.all(queryPromises);
      const mergedResults = resultDocs.flat(); // Merge arrays of documents into one
  
      console.log("Merged Results:", mergedResults);
  
      setTouristSpots(mergedResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  }; 


  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DestinationScreen', { ...item })}
          style={styles.touchable}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={touristSpots}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 2,
  },
  touchable: {
    borderRadius: 8,
  },
  imageContainer: {
    width: 300,
    height: 200,
    overflow: 'hidden',
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
});

export default Recommend;