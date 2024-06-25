<template>
  <div class="main-section">
    <div class="left">
      <div class="icon">
        <div class="icon-container">
          <img class="image" src="../../../assets/images/icon.png" alt="icon" />
          <h2>Today's top highlights</h2>
        </div>
        <h5>Latest breaking news, pictures, videos, and special reports</h5>
      </div>
<!-- Display the post in top highlights section -->
      <div class="images">
        <div v-for="image in displayedImages" :key="image.id">
          <router-link :to="`/detail-page/${image.id}`">
            <img :src="image.src" alt="image" />
          </router-link>
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
          <div class="user">
            <img src="../../../assets/images/user-2.jpg" alt="user" />
            <p>by Louis &bull; {{ image.date }}</p>
          </div>
        </div>
      </div>
      <!-- Load more post button -->
      <div v-if = "shouldShowButton" class="button">
        <button @click="handleShowMore">Load more posts <img src="../../../assets/images/arrow.jpg" alt="arrow" /></button>
      </div>
    </div>

    <RightComp :recentPosts="recentPost" />
  </div>
</template>

<script>
import RightComp from "../rightComp/rightComp.vue";
export default {
  components: {
    RightComp,
  },
  data() {
    return {
      formattedImages: [],
      recentPost: [],
      imagesPerPage : 6,
      startIndex: 0,
    };
  },
  computed: {
    // format image upto imagesPerPage
    displayedImages() {
      const endIndex = this.startIndex + this.imagesPerPage;
      
      return this.formattedImages.slice(0, endIndex);
     
    },
    // display the button when posts are more than imagesPerPage
    shouldShowButton() {
      return this.formattedImages.length > this.startIndex + this.imagesPerPage;
    },
  },
  methods: {
    // click of button next post will display
    handleShowMore() {
      this.startIndex += this.imagesPerPage;
    },
    // Fetch the posts data from the localstorage
    fetchDataFromLocalStorage() {
      const storedPosts =
        JSON.parse(localStorage.getItem("createPost")) || [];
      const latest_topHighlights = storedPosts["topHighlights"] || [];
      const recentPostNewsArray = storedPosts["recentPosts"] || [];
      const latest_recentPosts = recentPostNewsArray.reverse().slice(0, 4);

      this.recentPost = latest_recentPosts;
// store the image in reverse format that the latest post comes on first
      const reversedImages = (latest_topHighlights || []).map((post) => ({
        id: post.postId,
        src: post.postImage,
        alt: post.postName,
        title: post.postName,
        description: post.shortDescription,
        date: post.submissionTime,
      })).reverse();

      this.formattedImages = reversedImages;
    },
  },
  mounted() {
    this.fetchDataFromLocalStorage();
  },
};
</script>

<style src="./topHighlights.css" scoped>
</style>
