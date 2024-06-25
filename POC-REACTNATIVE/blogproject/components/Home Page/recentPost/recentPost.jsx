import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import './recentPostStyle';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const RecentPost = ({recentPost}) => {
    const navigation = useNavigation();

    const handleLinkPress = (postId) => {
        navigation.navigate('Post Detail', { postId });
      };
    return (
        <View style={styles2.second}>
        <View style={styles2.recentPost}>
            <Text style={styles2.heading}>Recent post</Text>
            {recentPost.map((item,index) => (
            <View style={styles2.recentPostItem} key={index}>
            <TouchableWithoutFeedback onPress={() => handleLinkPress(item.postId)}>
            <Image source={{uri : item.postImages}} style={styles2.recentPostImage}/>
            </TouchableWithoutFeedback>
            <View style={styles2.content}>
                <Text style={styles2.title}>{item.postName}</Text>
                <Text style={styles2.smallText}>{item.submissionDay}</Text>
            </View>
            </View>         
            ))}
           
        </View>
        <View style={styles2.advertisement}>
            <Image source={require('../../../assets/images/advertisement.png')} style={styles2.advertisementImage} />
            <Text style={styles2.small}>ads via Blog</Text>
        </View>
        </View>
    );
};

export default RecentPost;
