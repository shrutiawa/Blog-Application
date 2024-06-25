import { StyleSheet} from 'react-native';

const DetailStyles = StyleSheet.create({
    main:{
      margin:10
    },
    redLabel:{
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
      },
      categoryColor:{
        color:"white",
        paddingLeft:6
      },
      detailContainer:{
        marginTop:10,
        marginBottom:10,
        paddingTop:5
      },
      postName:{
        fontSize: 30, 
      },
      text:{
        fontSize:17,
        lineHeight: 24,
        
      },
      authorDetail:{
        display:"flex",
        
      },
      boldText:{
        fontWeight: 'bold',

      },
      authorprofile:{
        borderRadius:50,
        marginBottom:10
      },
      submitButton : {
        backgroundColor : '#e9ecef',
        padding : 10,
        borderRadius : 5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
      },
      relatedPost: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
      },
      relatedPostContainer: {
        height:150,
        marginBottom:30
      },

      relatedPostTitle: {
        width: 150,
        fontSize: 16,
        fontWeight: 'bold',

      },
      relatedPostContent: {
        fontSize: 14,
      },
      
      relatedPostImage: {
        width: 150,
        height: 100,
       
        borderRadius:5
      },
      prevButton: {
        position: 'absolute',
        top: '20%',
        left: 5,
        padding: 10,
        backgroundColor: 'black',
        opacity:0.5,
        borderRadius: 50,
        zIndex:1
      },
      nextButton: {
        position: 'absolute',
        top: '20%',
        right: 5,
        padding: 10,
        backgroundColor: 'black',
        opacity:0.5,
        borderRadius: 50,
      },
})
export default DetailStyles