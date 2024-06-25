import { StyleSheet } from "react-native";

export default styles3 = StyleSheet.create({
  sponsoredContainer: {
    width: "95%",
    margin: "3%",
    flexDirection: "column",
    marginBottom: 20,
  },
  sContainer: {
    flexDirection: "row",
  },
  icon: {
    marginTop: 10,
  },
  heading: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 5,
  },
  cardImage: {
    marginTop: 10,
    width: "99%",
    height: 300,
    borderRadius: 5,
    resizeMode: "stretch",
    position: "relative",
  },
  imageBtn: {
    position: "absolute",
    left: "5%",
    bottom: "15%",
    display: "flex",
    flexDirection: "row",
    gap:6,
    width: "30%",
    alignItems: "center",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  swiper: {
    height: 353,
  },
  leftArrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    left: 10,
  },
  rightArrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    right: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
});
