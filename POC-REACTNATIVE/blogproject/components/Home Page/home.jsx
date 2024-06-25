import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import Header from '../Header/header';
import TopHighlights from './topHighlights/topHighlights';
import RecentPost from './recentPost/recentPost';
import SponsoredNews from './sponsoredNews/sponsoredNews';
import Navbar from '../Navbar/navbar';
import Featured from './FeaturedComp/featured';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer/footer';

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

export default function Home() {
  const [showSponsoredNews, setSponsoredNews] = useState([])
  const [showRecentPost, setRecentPost] = useState([])
  const [showFooterRecentPost, setFooterRecentPost] = useState([])
  const [showTopHighlights, setTopHighlights] = useState([])
  const [showIsFeatured, setIsFeatured] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categoryColor = {
    LifeStyle: '#d71b3b',
    Business: '#ff6e40',
    Marketing: '#12a4d9',
    Travel: '#cfb845',
    Technology: '#8a307f',
    Sports: '#05716c',
  };

  // Create a reference to the isLoggedIn state using useRef
  const isLoggedInRef = useRef(isLoggedIn);
  
  //to keep the isLoggedInRef.current in sync with the latest isLoggedIn state
  useEffect(() => {
    // Update the value of isLoggedInRef.current whenever isLoggedIn changes
    isLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const loggedInStatus = await fetchIsLoggedIn();
        setIsLoggedIn(loggedInStatus);

        try {
            const allposts = await AsyncStorage.getItem('posts');
          if (allposts) {
            const parsedData = JSON.parse(allposts);

            const sponsoredNewsArray = parsedData['sponsoredNews'] || [];
            const latest_sponseredNews = sponsoredNewsArray.reverse().slice(0,4);

            const topHighlightsArray = parsedData['topHighlights'] || [];
            const latest_topHighlights = topHighlightsArray.reverse();

            const recentPostArray = parsedData['recentPosts'] || [];
            const latest_recentPost = recentPostArray.reverse().slice(0, 2);
            const footer_recentPost = recentPostArray.slice(0, 2);

            const IsFeaturedPosts = Object.values(parsedData)
              .flatMap((postsArray) => postsArray)
              .filter((post) => post.isFeatured).slice(0,4);

            const latest_IsFeatured = IsFeaturedPosts.sort((a, b) => {
              const dateA = new Date(a.submissionDay + ' ' + a.submissionTime);
              const dateB = new Date(b.submissionDay + ' ' + b.submissionTime);
            
              // Sort by date in descending order
              const dateComparison = dateB - dateA;
            
              // If dates are the same, sort by postName
              return dateComparison !== 0
                ? dateComparison
                : a.postName.localeCompare(b.postName);
            });
            // console.log("Latest is Featured Posts :", latest_IsFeatured);

            setSponsoredNews(latest_sponseredNews);
            setRecentPost(latest_recentPost);
            setTopHighlights(latest_topHighlights);
            setIsFeatured(IsFeaturedPosts);
            setFooterRecentPost(footer_recentPost);

            
            console.log('isLoggedIn value:', isLoggedInRef.current);
          } else {
            console.log('No posts to be displayed');
          }
        } catch (error) {
          console.error('Error fetching posts data from AsyncStorage:', error);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <>
      <Header />
      <ScrollView style={{ flex: 1}}>
        <Featured Isfeatured={showIsFeatured} categoryColor={categoryColor} />
        <TopHighlights topHighlights={showTopHighlights} />
        <RecentPost recentPost={showRecentPost} />
        <SponsoredNews
          sponsoredNews={showSponsoredNews}
          categoryColor={categoryColor}
        />
        <Footer
          categoryColor={categoryColor}
          footerRecentPost={showFooterRecentPost}
          isLoggedIn={isLoggedIn}
        />
      </ScrollView>

      {isLoggedInRef.current === true && <Navbar />}
    </>
  );
}