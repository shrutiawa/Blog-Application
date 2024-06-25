import React, { useState,useRef } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faEnvelope, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import FooterStyles from './footerStyle';

const Footer = ({ categoryColor, footerRecentPost }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const buttonRef = useRef(); 

  useFocusEffect(
    React.useCallback(() => {
      const checkLoggedInStatus = async () => {
        try {
          const status = await fetchIsLoggedIn();
          setIsLoggedIn(status);
          updateButtonDisable(status);
        } catch (error) {
          console.error('Error checking logged-in status:', error);
        }
      };

      checkLoggedInStatus();
    }, [])
  );
  

  // Function to fetch login status from AsyncStorage
  const fetchIsLoggedIn = async () => {
    try {
      const storedLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');
     
      return storedLoggedInStatus === 'true';
    } catch (error) {
      console.error('Error reading stored logged-in status:', error);
      return false;
    }
  };
  

  const handleValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(email.trim() === ''){
      setEmailError('Input Field is empty')
    } else if ( !(emailRegex.test(email)) ){
      setEmailError("Please enter a valid email format, e.g., abc@xyz.com")
    } else {
      setEmailError("Email is Submitted")
    }
  }
  const updateButtonDisable = (status) => {
    if (buttonRef.current) {
      buttonRef.current.setNativeProps({ disabled: status });
    }
  };
    
  return(
    <>
    <ScrollView style={FooterStyles.container}>
      <View>
        <Image source={require('../../assets/images/headerlogo.png')} style={FooterStyles.logo}/>
        <Text  style={FooterStyles.text}>
          The next-genration blog, news, and magazine theme for you to start sharing your stories today!
          This Bootstrap 5 based theme is ideal for all types of sites that deliver the news
        </Text>
        
        <TextInput style={FooterStyles.input} placeholder="Enter your email address" value={email} 
          onChangeText={(text) => {
          setEmail(text);
          setEmailError('')
          }}/>

          {emailError ? (
            <Text style={{ color: emailError.includes('Submitted') ? 'green' : 'red' }}>
              {emailError}
            </Text>
          ) : null}

        <TouchableOpacity>
          <Text style={FooterStyles.subbtn} onPress={handleValidation}>Subscribe</Text>
        </TouchableOpacity>
        <Text style={{color : '#808080', marginTop:10}}>By subscribing you agree to our <Text style={{textDecorationLine : 'underline'}}>Privacy Policy</Text> </Text>

        <View style={FooterStyles.horizontalLine} />

        <Text style={[FooterStyles.recentpostHead, FooterStyles.text]}>Recent Post</Text>
        
        {footerRecentPost.map((post,idx) => (
          <View key={idx} style={FooterStyles.recentpost}>          
          <TouchableOpacity style={[FooterStyles.recentpostBtn, { backgroundColor: categoryColor[post.postCategory] || "crimson"}]}>
            <FontAwesomeIcon icon={faCircle} size={11} color="#fff" />
            <Text style={FooterStyles.text}>{post.postCategory}</Text>
          </TouchableOpacity>
          <Text style={FooterStyles.usertext}>{post.postName}</Text>
          <Text style={FooterStyles.username}>by Dennis &bull; {post.submissionDay}</Text>
          </View>
        ))}
        <Text style={FooterStyles.naviagationHead}>Navigation</Text>
        <View style={FooterStyles.navigation}>
        <View style={FooterStyles.nav1}>
          <Text style={FooterStyles.navigationText}>Features</Text>
          <Text style={FooterStyles.navigationText}>Style Guide</Text>
          <Text style={FooterStyles.navigationText}>Contact Us</Text>
          <Text style={FooterStyles.navigationText}>Get Theme</Text>
          <Text style={FooterStyles.navigationText}>Support</Text>
          <Text style={FooterStyles.navigationText}>Privacy Policy</Text>
          <Text style={FooterStyles.navigationText}>Newsletter</Text>
        </View>
        <View style={FooterStyles.nav1}>
          <Text style={FooterStyles.navigationText}>News</Text>
          <View style={FooterStyles.navigationTextCareerContainer}>
          <Text style={FooterStyles.navigationText}>Career </Text>
          <View style={FooterStyles.navigationTextCareer}>
            <Text style={FooterStyles.careerText}>2 Jobs</Text>
            </View>
          </View>
          <Text style={FooterStyles.navigationText}>Technology</Text>
          <Text style={FooterStyles.navigationText}>Startups</Text>
          <Text style={FooterStyles.navigationText}>Gadgets</Text>
          <Text style={FooterStyles.navigationText}>Inspiration</Text>
          {!isLoggedIn && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Admin Login'); 
            }}
            disabled={isLoggedIn}
          >
            <Text style={{ color: 'white',textDecorationLine: 'underline' }}>Admin Login</Text>
          </TouchableOpacity>
        )}      
        </View>
        </View>

        <Text style={FooterStyles.IconHead}>Get Regular Updates</Text>
        <View style={FooterStyles.IconContainer}>
          <View style={FooterStyles.Icon}>
            <FontAwesomeIcon icon={faWhatsapp} size={20} style={{color: "#ffffff",}} />
            <Text style={FooterStyles.text}>WhatsApp</Text>
          </View>
          <View style={FooterStyles.Icon}>
            <FontAwesomeIcon icon={faYoutube} size={20} style={{color: "#ffffff",}} />
            <Text style={FooterStyles.text}>Youtube</Text>
          </View>
          <View style={FooterStyles.Icon}>
            <FontAwesomeIcon icon={faBell} size={20} style={{color: "#ffffff",}} />
            <Text style={FooterStyles.text}>Website Notifications</Text>
          </View>
          <View style={FooterStyles.Icon}>
            <FontAwesomeIcon icon={faEnvelope} size={20} style={{color: "#ffffff",}} />
            <Text style={FooterStyles.text}>News Letter</Text>
          </View >
          <View style={FooterStyles.Icon}>
            <FontAwesomeIcon icon={faHeadphones} size={20} style={{color: "#ffffff",}} />
            <Text style={FooterStyles.text}>Podcasts</Text>
          </View>
        </View>

        <Text style={FooterStyles.AppHead}>Our Mobile App</Text>
        <Text style={FooterStyles.text}>Download our App and get the latest Breaking News Alerts and latest headlines and daily articles near you.</Text>
        <View style={FooterStyles.AppContainer}>
          <Image style={FooterStyles.AppImage} source={require('../../assets/images/appstore.png')}></Image>
          <Image style={FooterStyles.AppImage}  source={require('../../assets/images/googleplay.png')}></Image>
        </View>

        <Text style={FooterStyles.TopicsHead}>Hot Topics</Text>
        <View style={FooterStyles.TopicsContainer}>
          <Text style={FooterStyles.TopicsText}>Covid-19</Text>
          <Text style={FooterStyles.TopicsText}>Politics</Text>
          <Text style={FooterStyles.TopicsText}>Entertainment</Text>
          <Text style={FooterStyles.TopicsText}>Media</Text>
          <Text style={FooterStyles.TopicsText}>Royalist</Text>
          <Text style={FooterStyles.TopicsText}>World</Text>
          <Text style={FooterStyles.TopicsText}>Half Full</Text>
          <Text style={FooterStyles.TopicsText}>Scouted</Text>
          <Text style={FooterStyles.TopicsText}>Travel</Text>
          <Text style={FooterStyles.TopicsText}>Beast Inside</Text>
          <Text style={FooterStyles.TopicsText}>Crossword</Text>
          <Text style={FooterStyles.TopicsText}>Newsletters</Text>
          <Text style={FooterStyles.TopicsText}>Podcasts</Text>
          <Text style={FooterStyles.TopicsText}>Auction 2042</Text>
          <Text style={FooterStyles.TopicsText}>Protests</Text>
          <Text style={FooterStyles.TopicsText}>NewsCyber</Text>
          <Text style={FooterStyles.TopicsText}>Education</Text>
          <Text style={FooterStyles.TopicsText}>Sports</Text>
          <Text style={FooterStyles.TopicsText}>Football</Text>
          <Text style={FooterStyles.TopicsText}>Messi</Text>
          <Text style={FooterStyles.TopicsText}>Tech And Auto</Text>
          <Text style={FooterStyles.TopicsText}>Opinion</Text>
          <Text style={FooterStyles.TopicsText}>Share Market</Text>
        </View>
        
      </View>
    </ScrollView>
      <View style={FooterStyles.footer}>
          <Text style={FooterStyles.footerText}>&copy;2024 Blogs. All rights Reserved</Text>
      </View>
      </>
  )
}

export default Footer

