<template>
  <div class="sponsered">
    <!-- Container for header and icon -->
    <div class="s-container">
      <img src="../../../assets/images/icon-2.png" alt="icon" />
      <h2>Sponsored news</h2>
    </div>
    <!-- Content section for displaying sponsored news -->
    <div class="rp-content">
      <!-- Loop through sponsored news items -->
      <div v-for="(post, idx) in sponsoredNews" :key="idx" :class="`image-hover s${idx + 1}`">
        <!-- Sponsored news card -->
        <div class="rp-card-img1">
          <!-- Link to detail page for each sponsored news -->
          <router-link :to="`/detail-page/${post.postId}`">
            <img :src="post.postImage" alt="1" />
          </router-link>
          <!-- Category button -->
          <button class="image1-btn" :style="{ backgroundColor: categoryColor[post.postCategory] || 'crimson' }">
            <font-awesome-icon :icon="faCircle" size="2xs" />
            {{ post.postCategory }}
          </button>
        </div>
        <!-- Sponsored news content -->
        <div class="rp-card-content">
          <h3>{{ post.postName }}</h3>
          <!-- Author and submission details -->
          <div class="rp-card-content-about">
            <img src="../../../assets/images/profile-2.jpg" alt="" />
            <p>by Bryan</p>&bull;
            <p>{{ post.submissionDay }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import necessary components and icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';

export default {
  name: 'SponsoredNews', 
  components: {
    FontAwesomeIcon,
    RouterLink
  },
  props: {
    sponsoredNews: Array, // Prop for sponsored news data
    categoryColor: Object // Prop for category colors
  },
  data() {
    return {
      faCircle // Font Awesome icon reference
    };
  },
};
</script>

<style src="./sponsoredNews.css" scoped>
</style>
