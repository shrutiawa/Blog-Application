<template>
    <div class="main-container">
      <header class="header">
        <router-link to="/"><img id="logo" src="../../assets/images/headerlogo.png" alt="" /></router-link>
        <div>
          <button class="red-btn"><b>Subscribe!</b></button>
          <button class="search-landing">
            <font-awesome-icon icon="fa-solid fa-search" size="2xl" style="color: #000000;" />
          </button>
          <button @click="openHamburger" class="hamburger">
            <font-awesome-icon icon="fa-solid fa-bars" size="2xl" style="color: #000000;" />
          </button>
        </div>
      </header>
      <!-- Hamburger Menu -->
      <HamburgerComp :isOpen="isvisible" @handleClose="closeHamburger" />
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import  HamburgerComp  from "../Header/Hamburger/hamburgermenu"
 
  
  export default {
    name:"HeaderComp",
    components: {
      FontAwesomeIcon,
      HamburgerComp
    },
    data() {
      return {
        isvisible: false
      };
    },
    methods: {
      closeHamburger() {
        this.isvisible = false;
      },
      openHamburger() {
        this.isvisible = true;
      },
    }
  };
  </script>
  
  <style scoped>
  @import '../Header/header.css';
  </style>
  