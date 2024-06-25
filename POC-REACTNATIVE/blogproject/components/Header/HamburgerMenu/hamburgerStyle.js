import { Dimensions, StyleSheet} from 'react-native';
const screenHeight = Dimensions.get('window').height;

const hamBurgerStyles = StyleSheet.create({
    hamburgerInfo: { 
      padding: 20,
      height: screenHeight,
      flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    },
    headText : {
      fontSize : 15,
      color : '#808080'
    },
    content: {
      // Add your content styles
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    icon: {
      color: '#000', 
    },
    linkText : {
      fontSize : 22,
      fontWeight : '500',
      marginTop : 12,
      textDecorationLine : 'underline'
    },
    /* Subscribe */
    subscribeContainer : {
      width : '96%',
      padding : 16,
      backgroundColor : '#dbf1f5',
      display : 'flex',
      alignItems : 'center',
      borderRadius : 5,
      marginVertical : 10,
      paddingVertical : 30
    },
    para : {
      fontSize : 15,
      marginTop : 10,
      color : '#808080'
    },
    para1 : {
      fontSize : 15,
      marginTop : 5,
      color : '#808080',
      textAlign : 'center',
      marginBottom : 10
    },
    heading : {
      fontSize : 32,
      textAlign : 'center',
      paddingVertical : 2
    },
    subscribeButton : {
      backgroundColor : '#ffcd2a',
      padding : 11,
      borderRadius : 4
    },
    buttonText : {
      fontWeight : '300',
    },
    contact : {
      width : '96%',
      marginTop : 10
    },
    contactText : {
      color : '#808080',
      lineHeight : 21
    }
  });
  export default hamBurgerStyles;
  