import { createApp } from 'vue'
import App from '../src/App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './routes'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
    faCircle,
    faEllipsis,
    faShapes,
    faBell,
    faHeadphones,faBars,faXmark,faSearch, faPenToSquare
  } from '@fortawesome/free-solid-svg-icons';
  import { faEye, faHeart, faEnvelope,faTrashCan } from '@fortawesome/free-regular-svg-icons';
  import {
    faFacebook,
    faSquareXTwitter,
    faLinkedin,
    faPinterest,
    faSquareFacebook,
    faWhatsapp,
    faYoutube,
  } from '@fortawesome/free-brands-svg-icons';


/* add icons to the library */
library.add(faBars,faXmark,faSearch,faCircle,
    faEnvelope,
    faEllipsis,
    faShapes,faEye, faHeart,faFacebook,
    faSquareXTwitter,
    faLinkedin,
    faPinterest,
    faSquareFacebook,faWhatsapp,faYoutube,faBell,faHeadphones,faPenToSquare,faTrashCan)

    // const isAppRerun = sessionStorage.getItem('isAppRerun');

    // if (!isAppRerun) {
    //   localStorage.removeItem('adminCredentials');
    //   localStorage.setItem('isAdminLoggedIn',false);
    //   sessionStorage.setItem('isAppRerun', true);
    // }
    const adminCredentials = localStorage.getItem('adminCredentials');
    const isAppRerun = sessionStorage.getItem('isAppRerun');
    if (!isAppRerun) {
    if(!adminCredentials){
      localStorage.setItem('isAdminLoggedIn',false);
      
    }
    sessionStorage.setItem('isAppRerun', true);
  }
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')