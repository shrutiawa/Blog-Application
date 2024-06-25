import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import hamBurgerStyles from "./hamburgerStyle";

const Hamburger = ({ isVisible, onClose }) => {
  const slideAnimation = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isVisible ? 0 : 0,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  }, [isVisible]);

  const handleModalClose = () => {
    Animated.timing(slideAnimation, {
      toValue: -500,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

    return (
      <Modal visible={isVisible} transparent={true}  >
         <Animated.View
      style={[hamBurgerStyles.hamburgerInfo, { right: slideAnimation }]}
    >
          <View style={hamBurgerStyles.content}>
            <TouchableOpacity style={hamBurgerStyles.closeButton} onPress={handleModalClose}>
              <FontAwesomeIcon icon={faTimes} size={25} style={hamBurgerStyles.icon}/>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={hamBurgerStyles.headText}>
              The next generation blog, news and magazine theme for you to start
              sharing your stories today!!
            </Text>

            <View style={hamBurgerStyles.infoLink}>
              <TouchableOpacity onPress={() => console.log("Home pressed")}>
                <Text style={hamBurgerStyles.linkText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("About pressed")}>
                <Text style={hamBurgerStyles.linkText}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("Our Journal pressed")}>
                <Text style={hamBurgerStyles.linkText}>Our Journal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("Contact Us pressed")}>
                <Text style={hamBurgerStyles.linkText}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={hamBurgerStyles.subscribeContainer}>
            <Text style={hamBurgerStyles.para}>The Blog</Text>
            <Text style={hamBurgerStyles.heading}>
              Save on Premium Membership
            </Text>
            <Text style={hamBurgerStyles.para1}>
              Get the insights report trusted by experts around the globe.
              Become a Member Today!
            </Text>
            <TouchableOpacity onPress={() => console.log("View pricing plans pressed")} style={hamBurgerStyles.subscribeButton}>
              <Text style={hamBurgerStyles.buttonText}>View pricing plans</Text>
            </TouchableOpacity>
          </View>
          <View style={hamBurgerStyles.contact}>
            <Text style={{fontWeight : 'bold'}}>New York, USA(HQ)</Text>
            <Text style={hamBurgerStyles.contactText}>750 Ding Ping Road, Horseheads, NY, 1435436</Text>
            <Text style={hamBurgerStyles.contactText}>Call : <Text style={{textDecorationLine : 'underline'}}>743-4577-434</Text>(Toll-Free)</Text>
            <Text style={hamBurgerStyles.contactText}>fcbarcelona@laliga.com</Text>
          </View>
          </Animated.View>
      </Modal>
    );
  }

export default Hamburger;
