import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default styles1 = StyleSheet.create({
   h2: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  h6: {
    fontSize: 12,
    fontWeight: '400',
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft:0,
  },

  mainSection: {
    margin: '3%',
    marginBottom: 20, 
    flexDirection: 'column',
    width: '95%',
    alignItems: 'center',
  },

  first: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom:20,
  },
  images: {
    width: '100%',
    flexDirection: 'column',
  },
  image: {
    marginTop: 20,
    width: '99%',
    height: 300,
    borderRadius : 10
  },
  buttonContainer:{
   alignItems:'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(202, 240, 252)',
    borderColor: 'azure',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: '700',
    marginTop: 20,
  
  },
  buttonImage: {
    width: 15, 
    height: 15,
    marginLeft: 5, 
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginTop: 7,
  },
  user: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userText: {
    marginTop: 15,
    marginLeft: 10,
  },
});

