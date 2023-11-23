import { View, Text, TouchableOpacity, TextInput, Platform, StatusBar, Image } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../config'; // Import 'auth' from your modified 'config.js' for user authentication
import { firestore } from '../config'; // Import 'firestore' from your modified 'config.js' for accessing Firestore
import { useNavigation } from '@react-navigation/native';


import { Zam } from '../assets';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerUser = async () => {
    try {
      // Use the 'auth' instance for user authentication
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://userside-32ed4.firebaseapp.com"
      });
      // Use the 'firestore' instance to add user data to Firestore
      await firestore.collection('users')
        .doc(auth.currentUser.uid)
        .set({
          username,
          email,
          password
        });
      alert("Verification Code Sent");
      navigation.navigate('Interest');
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <View style={{
        flex:1, 
        backgroundColor:"#D2E9E9",
        alignItems: "center", 
        paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight:0,
        }}>
        <Image
         source={Zam}
         style={{ width: 200, height: 200, borderRadius: 8, objectFit: "cover" }}
         />
      <Text
        style={{fontWeight:'bold', fontSize: 24}}>
        Create an account
      </Text>
      <View style={{ marginTop: 40, alignItems:"center" }}>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 2,
            marginBottom: 12,
            borderRadius: 20,
            textAlign: 'center',
            height: 50, 
            width: 340,
          }}
          placeholder='Username'
          onChangeText={(text) => setUsername(text)}
          autoCorrect={false}
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 2,
            marginBottom: 12,
            borderRadius: 20,
            textAlign: 'center',
            height: 50, 
            width: 340,
          }}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 2,
            marginBottom: 12,
            borderRadius: 20,
            textAlign: 'center',
            height: 50, 
            width: 340,
          }}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={registerUser}
        style={{
            marginTop:10,
            height: 50,
            width:250,
            alignItems:'center',
            justifyContent:"center",
            borderRadius:50, 
            backgroundColor:"green"
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
