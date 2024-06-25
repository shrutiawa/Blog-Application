import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius : 5
  },
  textarea :{
    textAlignVertical : "top",
    height : 80
  },
  label: {
    fontWeight: 'bold',
    marginTop : 10
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  heading :{
    fontSize : 18,
  },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderTopColor : "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },
  richTextToolbarStyle: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
    borderRadius: 5,
    borderWidth: 1,
  },
  submitButton : {
    backgroundColor : '#3498db',
    padding : 10,
    borderRadius : 5,
    alignItems : 'center',
    marginBottom:15
  },
  chooseImageButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#008631',
    fontStyle : 'italic',
    backgroundColor : '#cefad0',
    padding : 3,
    borderRadius : 5,
    marginTop : 6
  },
  
});

export default styles