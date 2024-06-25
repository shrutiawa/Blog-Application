import { StyleSheet } from 'react-native';

const FooterStyles = StyleSheet.create({
  container : {
    
    backgroundColor : 'rgb(36,35,46)',
    padding : 10
  },
  btn : {
    color : '#fff',
    padding : 10
  },
  logo : {
    height : 50,
    width : 50,
    marginTop:20
  },
  label: {
    fontWeight: 'bold',
    marginTop : 5,
    marginBottom : 2,
    color : "#fff",
    fontSize : 15
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius : 5,
    backgroundColor : '#fff',
    marginTop:20
  },
  text : {
    color : '#fff'
  },
  subbtn : {
    fontWeight : 'bold',
    color : '#fff',
    padding : 8,
    width : 100,
    backgroundColor : '#2196F3',
    textAlign : 'center',
    borderRadius : 4,
    marginTop : 5
  },
  horizontalLine : {
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    marginVertical: 30,
  },
  /* Recent Post */
  recentpost : {
    marginBottom : 10
  },
  recentpostHead : {
    fontSize : 19,
    fontWeight : 'bold',
    marginBottom : 10
  },
  recentpostBtn : {
    color : '#fff',
    paddingTop : 2,
    paddingBottom : 2,
    paddingLeft : 8,
    paddingRight : 8,
    borderWidth : 1,
    width : 100,
    display : 'flex',
    flexDirection : 'row',
    gap : 3,
    alignItems : 'center',
    borderRadius : 4,
  },
  usertext : {
    color : '#fff',
  },
  username : {
    color : '#fff'
  },
  /* Navigation */
  navigation : {
    marginTop : 10,
    display : 'flex',
    flexDirection : 'row',
  },
  naviagationHead : {
    color : '#fff',
    fontSize : 19,
    fontWeight : 'bold',
    marginTop : 30
  },
  nav1 : {
    width : '50%',
    lineHeight : 5
  },
  navigationText : {
    color : '#fff',
    lineHeight : 30
  },
  navigationTextCareerContainer: {
   display:"flex",
   flexDirection:"row",
   gap:5,
   justifyContent:"center",
   width:100,
   alignItems:"center",
  },
  navigationTextCareer: {
    backgroundColor : 'rgb(266,36,36)',
    borderRadius:5,
    padding:1,
  },
  careerText :{
    color:"#fff",
  },
  IconHead : {
    color : '#fff',
    fontSize : 19,
    fontWeight : 'bold',
    marginTop : 30,
    marginBottom : 15
  },
  Icon : {
    display : 'flex',
    flexDirection : 'row',
    gap : 8
  },
  IconContainer : {
    display : 'flex',
    flexDirection : 'column',
    gap : 13
  },
  AppHead : {
    color : '#fff',
    fontSize : 19,
    fontWeight : 'bold',
    marginTop : 35,
    marginBottom : 15
  },
  AppContainer : {
    display : 'flex',
    flexDirection : 'row',
    width : '100%',
    marginTop : 20,
    gap : 5
  },
  AppImage : {
    width : '50%',
    height : 50,
    borderRadius : 7
  },
  TopicsHead : {
    color : '#fff',
    fontSize : 19,
    fontWeight : 'bold',
    marginTop : 35, 
  },
  TopicsContainer : {
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    gap : 8,
    marginVertical : 10
  },
  TopicsText : {
    color : '#fff',
    overflow : 'hidden',
    fontSize : 13
  },
  footer : {
    backgroundColor : '#000',
    padding : 10,
    alignItems : 'center',
    width : '100%',
    
  },
  footerText : {
    color : '#fff',
    fontSize : 12,
    marginBottom:45
  }
  });
export default FooterStyles;