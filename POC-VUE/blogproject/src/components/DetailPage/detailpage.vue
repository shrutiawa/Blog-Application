<template>
  <!-- header component -->
    <HeaderComp></HeaderComp>
  
    <!-- detailpage layout -->
  <div class="main-container">
    <div class="main">
        <header class="main-header">
          <button
            class="btn"
            :style="{ backgroundColor: categoryColor[showPost.postCategory] || 'crimson' }"
          >
          <font-awesome-icon icon="fa-solid fa-circle" size="sm" style="color: #ffffff;"/>

            {{ showPost.postCategory }}
          </button>
          <h1>{{ showPost.postName }}</h1>
          <p>{{ showPost.shortDescription }}</p>
        </header>
        
        <!-- author info -->
        <section class="left-sidebar">
          <img src="../../assets/images/profile.jpg" alt="profile-1" />
          <div class="left-sidebar-about">
            <h4>Louis Ferguson</h4>
            <p>An editor at blog</p>
          </div>
          <hr />
          <div class="left-sidebar-content">
            <div>
              <p>{{ showPost.submissionDay }}</p>
              <p>{{ showPost.submissionTime }}</p>
              <p>
                <font-awesome-icon icon="fa-regular fa-heart" size="sm" style="color: #000;"/>
                266
              </p>
              <p>
                <font-awesome-icon icon="fa-regular fa-eye" size="sm" style="color: #000;"/>
                2678 Views
              </p>
            </div>
            <div>
              <p>#agency #business</p>
              <p>#theme #marketing</p>
            </div>
          </div>
        </section>
  

        <aside class="right-sidebar">
          <h4>Share this article</h4>
          <font-awesome-icon icon="fa-brands fa-facebook" :style=" { color: '#619bff',marginRight: '0.3em' } " size="2xl" />
          <font-awesome-icon icon="fa-brands fa-square-x-twitter" :style="{ color: '#000000', marginRight: '0.3em' }" size="2xl" />
          <font-awesome-icon icon="fa-brands fa-linkedin" :style="{ color: '#1b3a6f', marginRight: '0.3em' }" size="2xl" />
          <font-awesome-icon icon="fa-brands fa-pinterest" :style="{ color: '#ff0000', marginRight: '0.3em' }" size="2xl" />
          <font-awesome-icon icon="fa-regular fa-envelope" :style="{ color: '#6ba1ff' }" size="2xl" />
          <div class="right-sidebar-img">
            <img src="../../assets/images/advertisement.png" alt="" />
          </div>
        </aside>
  
        <!-- post description dynamic loading -->
        <main class="main-content">
          <div class="section-1">
            <div
              class="section-1-img"
              v-html="showPost.postBody"
            ></div>
            <div class="main-content-img">
              <img :src="showPost.postImage" alt="" />
            </div>
            <font-awesome-icon icon="fa-solid fa-ellipsis" :style="{ color: '#001842', width: '100%' }" size="xl" />
          </div>
  
          <div class="section-2-quote">
            <div class="sq-content">
              <img src="../../assets/images/quote.png" alt="quote" />
              <p>
                Success is not the key to happiness. Happiness is the key to
                success. If you love what you are doing, you will be successful.
                <cite>- Albert Schweitzer</cite>
              </p>
            </div>
          </div>

          <!-- related posts section -->
      <div class="related-post">
        <h3>
          <font-awesome-icon icon="fa-solid fa-shapes"  size="sm"/> Related Post
        </h3>
        <div class="rp-content">
            <div v-for="(post, idx) in relatedPost" :key="idx" :class="`rp-card${idx + 1} image-hover`">
            <div class="rp-card-img1">
                <router-link :to="{ name: 'detail-page', params: { postId: post.postId } }" @click="reloadPage(post.postId)">
                <img :src="post.postImage" alt="" />
              </router-link>
              <button
              
                :style="{ backgroundColor: categoryColor[post.postCategory] || 'crimson' }"
              >
                <font-awesome-icon
                  icon="fa-solid fa-circle"
                  size="xs"
                  :style="{ marginRight: '0.2rem' }"
                />
                {{ post.postCategory }}
              </button>
            </div>
            <div class="rp-card-content">
              <h4>{{ post.postName }}</h4>
              <div class="rp-card-content-about">
                <img src="../../assets/images/profile-3.jpg" alt="" />
                <p>by Bryan</p>
                &bull;
                <p>{{ post.submissionDay }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- author testimonial section -->
      <hr class="author-testimonial-hr" />
          <div class="author-testimonial">
            <div class="at-img">
              <img src="../../assets/images/profile.jpg" alt="Profile" />
            </div>
            <div class="at-content">
              <div class="at-about">
                <div class="at-about-editor">
                  <h3>Louis Ferguson</h3>
                  <p>An editor at Blog</p>
                </div>
                <div>
                  <button>View Articles</button>
                </div>
              </div>
              <p>
                Louis Ferguson is a senior editor for the blog and also reports
                on breaking news based in London. He has written about
                government, criminal justice, and the role of money in politics
              </p>
              <font-awesome-icon
                icon="fa-brands fa-square-facebook"
                size="lg"
                :style="{ color: '#1c222b', marginRight: '0.3em' }"
              />
              <font-awesome-icon
                icon="fa-brands fa-square-x-twitter"
                size="lg"
                :style="{ color: '#1c222b', marginRight: '0.3em' }"
              />
              <font-awesome-icon
                icon="fa-brands fa-linkedin"
                size="lg"
                :style="{ color: '#1c222b' }"
              />
            </div>
          </div>
          <hr class="author-testimonial-hr">

          <!-- comments section -->
          <CommentsComp :postId="postId" />
        </main>
    </div>
    
    <!-- footer component -->
  </div>
  <FooterComp></FooterComp>

</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, onMounted, watch } from 'vue';
import HeaderComp from "../Header/header.vue";
import FooterComp from '../Footer/footer.vue';
import CommentsComp from './Comments/comments.vue';
import { useRoute, useRouter} from 'vue-router';

