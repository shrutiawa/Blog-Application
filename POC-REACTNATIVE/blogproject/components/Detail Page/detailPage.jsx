import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faCommentDots, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import HTML from 'react-native-render-html';
import { Text } from 'react-native-paper';
import DetailStyles from './detailPageStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from '../Navbar/navbar';
import styles1 from '../Home Page/topHighlights/topHighlightsStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check the logged-in status from AsyncStorage
const fetchIsLoggedIn = async () => {
  try {
    const storedLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');
    return storedLoggedInStatus === 'true';
  } catch (error) {
    console.error('Error reading stored logged-in status:', error);
    return false;
  }
};

export default function Detail() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params;
  const [showPost, setShowPost] = useState({});
  const [showSponsoredNews, setSponsoredNews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categoryColor = {
    LifeStyle: "#d71b3b",
    Business: "#ff6e40",
    Marketing: "#12a4d9",
    Travel: "#cfb845",
    Technology: "#8a307f",
    Sports: "#05716c"
  };
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInStatus = await fetchIsLoggedIn();
        setIsLoggedIn(loggedInStatus);

        const storedData = await AsyncStorage.getItem('posts');
        const parsedData = JSON.parse(storedData) || {};
        const allPosts = [
          ...parsedData.topHighlights,
          ...parsedData.sponsoredNews,
          ...parsedData.recentPosts,
        ];
        const sponsoredNewsArray = parsedData["sponsoredNews"] || [];
        const latest_sponsoredNews = sponsoredNewsArray.reverse();
        const selectedPost = allPosts.find((p) => p.postId == postId) || {};
        setShowPost(selectedPost);
        setSponsoredNews(latest_sponsoredNews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    console.log(showSponsoredNews)
  }, [showSponsoredNews])

  const formattedDate = new Date(showPost.submissionDay).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleCommentButtonPress = (postId) => {
    navigation.navigate('Comments', {postId});

  };
  const [startIndex, setStartIndex] = useState(0);

  const handleNextPosts = () => {
    const newIndex = startIndex + 2;
    setStartIndex(newIndex >= showSponsoredNews.length ? 0 : newIndex);
  };
  const handlePrevPosts = () => {
    const newIndex = Math.max(startIndex - 2, 0);
    setStartIndex(newIndex);
  };


    const handleLinkPress = (postId) => {
        navigation.navigate('Post Detail', { postId });
      };
  const tagsStyles = {
    div: {
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 5, fontSize: 17,
      lineHeight: 24,
    },

  }
  return (<>
    <ScrollView>
      <View style={DetailStyles.main}>
        {/* View post Category */}
        <View style={[DetailStyles.redLabel,{ backgroundColor: categoryColor[showPost.postCategory] || "crimson"}]}>
          <FontAwesomeIcon icon={faCircle} color={'white'} size={13} />
          <Text style={[DetailStyles.categoryColor,]}>{showPost.postCategory}</Text>
        </View>
        {/* View post short description */}
        <View style={DetailStyles.detailContainer}>
          <Text style={[DetailStyles.postName, DetailStyles.boldText]}>{showPost.postName}</Text>
          <Text style={[DetailStyles.text, DetailStyles.detailContainer]}>{showPost.shortDescription}</Text>
        </View>
        {/* View author detail */}
        <View style={[DetailStyles.detailContainer, DetailStyles.authorDetail]}>
          <Image source={require("../../assets/images/profile.jpg")}
            style={DetailStyles.authorprofile} />
          <Text style={[DetailStyles.boldText, { fontSize: 21 }]}>Louis Ferguson</Text>
          <Text style={DetailStyles.text}>An editor at Blog</Text>
          <Text style={[DetailStyles.text, DetailStyles.detailContainer]}>{formattedDate} 5 min read  <FontAwesomeIcon icon={faHeart} color={'black'} size={13} /> 266  <FontAwesomeIcon icon={faEye} color={'black'} size={13} /> 2344 Views
          </Text>
          <Text style={[DetailStyles.text, DetailStyles.detailContainer]}>#agency #business #theme  #marketing</Text>
        </View>
        {/* View Full description */}
        <View>
          {showPost.postBody && (
            <HTML contentWidth={width} tagsStyles={tagsStyles} source={{ html: showPost.postBody }} />
          )}

        </View>
        <View>
        <Image source={{uri : showPost.postImages}}
           style={[styles1.image, { resizeMode: 'stretch' }]}/>
        </View>
        <View>

          <TouchableOpacity style={DetailStyles.submitButton} onPress={()=>handleCommentButtonPress(showPost.postId)}>
            <FontAwesomeIcon icon={faCommentDots} size={20} color="#495057" />
            <Text style={{ color: "#495057", fontSize: 18 }}>Show Comments</Text>
            <FontAwesomeIcon icon={faChevronRight} size={15} color="#495057" />
          </TouchableOpacity>
          
        </View>
      </View>
      {/* Related Post */}
      <View>
        <Text style={DetailStyles.sectionHeader}>Related Posts</Text>
        <View style={DetailStyles.relatedPost}>


          {showSponsoredNews.slice(startIndex, startIndex + 2).map((post, index) => (
            <View key={index} style={DetailStyles.relatedPostContainer}>
              <TouchableWithoutFeedback onPress={() => handleLinkPress(post.postId)}>
              <Image source={{uri : post.postImages}} style={DetailStyles.relatedPostImage} />
              </TouchableWithoutFeedback>
              <Text style={DetailStyles.relatedPostTitle}>{post.postName}</Text>
            </View>
          ))}
          {startIndex > 0 && (
            <TouchableOpacity style={DetailStyles.prevButton} onPress={handlePrevPosts}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} color="#FFFFFF" />
            </TouchableOpacity>)}
          {startIndex + 2 < showSponsoredNews.length && (<TouchableOpacity style={DetailStyles.nextButton} onPress={handleNextPosts}>
            <FontAwesomeIcon icon={faChevronRight} size={20} color="#FFFFFF" />
          </TouchableOpacity>)}
        </View>
      </View>

    </ScrollView>
    {isLoggedIn === true && <Navbar/>}
    
  </>

  );
}
