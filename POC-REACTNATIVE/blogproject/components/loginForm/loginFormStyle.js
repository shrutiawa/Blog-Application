import { StyleSheet } from 'react-native';

export default styles4 = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
    scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
  },
  descriptionText: {
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
  },
  inputField: {
    marginBottom: 10,
    marginTop: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: '#000000',
  },
  Input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
  },
  checkBoxText: {
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:20
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 5, 
  },
  showPasswordButton: {
    padding: 10,
    marginLeft:160,
  },   
  errorMessage:{
    color:'red',
  },
  signInButtonText: {
    color: 'white',
  },
});

