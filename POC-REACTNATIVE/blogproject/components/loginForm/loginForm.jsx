import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './loginFormStyle';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  // Use useFocusEffect to handle logic when the component comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Check if the user has logged in using AsyncStorage
      const checkLoggedInStatus = async () => {
        try {
          // Retrieve stored logged-in status from AsyncStorage
          const storedLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');

          // If the stored status is 'true', update the isLoggedIn state
          setIsLoggedIn(storedLoggedInStatus === 'true');
        } catch (error) {
          console.error('Error reading stored logged-in status:', error);
        }
      };

      // Run when the component comes into focus
      checkLoggedInStatus();
    }, [])
  );

  // Function to handle the sign-in process
  const handleSignIn = async () => {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123#';

    // Regular expression for email format
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrorMessage('Email is required.');
    } else if (!emailFormatRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    } else if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    // Check if provided credentials match admin credentials
    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);

      // Store credentials in AsyncStorage if 'Keep me logged in' is checked
      if (keepLoggedIn) {
        try {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('keepLoggedIn', 'true');
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } catch (error) {
          console.error('Error storing credentials:', error);
        }
      }

      console.log('Sign-in successful!');
      navigation.navigate('Post List');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
      console.log('Invalid credentials. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles4.scrollViewContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles4.container}>
        <Image source={require('../../assets/images/hi.png')} style={styles4.logo} />
        <Text style={styles4.welcomeText}>Welcome back!</Text>
        <Text style={styles4.descriptionText}>Let's write something great</Text>
        {errorMessage ? <Text style={styles4.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles4.inputContainer}>
          <View style={styles4.inputField}>
            <Text style={styles4.labelText}>Email Address:</Text>
            <TextInput
              style={[styles4.Input, { borderColor: emailFocused ? 'black' : 'gray' }]}
              placeholder="Your email address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>
          <View style={styles4.inputField}>
            <Text style={styles4.labelText}>Password:</Text>
            <View style={styles4.passwordInputContainer}>
              <TextInput
                style={{ borderColor: passwordFocused ? 'black' : 'gray' }}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                style={styles4.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  type="font-awesome-5"
                  size={18}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          </View>

          <CheckBox
            title="Keep me logged in"
            checked={keepLoggedIn}
            onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            containerStyle={styles4.checkBoxContainer}
            textStyle={styles4.checkBoxText}
            checkedColor="black"
          />
          <TouchableOpacity style={styles4.signInButton} onPress={handleSignIn}>
            <Text style={styles4.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
