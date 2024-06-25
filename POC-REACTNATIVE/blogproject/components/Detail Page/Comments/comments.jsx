// CommentsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import commentsStyle from './commentsStyle';
import DetailStyles from '../detailPageStyle';
import styles4 from '../../loginForm/loginFormStyle'
import { useFocusEffect } from '@react-navigation/native';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const CommentsScreen =  ({ route }) => {
  // const route = useRoute();
  const { postId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Retrieve comments from AsyncStorage when the component mounts
  useFocusEffect(React.useCallback(() => {
    const retrieveStoredComments = async () => {
      try {
        if (postId) {
          const storedComments = await AsyncStorage.getItem('comments');
          setComments(JSON.parse(storedComments)||[]);
          console.log("comments",comments)
        }
      } catch (error) {
        console.error('Error retrieving comments:', error);
      }
    };
    retrieveStoredComments();
  }, [postId])
  );

// Deleting the comments
  const deleteComment = async (commentId) => {
    try {
      const storedComments = await AsyncStorage.getItem('comments');
      const existingComments = storedComments ? JSON.parse(storedComments) : [];
      const updatedComments = existingComments.filter((comment) => comment.commentId !== commentId);
      setComments(updatedComments);
      await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

// Submit Comment Handle Function
  const handleSubmit = async () => {
    if (name && email && comment) {

      Alert.alert('Comment Submitted!', 'Thanks for your comment!');
      const newComment = {
        postId: postId,
        author: name,
        timestamp: new Date().toDateString(),
        text: comment,
        commentId: Math.floor(Math.random() * 100000000)
      };
    const storedComments = await AsyncStorage.getItem('comments');
    const existingComments = storedComments ? JSON.parse(storedComments) : [];
    const updatedComments = [...existingComments, newComment];
    setComments(updatedComments);
    await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));

    setName('');
    setEmail('');
    setComment('');
    } else {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
    }
  };
  
  return (<>


    <ScrollView style={commentsStyle.commentSection} scrollEnabled={comments.length > 3}>

        {comments.filter((c) => c.postId === postId).map((c, index) => (
          <View key={index} style={commentsStyle.comment}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require("../../../assets/images/user-1.jpg")}
              style={{ borderRadius: 50, height: 50, width: 50 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={commentsStyle.commentAuthor}>{c.author}</Text>
              <Text style={commentsStyle.commentTimestamp}>{c.timestamp}</Text>
              <Text style={commentsStyle.commentText}>{c.text}</Text>
            </View>
            </View>
          <TouchableOpacity style={{ marginBottom: 8,bottom:0}}onPress={() => deleteComment(c.commentId)}
          ><FontAwesomeIcon icon={faTrashCan} color={'black'} size={15} />
          </TouchableOpacity>
          </View>
       
        ))}
      </ScrollView>
   <ScrollView style={commentsStyle.container}>
      <Text style={[DetailStyles.boldText,DetailStyles.text,{color:"black"}]}>Name:<Text style={commentsStyle.required}>*</Text></Text>
      <TextInput style={commentsStyle.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter your name"
      />

      <Text style={[DetailStyles.boldText,DetailStyles.text,{color:"black"}]}>Email:<Text style={commentsStyle.required}>*</Text></Text>
      <TextInput style={commentsStyle.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={[DetailStyles.boldText,DetailStyles.text,{color:"black"}]}>Comment:<Text style={commentsStyle.required}>*</Text></Text>
      <TextInput style={[commentsStyle.input,{height:100}]}
        value={comment}
        onChangeText={text => setComment(text)}
        placeholder="Type your comment"
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity  style={styles4.signInButton} onPress={handleSubmit}>
        <Text style={styles4.signInButtonText}>Post Comment</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </>
  );
};

export default CommentsScreen;
