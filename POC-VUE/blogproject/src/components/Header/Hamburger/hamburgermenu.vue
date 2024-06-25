<template>
  <!-- Full screen overlay -->
    <div v-if="isOpen" class="overlay">
      <div class="hamburger-info">
        <div class="content">
          <button class="close-button" @click="closeHandler">
            <font-awesome-icon icon="fa-solid fa-xmark" size="2x" style="color: #000000;" />
          </button>
        </div>
        <div class="container1">
          <div class="info">
            <p>The next generation blog, news and magazine theme for you to start sharing your stories today!!</p>
          </div>
          <!-- Content in Hamburger Menu -->
          <div class="info-link">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Our Journal</a></li>
            <li><a href="#">Contact Us</a></li>
          </div>
          <!-- Subscribe Button -->
          <div class="subscribe">
            <p class="para">The Blog</p>
            <h2>Save on Premium Membership</h2>
            <p class="para1">Get the insights report trusted by experts around the globe. Become a Member Today!</p>
            <button class="btn-subscribe">View pricing plans</button>
          </div>
          <p class="para2">New York, USA (HQ)</p>
          <p class="para3">750 Sing Sing Rd, Horeseheads, NY, 14845</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name:"HamburgerMenu",
    props: {
      isOpen: Boolean,
    },
    methods: {
        closeHandler() {
        this.$emit('handleClose')
      }
    },
    components: {
      FontAwesomeIcon
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles */
  @import "../Hamburger/hamburger.css"
  </style>
  