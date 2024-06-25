import React, { useState } from 'react';
import { View, Image, Button, TouchableOpacity, Text  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import headerStyles from './headerStyle';
import Hamburger from './HamburgerMenu/hamburger';



// Initialize the library with the required icons
library.add(faSearch, faBars);

export default function Header() {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  const openHamburger = () => {
    setHamburgerOpen(true);
  };

  const closeHamburger = () => {
    setHamburgerOpen(false);
  };
  return (
    <View style={headerStyles.mainContainer}>
      <Image
        source={require('../../assets/images/headerlogo.png')}
        style={headerStyles.logo}
      />

      <View style={headerStyles.Icons}>
        <TouchableOpacity >
          <Text style={headerStyles.text}>SUBSCRIBE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Search Button pressed')}>
          <FontAwesomeIcon icon="search" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openHamburger}>
          <FontAwesomeIcon icon="bars" size={20} color="black" />
        </TouchableOpacity>

      </View>
      {isHamburgerOpen && (
        <Hamburger isVisible={isHamburgerOpen} onClose={closeHamburger} />
      )}
    </View>
  );
}
