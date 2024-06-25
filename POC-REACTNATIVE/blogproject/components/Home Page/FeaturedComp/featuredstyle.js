import { Dimensions, StyleSheet } from 'react-native';
const { width} = Dimensions.get('window');
const FeaturedStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width:width,
    margin:10,
    // backgroundColor: 'white',
  },
  
  image1:{
    width:width-20,
    borderRadius:20,
    overflow: 'hidden',
    resizeMode:"cover",
    marginTop:10
  },
  content1: {
  width: width,
  padding:20,
  display:"flex",
  flexDirection: 'column',  
  color:"white",
  justifyContent:"space-between"

  },
  redLabel:{
    marginTop:250,


    color:"white",
        display:"flex",
        flexDirection:"row",
        // justifyContent:"flex-start",
        width:"35%",
        alignItems:"center",
        padding:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5,
  },
  heading1:{
    fontSize:24,
    color:"white",
    marginTop:5,
    textDecorationLine:"underline",
    fontWeight:"bold",
  },
  categoryColor:{
    color:"white",
    paddingLeft:6,
  },
  description1:{
    marginTop:5,
    fontSize:14,
    color:"white",
  },
  images:{
    width:width-20,
    borderRadius:20,
    overflow: 'hidden',
    resizeMode:"cover",
    marginTop:10,
    height:200
  },
  features:{
    marginTop:80,
    color:"white",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    width:"30%",
    alignItems:"center",
    padding:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:5,
  }
});

export default FeaturedStyles;