export default {
  name: 'DetailPage',
  components: {
    FontAwesomeIcon,
    CommentsComp,
    HeaderComp,
    FooterComp,
  },

  setup() {
    const route = useRoute();
    const router=useRouter();
    const postId = ref(route.params.postId || '');
    const showPost = ref({});
    const relatedPost = ref([]);
    const categoryColor = ref({
      LifeStyle: '#d71b3b',
      Business: '#ff6e40',
      Marketing: '#12a4d9',
      Travel: '#cfb845',
      Technology: '#8a307f',
      Sports: '#05716c',
    });

    // to fetch the post values based on the postId from localstorage
    const fetchData =  (postId) => {
      const storedData = localStorage.getItem('createPost');
      try {
        const parsedData = JSON.parse(storedData) || {};
        const latestRelatedPosts = (parsedData.sponsoredNews || []).slice(0, 2) || [];
        relatedPost.value = latestRelatedPosts;
        const allPosts = [
          ...parsedData.topHighlights,
          ...parsedData.sponsoredNews,
          ...parsedData.recentPosts,
        ];
        const selectedPost = allPosts.find((p) => p.postId == postId) || {};
        showPost.value = selectedPost;
        window.scrollTo({top: 0,})
      } catch (error) {
        console.error("Error parsing 'createPost' data:", error);
      }
    };

    // to reload the page as another postId is clicked
    const reloadPage = (postId) => {
      router.push({ name: 'detail-page', params: { postId } });
    };

    onMounted(() => {
      fetchData(postId.value);
    });

    watch(
      () => route.params.postId,
      (newPostId) => {
        fetchData(newPostId);
      }
    );

    return {
      postId,
      showPost,
      relatedPost,
      categoryColor,
      reloadPage
    };
  },
};
</script>
<style scoped>
@import '../DetailPage/detail.css';
</style>