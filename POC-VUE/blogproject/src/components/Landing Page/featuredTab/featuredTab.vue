<template>
  <!-- Container for featured posts -->
  <div v-if="hasFeaturedPosts" class="container">
    <!-- Displaying featured posts -->
    <div v-for="(post, idx) in reversedFeaturedPosts" :key="idx" :class="`content1 image${idx + 1}`" :style="{backgroundImage: `url(${post.postImage})`}">
      <div class="div">
        <!-- Display post category label -->
        <button class="red-label" :style="{ backgroundColor: getCategoryColor(post.postCategory), color: '#fff' }">
          <font-awesome-icon :icon="faCircle" size="2xs" style="margin-right: 0.3em;" />
          {{ post.postCategory }}
        </button>

        <!-- Link to post detail page -->
        <router-link :to="`/detail-page/${post.postId}`">{{ post.postName }}</router-link>

        <!-- Display short description for the first post -->
        <div v-if="idx === 0">{{ post.shortDescription }}</div>

        <!-- Post author and submission details -->
        <div class="profile">
          <img v-if="idx === 0" src="../../../assets/images/user-1.jpg" alt="" />
          <ul>
            <li>by Louis</li>
            <li>{{ post.submissionDay }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';

export default {
  props: {
    featuredTab: Array, // Array of featured posts
    categoryColor: Object // Object containing category colors
  },
  components: {
    FontAwesomeIcon,
    RouterLink
  },
  computed: {
    // Check if there are any featured posts
    hasFeaturedPosts() {
      return Array.isArray(this.featuredTab) && this.featuredTab.some(post => post.isFeatured);
    },
    // Get featured posts in reverse order sorted by submission time
    reversedFeaturedPosts() {
      if (this.hasFeaturedPosts) {
        return this.featuredTab
          .filter(post => post.isFeatured)
          .sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime))
          .reverse();
      }
      return [];
    }
  },
  methods: {
    // Get category color based on category name
    getCategoryColor(category) {
      return this.categoryColor[category] || 'crimson';
    }
  },
  data() {
    return {
      faCircle // Font Awesome icon reference
    };
  },
  mounted() {
    // Retrieve featured posts data from local storage on component mount
    const featuredPostsData = localStorage.getItem('featuredPosts');
    if (featuredPostsData) {
      // Update the 'featuredTab' prop with the retrieved data
      this.$emit('update:featuredTab', JSON.parse(featuredPostsData));
    }
  },
};
</script>

<style src="./featuredTab.css" scoped>
/* Styles for the FeaturedTab component */
</style>
