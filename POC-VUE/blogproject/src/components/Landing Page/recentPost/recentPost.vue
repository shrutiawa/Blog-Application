<template>
  <div>
    <!-- Loop through recent posts -->
    <div v-for="(post, idx) in recentPosts" :key="idx" class="recent-post-item">
      <!-- Link to detail page for each recent post -->
      <router-link :to="`/detail-page/${post.postId}`">
        <img :src="post.postImage" alt="3" />
      </router-link>
      <!-- Content for each recent post -->
      <div class="content-rp">
        <h5>{{ post.postName }}</h5>
        <small>{{ post.submissionDay }}</small>
      </div>
    </div>
  </div>
</template>

<script>
// Import RouterLink from Vue Router for routing functionality
import { RouterLink } from 'vue-router';

export default {
  name: 'RecentPostComp', 
  props: {
    recentPosts: Array // recentPosts as an array of objects
  },
  components: {
    RouterLink // Register RouterLink component from Vue Router
  }
};
</script>

<style src="./recentPost.css" scoped>
</style>
