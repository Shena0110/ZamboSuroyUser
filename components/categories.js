import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { categoriesData, fetchDestinationsData } from './constant';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';



export default function Categories() {
  const navigation = useNavigation();
  const [activeCat, setActiveCat] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [touristSpots, setTouristSpots] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchDestinationsData(setTouristSpots);
  
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);
  
  useEffect(() => {
    if (activeCat === 'All') {
      setFilteredDestinations(touristSpots);
    } else {
      setFilteredDestinations(touristSpots.filter(item => item.category === activeCat));
    }
  }, [activeCat, touristSpots]);

  useEffect(() => {
    console.log('Active Category:', activeCat);
    console.log('Tourist Spots:', touristSpots); // Log the entire tourist spots data
    console.log('Filtered Destinations:', filteredDestinations); // Log the filtered destinations
  }, [activeCat, touristSpots, filteredDestinations]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row' }}>
        {categoriesData.map((cat, index) => {
            let isActive = cat.name === activeCat;
            let activeButtonStyle = isActive ? { backgroundColor: '#32AFA9', shadowColor: 'black',} : {};
            return (
              <TouchableOpacity
                onPress={() => setActiveCat(cat.name)}
                key={index}
                style={[{ padding: 10, paddingHorizontal: 20, borderRadius: 20, margin: 5, alignItems:"center", justifyContent:"center" }, activeButtonStyle]}
              >
                <Image source={cat.image} style={{ width: 40, height: 40, marginBottom: 5 }} />
                <Text>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}>
        <View style={{ minHeight: 3500, marginBottom: 10 }}>
          {filteredDestinations.map((item, index) => {
            return (
              <DestinationCard navigation={navigation} item={item} key={index} />
            );
          })}
          
        </View>
      </ScrollView>
    </View>
  );
}

const DestinationCard = ({ item, navigation }) => {

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DestinationScreen', { ...item })}
      style={{
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        height: '400', 
        borderWidth: 1, 
        borderRadius: 16,
        width: 350
        
      }}
    >
      <View>
      <Image
        style={{ width: 330, height: 200, marginBottom: 10, borderRadius: 30,  }}
        source={{ uri: item.imageUrl }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.touristSpotName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='map-marker-alt' size={20} color={'#32AFA9'} />
          <Text style={{ fontSize:12 }}> {item.destinationLocation} </Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  );
};
