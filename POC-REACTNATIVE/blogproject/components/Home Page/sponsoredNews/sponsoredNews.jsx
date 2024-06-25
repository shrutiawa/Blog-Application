import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './sponsoredNewsStyle';
import { useNavigation } from '@react-navigation/native';

const SponsoredNews = ({ sponsoredNews, categoryColor }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  // Function to handle link press and navigate to Post Detail screen
  const handleLinkPress = (postId) => {
    navigation.navigate('Post Detail', { postId });
  };
  
  // Use useEffect to create an interval for automatic scrolling
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (swiperRef.current && sponsoredNews.length > 1) {
        const newIndex = (currentIndex + 1) % sponsoredNews.length;
        setCurrentIndex(newIndex);
        swiperRef.current.scrollBy(1);
      }
    }, 6000);
    
    // Clean up the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [currentIndex, sponsoredNews.length]);

  // Function to handle manual navigation to the next item
  const handleNext = () => {
    if (swiperRef.current && sponsoredNews.length > 1) {
      const newIndex = (currentIndex + 1) % sponsoredNews.length;
      setCurrentIndex(newIndex);
      swiperRef.current.scrollBy(1);
    }
  };
  
  // Function to handle manual navigation to the previous item
  const handlePrev = () => {
    if (swiperRef.current && sponsoredNews.length > 1) {
      const newIndex = currentIndex === 0 ? sponsoredNews.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      swiperRef.current.scrollBy(-1);
    }
  };

  return (
    <View style={styles3.sponsoredContainer}>
      <View style={styles3.sContainer}>
        <Image source={require('../../../assets/images/icon-2.png')} style={styles3.icon} />
        <Text style={styles3.heading}>Sponsored News</Text>
      </View>
      {sponsoredNews.length > 0 && (
        <>
          <Swiper
          ref={swiperRef} // Reference to the Swiper component for manual control
          onIndexChanged={(index) => setCurrentIndex(index)} // Update currentIndex when the index changes
          style={styles3.swiper}
          scrollEnabled={false} // Disable user-initiated scrolling to control it programmatically
        >
            {sponsoredNews.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => handleLinkPress(item.postId)}>
                <View style={styles3.newsCard}>
                  <View style={styles3.cardImageContainer}>
                    <Image source={{ uri: item.postImages }} style={styles3.cardImage} />
                    <View
                      style={[
                        styles3.imageBtn,
                        { backgroundColor: categoryColor[item.postCategory] || 'crimson' },
                      ]}
                    >
                      <FontAwesomeIcon icon={faCircle} size={12} color="#000000" />
                      <Text>{item.postCategory}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles3.cardTitle}>{item.postName}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Swiper>
          {sponsoredNews.length > 1 && (
            <>
              <TouchableOpacity style={styles3.leftArrowButton} onPress={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles3.rightArrowButton} onPress={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default SponsoredNews;
