import {TouchableOpacity, View } from "react-native";
import styles from "./navbarStyle"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookOpen,   faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import {faSquarePlus,} from "@fortawesome/free-regular-svg-icons";
import navStyles from "./navbarStyle";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
    const navigation = useNavigation();
    
    const navigateToScreen = (screenName) => {
      navigation.navigate(screenName);
    };
  
  return (
    <View style={navStyles.navContainer}>

        <TouchableOpacity onPress={() => navigateToScreen('Home')} style={styles.button}>
        <FontAwesomeIcon  icon={faHome} size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Create Post')} style={styles.button}>
        <FontAwesomeIcon icon={faSquarePlus } size={27} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Post List')} style={styles.button}>
        <FontAwesomeIcon icon={faBookOpen} size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Admin Logout')} style={styles.button}>
        <FontAwesomeIcon icon={faUser} size={22} color="black" />
        </TouchableOpacity>
        </View>

  );
}