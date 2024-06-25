import { StyleSheet } from "react-native";
 
export default navStyles = StyleSheet.create({
  navContainer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor:"#fff",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,

  },
  button: {
    display: "flex",
    flexDirection: "row",
    color: "#fff",
  },
});