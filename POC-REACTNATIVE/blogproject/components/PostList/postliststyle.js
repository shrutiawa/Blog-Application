import { StyleSheet } from "react-native";

const PostListStyle = StyleSheet.create({
    sortbutton:{
        color:"black",
        width:80,
        borderWidth:1,
        textAlign:"center",
        padding:3,
        borderColor:"black",
        borderRadius:25,
        fontSize:16,
        
    },
    
    categoryButton:{
        display:"flex",
        flexDirection:"column",
        padding:20,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    icon:{
        backgroundColor:"black",
        borderRadius:30,
        padding:10,
        
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
      },
      cardImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius:10,
        marginLeft:10
      },
      cardContent: {
        flex: 1,
        padding: 10,
      },
      postName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      redLabel:{
        color:"white",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        width:"44%",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:2,
        borderRadius:5,
        fontSize:12,
        marginBottom:5
      },
      submissionDate: {
        fontSize: 14,
        color: '#555',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      },
      button: {
        marginLeft: 10,
        
      },
      searchsortcontainer :{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10,
        paddingVertical:8,
        alignItems:"center"
      },
      search :{
          borderColor: 'black',
          borderWidth: 1,
          paddingLeft: 10,
          width :250,
          borderRadius:5
      },
      searchContainer:{
        display:"flex",
        flexDirection:"row"
      },
      scrollView:{
        //marginBottom:50
      }
      
})
export default PostListStyle;