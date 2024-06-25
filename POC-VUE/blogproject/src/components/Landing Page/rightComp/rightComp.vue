<template>
    <div class="right">
      <div class="recent-post">
        <h3>Recent post</h3>
        <RecentPostComp :recentPosts="recentPosts" />
      </div>
      <div class="advertisement">
        <AdvertisementComp />
      </div>
    </div>
  </template>
  
  <script>
  import RecentPostComp from '../recentPost/recentPost.vue'; 
  import AdvertisementComp from '../advertisement/advertisement.vue';
  
  export default {
    name: 'RightComp',
    components: {
      RecentPostComp,
      AdvertisementComp
    },
    props: {
      recentPosts: Array 
    }
  };
  </script>
  
  <style src="./rightComp.css" scoped>
</style>
