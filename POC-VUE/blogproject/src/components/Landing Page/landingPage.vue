<template>
  <HeaderComp></HeaderComp>
  <div>
    <FeaturedTab :featuredTab="showIsFeatured" :categoryColor="categoryColor" />    
    <LeftComp />  
    <SponsoredNews :sponsoredNews="showSponsoredNews" :categoryColor="categoryColor" />
  </div>
  <FooterComp></FooterComp>
</template>

<script>
import SponsoredNews from '../Landing Page/sponsoredNews/sponsoredNews.vue';
import LeftComp from '../Landing Page/topHighlights/topHighlights.vue'
import FeaturedTab from '../Landing Page/featuredTab/featuredTab.vue';
import HeaderComp from "../Header/header.vue"
import FooterComp from "../Footer/footer.vue"

export default {
  name: "LandingPageComp", 
  components: {
    SponsoredNews,
    LeftComp,
    FeaturedTab,
    HeaderComp,
    FooterComp
  },

  data() {
    return {
      showSponsoredNews: [],
      showIsFeatured: [],
      categoryColor: {
        LifeStyle: '#d71b3b',
        Business: '#ff6e40',
        Marketing: '#12a4d9',
        Travel: '#cfb845',
        Technology: '#8a307f',
        Sports: '#05716c',
      },
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const allPosts = JSON.parse(localStorage.getItem('createPost')) || {};
      const sponsoredNewsArray = allPosts['sponsoredNews'] || [];
      const recentPostsArray = allPosts['recentPosts'] || [];
      const topHighlightsArray = allPosts['topHighlights'] || [];

      const isFeaturedSponsoredNews = sponsoredNewsArray.reverse().slice(0, 4);
      const isFeaturedRecentPosts = recentPostsArray.filter(post => post.isFeatured);
      const isFeaturedTopHighlights = topHighlightsArray.filter(post => post.isFeatured);

      const allFeaturedPosts = [
        ...isFeaturedRecentPosts,
        ...isFeaturedTopHighlights,
        ...isFeaturedSponsoredNews
      ];

      const formattedFeaturedPosts = allFeaturedPosts.map(post => ({
        ...post,
        submissionDateTime: new Date(`${post.submissionDay} ${post.submissionTime}`)
      }));

      const sortedFeaturedPosts = formattedFeaturedPosts
        .sort((a, b) => b.submissionDateTime - a.submissionDateTime)
        .slice(0, 4); 

      this.showSponsoredNews = isFeaturedSponsoredNews;
      this.showIsFeatured = sortedFeaturedPosts.reverse();
    },
  },
};
</script>
<style src="./landingPage.css" scoped>
</style>
