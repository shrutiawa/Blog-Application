import { StyleSheet } from "react-native";
 
export default commentsStyles = StyleSheet.create({
  container:{
    padding: 10,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  required: {
    color: 'red',
    fontSize:15
  },
  commentSection: {
    margin: 10,
    maxHeight:250
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:0.5,
    borderBottomColor:"grey",
   margin:10
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 8,
  },
});