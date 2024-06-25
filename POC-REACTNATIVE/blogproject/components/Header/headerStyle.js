import { StyleSheet} from 'react-native';

const headerStyles = StyleSheet.create({
    mainContainer:{
      display: "flex",
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between",
      backgroundColor:"#fff",
      borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    },
    Icons:{
      flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    gap:10,
    paddingRight: 10,
    },
    logo : {
      height: 50,
      width:50,
  },
  text:{
    backgroundColor:"rgb(205, 36, 36)" ,
    color:"#fff",
    padding:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:3
  }
  });
  export default headerStyles;