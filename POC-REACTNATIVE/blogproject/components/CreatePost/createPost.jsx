import React, { useRef, useState , useEffect} from "react";
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, Text, TextInput, View, Switch, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import styles from "./createPost_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from "../Navbar/navbar";

export default function CreatePost() {
  const navigation = useNavigation();
  const richText = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const route = useRoute();
  const { postIdEdit } = route.params || {};
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [formData, setFormData] = useState({
    postName: "",
    shortDescription: "",
    postBody: "",
    postImages: "",
    postType: "",
    postCategory: "",
    isFeatured: isEnabled,
  });

  useEffect(() => {  
      if (postIdEdit) {
        console.log("EDIT MODE")
        console.log("ID", postIdEdit);

        setIsEditing(true);
        const parsedPostId = parseInt(postIdEdit, 10);
        setPostIdToEdit(parsedPostId);
        console.log("ID of Post to Edit :",parsedPostId) 
        // cannot use postIdToEdit due to asynchronous of useState
        loadEditedData(postIdToEdit)
      } else {
        console.log("Create Mode");
      }
    }, [postIdEdit, postIdToEdit])

  useFocusEffect(
    React.useCallback(() => {
      const fetchStoredData = async () => {
        try {
          // Fetch posts data from AsyncStorage
          const storedPostsData = await AsyncStorage.getItem('posts');
          // await AsyncStorage.removeItem('posts');
          if (storedPostsData) {
            const parsedPostsData = JSON.parse(storedPostsData);
            // console.log("Stored Posts Data:", parsedPostsData);
          }
        } catch (error) {
          console.error('Error fetching posts data from AsyncStorage from CREATE MODE', error);
        }
      };
       // Call the function when the component mounts
       fetchStoredData();
    },[])
  ) 

  const loadEditedData = async(postIdToEdit) => {
    try {
      const storedPostsData = await AsyncStorage.getItem('posts') || '{}';
      console.log(storedPostsData)
      const allPosts = JSON.parse(storedPostsData);
      const allPostsData = [
        ...allPosts.topHighlights,
        ...allPosts.sponsoredNews,
        ...allPosts.recentPosts,
      ];
      // console.log("All posts",allPostsData)

      const postToEdit = allPostsData.find(
        (post) => post.postId === postIdToEdit
      );
      console.log("Edit post data :",postToEdit)
      
      if (postToEdit) {
        setFormData({
          postName: postToEdit.postName || '',
          shortDescription: postToEdit.shortDescription || '',
          postBody: postToEdit.postBody || '',
          postType: postToEdit.postType || '',
          postCategory: postToEdit.postCategory || '',
          isFeatured: postToEdit.isFeatured || false,
        });
  
        setPostImage(postToEdit.postImages || '');
        if (richText && richText.current) {
          richText.current.setContentHTML(postToEdit.postBody || '');
        }
      }

    } catch (error) {
      console.error('Error fetching posts data from AsyncStorage from EDIT MODE', error);
    }
  }

  const handleEditorInput = (descriptionText) => {
    setFormData((prevData) => ({ ...prevData, postBody: descriptionText }));
  };
  
  const handleInput = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAssets = result.assets;
      
      if (selectedAssets.length > 0) {
        const firstSelectedAsset = selectedAssets[0];
        setPostImage(firstSelectedAsset.uri);
      }
    }
  };

  const uploadImageToImgBB = async (imageUri) => {
    // console.log(imageUri)
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const formData = new FormData();
      formData.append('key', '0ecfc997dac2b26891c875140cc346c6');
      formData.append('image', base64Image);
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.data.url;
      console.log('Image uploaded successfully. ImgBB URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to ImgBB:', error);
      return null;
    }
};

  const handleSubmission = async () => {
    if (
      !formData.postName ||
      !formData.shortDescription ||
      !formData.postBody ||
      !postImage ||
      !formData.postType ||
      !formData.postCategory
    ) {
      alert("Please fill all required fields");
      return;
    }
    let uploadedImages;
    console.log(postImage)
    // Check if postImages is an HTTP URL
    if (postImage && (postImage.startsWith('http://') || postImage.startsWith('https://'))) {
      uploadedImages = postImage; 
    } else {
      uploadedImages = await uploadImageToImgBB(postImage);
    }
    const submissionTime = new Date().toTimeString().split(' ')[0];;
    const submissionDay = new Date().toDateString();
    const postId = isEditing ? postIdToEdit : Math.floor(Math.random() * 100000000);

    const submittedData = {
      postName: formData.postName,
      shortDescription: formData.shortDescription,
      postBody: formData.postBody,
      postImages: uploadedImages,
      postType: formData.postType,
      postCategory: formData.postCategory,
      isFeatured: isEnabled,
      postId,
      submissionDay,
      submissionTime
    };

    
    const storedData = await AsyncStorage.getItem('posts');
    const existingData = storedData ? JSON.parse(storedData) : { topHighlights: [], sponsoredNews: [], recentPosts: [] };
    // console.log(updatedPostsArray)
    
    if (isEditing) {
      updateExistingPost(existingData, submittedData);
    } else {
      addNewPost(existingData, submittedData);
    }
  
    setFormData({
      postName: "",
      shortDescription: "",
      postBody: "",
      postType: "",
      postCategory: "",
    });
    setIsEnabled(false)
    setPostImage("")
    if (richText && richText.current) {
      richText.current.setContentHTML("");
    }
  };

  const addNewPost = async (existingData, submittedData) => {
    if (submittedData.postType === "Top Highlights") {
      existingData.topHighlights.push(submittedData);
    } 
    else if (submittedData.postType === "Sponsored News") {
      existingData.sponsoredNews.push(submittedData);
    } 
    else if (submittedData.postType === "Recent Post") {
      existingData.recentPosts.push(submittedData);
    };

    alert("Form Data submitted")
    await AsyncStorage.setItem('posts', JSON.stringify(existingData));
  }

  const updateExistingPost = async (existingData, submittedData) => {
    console.log("Submitted Post ID:", submittedData.postId);
    // Update the existing post in the appropriate category
    const topHighlightsIndex = existingData.topHighlights.findIndex(
      (post) => post.postId === submittedData.postId
    )
    const sponsoredNewsIndex = existingData.sponsoredNews.findIndex(
      (post) => post.postId === submittedData.postId
    )
    const recentPostsIndex = existingData.recentPosts.findIndex(
      (post) => post.postId === submittedData.postId
    )

    // Remove the existing post from its category
    if (topHighlightsIndex !== -1) {
      existingData.topHighlights.splice(topHighlightsIndex, 1)
    } else if (sponsoredNewsIndex !== -1) {
      existingData.sponsoredNews.splice(sponsoredNewsIndex, 1)
    } else if (recentPostsIndex !== -1) {
      existingData.recentPosts.splice(recentPostsIndex, 1)
    } else {
      console.error("Post not found for updating.")
    }
    
    // Add the updated post to the appropriate category
    if (submittedData.postType === "Top Highlights") {
      existingData.topHighlights.push(submittedData)
    } else if (submittedData.postType === "Sponsored News") {
      existingData.sponsoredNews.push(submittedData)
    } else if (submittedData.postType === "Recent Post") {
      existingData.recentPosts.push(submittedData)
    } else {
      console.error("Invalid post type.")
      return
    }

    await AsyncStorage.setItem('posts', JSON.stringify(existingData));

    navigation.navigate('Post List');
  }
  return( <>
   <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <ScrollView>
    <SafeAreaView>
      <View style={{padding:5,marginBottom:45}}>

        <Text style={styles.label}>Post Name</Text>
        <TextInput onChangeText={(text) => handleInput('postName', text)} style={styles.input} placeholder="Post Name" value={formData.postName}/>

        <Text style={styles.label}>Short Description</Text>
        <TextInput 
          multiline={true} 
          style={[styles.input, styles.textarea]} 
          placeholder="Add Description" 
          numberOfLines={3} 
          value={formData.shortDescription}
          onChangeText={(text) => handleInput('shortDescription', text)} />

        <Text style={styles.label}>Post Body</Text>
        <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            placeholder="Write your cool content here :)"
            onChange={(descriptionText) => handleEditorInput(descriptionText)}
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>

        <Text style={styles.label}>Upload Image here</Text>
        <TouchableOpacity style={styles.chooseImageButton} onPress={handleChooseImage}>
          <Text style={{ color: 'white' }}>Choose Image</Text>
        </TouchableOpacity>

        {postImage  && !postImage.startsWith('http') &&  (
          <View>
            <Text style={styles.linkText}>Image Successfully Uploaded to ImgBB.com</Text>
          </View>
        )}
        {postImage  &&  (
          <View>
            <Image
            source={{ uri: postImage}}
            style={{ width: 100, height: 100, borderRadius: 5, marginTop: 10 }}
          />
          </View>
        )}

        {/*  */}
        <Text style={styles.label}>Post Type</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={formData.postType} onValueChange={(postTypeValue) => handleInput('postType', postTypeValue)}>
            <Picker.Item label="--Select Type--" value="" />
            <Picker.Item label="Recent Post" value="Recent Post" />
            <Picker.Item label="Top Highlights" value="Top Highlights" />
            <Picker.Item label="Sponsored News" value="Sponsored News" />
          </Picker>
        </View>

        <Text style={styles.label}>Post Category</Text>
        <View style={styles.inputContainer}>
          <Picker selectedValue={formData.postCategory} onValueChange={(postCategoryValue) => handleInput('postCategory', postCategoryValue)}>
            <Picker.Item label="--Select Category--" value="" />
            <Picker.Item label="Lifestyle" value="Lifestyle" />
            <Picker.Item label="Technology" value="Technology"/>
            <Picker.Item label="Travel" value="Travel"/>
            <Picker.Item label="Business" value="Business"/>
            <Picker.Item label="Sports" value="Sports"/>
            <Picker.Item label="Marketing" value="Marketing"/>
          </Picker>
        </View>

        <View style={{flexDirection : 'row', alignItems : "center"}}>
          <Text style={styles.label}> Make this post featured ?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
          <Text style={{color : 'white', fontSize : 18}}>{isEditing ? 'Update Post' : 'Create Post'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
    <Navbar/>
    </KeyboardAvoidingView>
   </>

  )
}
