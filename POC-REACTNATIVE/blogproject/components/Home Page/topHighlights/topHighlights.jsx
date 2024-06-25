import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles1 from './topHighlightsStyle.js';
import { useNavigation } from '@react-navigation/core';

const TopHighlights = ({ topHighlights }) => {
  const navigation = useNavigation();
  const [visibleHighlights, setVisibleHighlights] = useState(3); 
  const totalHighlights = topHighlights.length;

  // Function to handle link press and navigate to Post Detail screen
  const handleLinkPress = (postId) => {
    console.log(postId);
    navigation.navigate('Post Detail', { postId });

  };

  const handleLoadMore = () => {
    const newVisibleHighlights = Math.min(visibleHighlights + 3, totalHighlights);
    setVisibleHighlights(newVisibleHighlights);
  };

  return (
    <ScrollView contentContainerStyle={styles1.mainSection}>
      <View style={styles1.first}>
        <View style={styles1.icon}>
          <View style={styles1.iconContainer}>
            <Image source={require('../../../assets/images/icon.png')} />
            <Text style={styles1.h2}>Today's top highlights</Text>
          </View>
          <Text style={styles1.h6}>Latest breaking news, pictures, videos, and special reports</Text>
        </View>
        <View style={styles1.images}>
          {topHighlights.slice(0, visibleHighlights).map((item, index) => (
            <View key={index}>

              <TouchableWithoutFeedback onPress={() => handleLinkPress(item.postId)}>
                <Image source={{uri : item.postImages}}  style={[styles1.image, { resizeMode: 'stretch' }]} />

              </TouchableWithoutFeedback>
              <Text>&#9432;Sponsored</Text>
              <Text style={styles1.linkText}>{item.postName}</Text>
              <Text>{item.shortDescription}</Text>
              <View style={styles1.user}>
                <Image style={styles1.userImage} source={require('../../../assets/images/user-1.jpg')} />
                <Text style={styles1.userText}>by Sampreeth &bull; {item.submissionDay}</Text>
              </View>
            </View>
          ))}
        </View>
        {totalHighlights > 3 && visibleHighlights < totalHighlights && (
          <TouchableOpacity style={styles1.buttonContainer} onPress={handleLoadMore}>
            <View style={styles1.button}>
              <Text style={styles1.buttonText}>Load more posts</Text>
              <Image style={styles1.buttonImage} source={require('../../../assets/images/arrow.jpg')} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default TopHighlights;
