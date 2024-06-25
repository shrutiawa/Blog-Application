import { StyleSheet } from 'react-native';

export default styles5 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 50,
    
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    marginTop:10,
    paddingHorizontal: 20,
    borderRadius: 5,

  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


