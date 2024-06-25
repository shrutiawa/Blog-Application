import { Alert, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PostListStyle from "./postliststyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowTrendUp, faArrowUpWideShort, faBusinessTime, faCar, faComputer, faHeartPulse, faMagnifyingGlass, faNewspaper, faPenToSquare, faTrashCan, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Navbar from "../Navbar/navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import SortModal from "./sortModal";
import { useNavigation } from '@react-navigation/native';


export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOption, setSortOption] = useState("Sort");
  const categoryColor = {
    LifeStyle: "#d71b3b",
    Business: "#ff6e40",
    Marketing: "#12a4d9",
    Travel: "#cfb845",
    Technology: "#8a307f",
    Sports: "#05716c"
  };

  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEditPost = (postId) => {
    // Navigate to the create post page and pass the post ID
    navigation.navigate('Create Post', { postIdEdit : postId ,edit: true});
  };
  
  const fetchPostsFromStorage = async () => {
    try {
      const storedPostsData = await AsyncStorage.getItem('posts');
      console.log('Stored Posts Data:', storedPostsData);

      if (storedPostsData !== null) {
        const parsedPostsData = JSON.parse(storedPostsData);
        const allPosts = [
          ...(parsedPostsData.topHighlights || []),
          ...(parsedPostsData.sponsoredNews || []),
          ...(parsedPostsData.recentPosts || []),
        ];
        const uniquePosts = allPosts.reduce((unique, post) => {
          const exists = unique.some((p) => p.postId === post.postId);
          if (!exists) {
            unique.push(post);
          }
          return unique;
        }, []);

        setPosts(uniquePosts);
        setSearchResults(uniquePosts); // Set initial searchResults to all posts
      }
    } catch (error) {
      console.error('Error fetching posts data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchPostsFromStorage();
    setSelectedCategory('All Posts');
    setSortOption('Sort');
  }, []);

  useFocusEffect(React.useCallback(() => {
    // Fetch posts when the screen comes into focus
    fetchPostsFromStorage();
    setSelectedCategory('All Posts');
    setSortOption('Sort');
  }, []));

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Perform search logic here, update searchResults state accordingly
    const filteredResults = posts.filter((post) =>
      post.postName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  
  const handleCategoryClick = (category) => {
    // Update selected category
    setSelectedCategory(category);
    setSortOption('Sort');
    // Filter posts based on the selected category
    const filteredResults =
      category === 'All Posts'
        ? posts // Show all posts
        : posts.filter((post) => post.postCategory === category);

    // Sort the filtered results based on the current sort option
    let sortedPosts = [...filteredResults];

    if (sortOption === "latest") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.submissionDay} ${a.submissionTime}`);
        const dateB = new Date(`${b.submissionDay} ${b.submissionTime}`);
        return dateB - dateA;
      });
    } else if (sortOption === "oldest") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.submissionDay} ${a.submissionTime}`);
        const dateB = new Date(`${b.submissionDay} ${b.submissionTime}`);
        return dateA - dateB;
      });
    } else if (sortOption === "name") {
      sortedPosts.sort((a, b) => a.postName.localeCompare(b.postName));
    }

    setSearchResults(filteredResults);
    setSortedResults(sortedPosts);
  };



  const deletePost = async (postId) => {
    // Show a confirmation prompt before deleting
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Retrieve current posts data from AsyncStorage
              const storedPostsData = await AsyncStorage.getItem('posts');
  
              if (storedPostsData) {
                // Parse the stored data
                const parsedPostsData = JSON.parse(storedPostsData);
  
                // Update posts data by removing the post with the specified postId
                parsedPostsData.topHighlights = parsedPostsData.topHighlights.filter(
                  (post) => post.postId !== postId
                );
                parsedPostsData.sponsoredNews = parsedPostsData.sponsoredNews.filter(
                  (post) => post.postId !== postId
                );
                parsedPostsData.recentPosts = parsedPostsData.recentPosts.filter(
                  (post) => post.postId !== postId
                );
  
                // Save the updated posts data back to AsyncStorage
                await AsyncStorage.setItem(
                  'posts',
                  JSON.stringify(parsedPostsData)
                );
  
                // Always update the selected category to "All Posts"
                setSelectedCategory('All Posts');
  
                // Show all posts
                const allPosts = [
                  ...(parsedPostsData.topHighlights || []),
                  ...(parsedPostsData.sponsoredNews || []),
                  ...(parsedPostsData.recentPosts || []),
                ];
  
                const uniquePosts = allPosts.reduce((unique, post) => {
                  const exists = unique.some((p) => p.postId === post.postId);
                  if (!exists) {
                    unique.push(post);
                  }
                  return unique;
                }, []);
  
                // Update the state with all posts
                setPosts(uniquePosts);
                setSearchResults(uniquePosts);
                setSortedResults(uniquePosts);
              }
            } catch (error) {
              console.error('Error deleting post from AsyncStorage:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    setSortedResults(searchResults);
  }, [searchResults]);
  
  useEffect(() => {
    setSortedResults(sortedResults);
  }, [sortedResults]);

  const handleSortOptionChange = (option) => {
    toggleModal();

    let sortedPosts = [...searchResults];

    if (option === "latest") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.submissionDay} ${a.submissionTime}`);
        const dateB = new Date(`${b.submissionDay} ${b.submissionTime}`);
        return dateB - dateA;
      });
    } else if (option === "oldest") {
      sortedPosts.sort((a, b) => {
        const dateA = new Date(`${a.submissionDay} ${a.submissionTime}`);
        const dateB = new Date(`${b.submissionDay} ${b.submissionTime}`);
        return dateA - dateB;
      });
    } else if (option === "name") {
      sortedPosts.sort((a, b) => a.postName.localeCompare(b.postName));
    }

    setSortedResults(sortedPosts);
    setSortOption(option);
  };

  console.log('Rendered Posts:', searchResults);
    return (<>
      
          <View>
                <ScrollView horizontal style={PostListStyle.category}>
                <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'All Posts' && { backgroundColor: 'gray' }, // Style for selected category
            ]}
            onPress={() => handleCategoryClick('All Posts')}
          >
            <View style={PostListStyle.icon}>
              <FontAwesomeIcon icon={faNewspaper} color={'white'} size={40} />
            </View>
            <Text>All Posts</Text>
          </TouchableOpacity>
                
          <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Technology' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Technology')}
          >
                    <View style={PostListStyle.icon}>
                    <FontAwesomeIcon icon={ faComputer } color={ 'white' } size={ 40 } /></View>
                <Text>Technology</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Marketing' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Marketing')}
          >
           <View style={PostListStyle.icon}>
            <FontAwesomeIcon icon={ faArrowTrendUp } color={ 'white' } size={ 40 } /></View> 
                <Text >Marketing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Lifestyle' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Lifestyle')}
          >
            <View style={PostListStyle.icon}>
                <FontAwesomeIcon icon={ faHeartPulse } color={ 'white' } size={ 40 } /></View> 
                <Text >Lifestyle</Text>
            </TouchableOpacity >
            
            <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Sports' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Sports')}
          >
            <View style={PostListStyle.icon}>
                <FontAwesomeIcon icon={ faVolleyball } color={ 'white' } size={ 40 } /></View> 
                <Text >Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Business' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Business')}
          >
          <View style={PostListStyle.icon}>
            <FontAwesomeIcon icon={ faBusinessTime } color={ 'white' } size={ 40 } /></View> 
                <Text >Business</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
              PostListStyle.categoryButton,
              selectedCategory === 'Travel' && { backgroundColor: 'gray' },
            ]}
            onPress={() => handleCategoryClick('Travel')}
          >
            <View style={PostListStyle.icon}>
                <FontAwesomeIcon icon={ faCar } color={ 'white' } size={ 40 } /></View> 
                <Text >Travel</Text>
            </TouchableOpacity>
             </ScrollView>
            </View>
           <View style={PostListStyle.searchsortcontainer}>
            
            <TextInput placeholder="Search..." style={PostListStyle.search} onChangeText={handleSearch}
          value={searchQuery}></TextInput>
            
            <TouchableWithoutFeedback onPress={toggleModal}>
          <Text style={PostListStyle.sortbutton}>
            {`Sort ${sortOption !== "Sort" ? `- ${sortOption}` : ""}`}{" "} <FontAwesomeIcon
              icon={faArrowUpWideShort}
              color={"black"}
              size={13}
            />{" "}
          </Text>
        </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, marginBottom:40 }}>
          <ScrollView >
  {sortedResults.map((item) => (
    <View key={item.postId} style={PostListStyle.card}>
            <Image source={{ uri: item.postImages }} style={PostListStyle.cardImage} />
            <View style={PostListStyle.cardContent}>
              <Text style={PostListStyle.postName}>{item.postName}</Text>
              <View style={[PostListStyle.redLabel,{ backgroundColor: categoryColor[item.postCategory] || "crimson"}]}><Text style={{color:"white"}}>{item.postCategory}</Text></View>
              <Text style={PostListStyle.submissionDate}>
                 {item.submissionDay} {item.submissionTime}
              </Text>
              <View style={PostListStyle.buttonsContainer}>
              <TouchableWithoutFeedback
                style={PostListStyle.button}
                onPress={() => handleEditPost(item.postId)}
              >
                  <FontAwesomeIcon icon={faPenToSquare} color={'black'} size={22} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={PostListStyle.button}
                  onPress={() => deletePost(item.postId)}
                >
                  <FontAwesomeIcon icon={faTrashCan} color={'black'} size={22} />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        ))}
        
        </ScrollView>
        </View>
        <SortModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        handleSortOptionChange={handleSortOptionChange}
      />

        <Navbar/>
        </>
    )
}