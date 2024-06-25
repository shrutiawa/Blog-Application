

import Detail from './components/Detail Page/detailPage';

import { library } from  '@fortawesome/fontawesome-svg-core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CommentsScreen from './components/Detail Page/Comments/comments';

import { StatusBar, View } from 'react-native';

import Home from './components/Home Page/home';
import {
  faCircle,
  faEllipsis,
  faShapes,
  faBell,
  faHeadphones,faBars,faXmark,faSearch, faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart, faEnvelope,faTrashCan,  } from '@fortawesome/free-regular-svg-icons';
import {
  faFacebook,
  faSquareXTwitter,
  faLinkedin,
  faPinterest,
  faSquareFacebook,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import PostList from './components/PostList/postlist';
import CreatePost from './components/CreatePost/createPost';
import LoginForm from './components/loginForm/loginForm';

import LogoutForm from './components/logoutForm/logoutForm';

import { useEffect, useState } from 'react';


/* add icons to the library */
library.add(faBars,faXmark,faSearch,faCircle,
  faEnvelope,
  faEllipsis,
  faShapes,faEye, faHeart,faFacebook,
  faSquareXTwitter,
  faLinkedin,
  faPinterest,
  faSquareFacebook,faWhatsapp,faYoutube,faBell,faHeadphones,faPenToSquare,faTrashCan)
  const Stack = createStackNavigator();

export default function App() {
  return (

<>
    <NavigationContainer>
       <StatusBar  barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={({ route }) => ({
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 24,
    },
    headerTitleAlign: 'center',
    headerTitle: route.params?.edit ? 'Edit Post' : 'Create Post',
  })} name="Create Post" component={CreatePost} />

        <Stack.Screen options={{ headerStyle: { backgroundColor: 'black', 
    },
    headerTintColor: 'white', 
    headerTitleStyle: {
      fontSize:24
    },
    headerTitleAlign: 'center',
  }}  name="Admin Login" component={LoginForm} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: 'black', 
    },
    headerTintColor: 'white', 
    headerTitleStyle: {
      fontSize:24
    },
    headerTitleAlign: 'center',
  }}  name="Admin Logout" component={LogoutForm} />


        <Stack.Screen options={{ headerStyle: { backgroundColor: 'black', 
    },
    headerTintColor: 'white', 
    headerTitleStyle: {
      fontSize:24
    },
    headerTitleAlign: 'center',
  }} name="Post Detail" component={Detail} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: 'black', 
    },
    headerTintColor: 'white', 
    headerTitleStyle: {
      fontSize:24
    },
    headerTitleAlign: 'center',
  }} name="Comments" component={CommentsScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: 'black', 
    },
    headerTintColor: 'white', 
    headerTitleStyle: {
      fontSize:24
    },
    headerTitleAlign: 'center',
  }}
  name="Post List" component={PostList} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
};



