import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Platform, StatusBar } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {firebase} from '../config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Interest = () => {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    const updatedInterests = [...selectedInterests];
    if (updatedInterests.includes(interest)) {
      const index = updatedInterests.indexOf(interest);
      updatedInterests.splice(index, 1);
    } else {
      updatedInterests.push(interest);
    }
    setSelectedInterests(updatedInterests);
  };

  const saveInterests = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      try {
        await userRef.set({ interest: selectedInterests }, { merge: true });
        await AsyncStorage.setItem('userInterests', JSON.stringify(selectedInterests));
        navigation.navigate('MainNavigation', { screen: 'Home', params: { selectedInterests } });
        console.log('Interests saved and navigated!');
      } catch (error) {
        console.error('Error saving interests:', error);
      }
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, padding: 10}}>
     <View style={{marginBottom: 56}}>
     <View style={{marginBottom: 56}}>
     <Text style={{fontSize: 32, fontWeight:"bold"}}>Choose your Interests</Text>
     <Text style={{fontSize: 18}}>Get better tourist spot recommendations </Text>
     </View>
     </View>
      <View style={{marginBottom: 56}}>
      <View style={{marginBottom: 24, flexDirection: "row", justifyContent: 'space-between'}}>
      <TouchableOpacity
  onPress={() => toggleInterest('Hiking')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('Hiking') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('Hiking') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Hiking</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => toggleInterest('Swimming')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('Swimming') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('Swimming') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Swimming</Text>
  </View>
</TouchableOpacity>
</View>
<View style={{marginBottom: 24, flexDirection: "row", justifyContent: 'space-between'}}>
      <TouchableOpacity
  onPress={() => toggleInterest('Nature')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('Nature') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('Nature') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Nature Walks</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => toggleInterest('RoomService')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('RoomService') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('RoomService') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Room Service</Text>
  </View>
</TouchableOpacity>
</View>
<View style={{marginBottom: 24, flexDirection: "row", justifyContent: 'space-between'}}>
      <TouchableOpacity
  onPress={() => toggleInterest('WaterSports')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('WaterSports') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('WaterSports') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Water Sports</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => toggleInterest('PoolsideLounging')}
  style={{
    borderWidth: 1,
    backgroundColor: selectedInterests.includes('PoolsideLounging') ? 'green' : 'white',
    height: 40,
    width:160,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50,
  }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ position: 'absolute', opacity: 0 }}>
      <Checkbox
        status={selectedInterests.includes('PoolsideLounging') ? 'checked' : 'unchecked'}
        color="transparent"
      />
    </View>
    <Text>Poolside Loungingg</Text>
  </View>
</TouchableOpacity>
</View>
      
      </View>
    <TouchableOpacity style={{
          height: 50,
          width: 340,
          alignItems: 'center',
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "green"}} 
          onPress={saveInterests}
          > 
          <Text style={{fontSize: 18 }}>Next</Text>
          </TouchableOpacity>
    </View>
  );
};

export default Interest;
