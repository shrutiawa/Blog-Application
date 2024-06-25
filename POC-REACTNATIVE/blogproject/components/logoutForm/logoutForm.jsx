import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import './logoutFormStyle'

export default function LogoutForm() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove stored credentials and login-related data from AsyncStorage
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('keepLoggedIn');
      await AsyncStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.error('Error clearing stored credentials:', error);
    }
      // Reset navigation to the 'Home' screen
      navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }], 
    });
  };


  return (
    <View style={styles5.container}>
      <Image source={require('../../assets/images/profile-2.jpg')} style={styles5.profilePicture} />
      <Text style={styles5.nameText}>Name: Admin</Text>
      <Text style={styles5.nameText}>Location: Bangalore</Text>

      <TouchableOpacity style={styles5.logoutButton} onPress={handleLogout}>
        <Text style={styles5.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
