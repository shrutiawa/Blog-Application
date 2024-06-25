<template>
  <!-- Navigation Bar -->
  <div class="navbar">
    <button class="red-btn nav-link" @click="navigateToCreatePost">Create Post</button>
    <LogOutComp/>
  </div>
  <!-- Main Component -->
  <div class="table-container">
    <div class="search-list-container">
      <input type="text" placeholder="Search" :value="searchItem"  @input="updatesearchItem"/>
      <button class="search-btn" type="submit" @click="searchPosts">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" />
      </button>
      <select name="sort" id="sort" v-model="sortOption" @change="handleSort">
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="newest">Latest Posts</option>
        <option value="oldest">Oldest Posts</option>
      </select>
    </div>
    <!-- Post List Table -->
    <div>
      <div v-if="noMatchingPosts">
  No posts match the provided search criteria.
</div>
      <table class="table" v-else>
        
        <thead>
          <tr>
            <th>Post Name</th>
            <th>Published Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <!-- Displaying posts from localstorage -->
        <tbody v-for="(post, idx) in filteredPostList" :key="idx">
          <tr>
            <td>{{ post.postName }}</td>
            <td>{{ post.submissionDay}}</td>
            <td>
              <button class="post-category-btn" :style="{backgroundColor : categoryColor[post.postCategory] || 'orange'}"><font-awesome-icon icon="fa-solid fa-circle" size="2xs"/> {{ post.postCategory }}</button>
            </td>
            <td>
              <!-- Delete Button -->
              <button class="postlist-delete" @click="deleteHandler(idx)"><font-awesome-icon icon="fa-regular fa-trash-can" size="xl" style="padding: 4px 5px;" /></button>{{ ' ' }}
              <!-- Edit Button -->
              <button class="postlist-edit" @click="editHandler(post.postId)"><font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" style="padding: 4px 5px;"/></button>
            </td>
          </tr>
         <tr v-if="idx != filteredPostList.length - 1" :style="{height:'2px', backgroundColor:'#ccc'}">
            <td :colSpan="4"></td>
          </tr> 
        </tbody>
      </table>
      <!-- Pagination component getting rendered and passing functions and variables as parameters-->
      <PaginationComp :totalPages="totalPages" :currentPage="currentPage" :paginationDisplay="paginationDisplay" @prev-page="prevPage" @next-page="nextpage" @go-to-page="goToPage"/>
    </div>
  </div>
</template>
<script>

import LogOutComp from "../Admin Page/Admin Logout/adminLogout.vue"
import PaginationComp from  "../PostList/Pagination/pagination.vue"

export default {
  name: "PostList",
  components : {
    PaginationComp,
    LogOutComp
  },
  data(){
    return {
      /*  Initial reactive state for component instance */
      posts : [],
      filteredPosts : [],
      noMatchingPosts: false,
      /* Dynamic color assignment according to post category */
      categoryColor : {
        Lifestyle : "#d71b3b",
        Business : "#ff6e40",
        Marketing : "#12a4d9",
        Travel : "#cfb845",
        Technology : "#8a307f",
        Sports : "#05716c"
      },
      postsPerPage : 5,
      currentPage : 1,
      searchItem : "",
      sortOption : ""
    }
  },
  computed : {
    /*  Total no. of pages based on posts */
    totalPages(){
      return this.filteredPosts.length > 0 ? Math.ceil(this.filteredPosts.length / this.postsPerPage) : Math.ceil(this.posts.length / this.postsPerPage)
    },
    /* Rendering based on search and pagination and sorting*/
    filteredPostList(){
      const indexLastPost = this.currentPage * this.postsPerPage
      const indexFirstPost = indexLastPost - this.postsPerPage
      return this.filteredPosts.length > 0
      ? this.filteredPosts.slice(indexFirstPost, indexLastPost)
      : this.posts.slice(indexFirstPost, indexLastPost);
    },
    /*  Tells the current state of the page*/
    paginationDisplay(){
      return this.totalPages > 0 ? `Showing ${this.currentPage} out of ${this.totalPages} pages` : "No posts to display"
    },
  },
  mounted(){
    /* Load data from local storage when component is mounted */
    this.localStorageData()
  },
  methods : {
    localStorageData(){
      /* Laod posts from local storage */
      const storedData = localStorage.getItem('createPost');
 
      try {
        const parsedData = JSON.parse(storedData) || {};

        const recentPostsData = parsedData.recentPosts ?? []
        const sponsoredNewsData = parsedData.sponsoredNews ?? []
        const topHighlightsData = parsedData.topHighlights ?? []

      /* Combine all posts into one parseable array */ 
        const allPosts = [...recentPostsData, ...sponsoredNewsData, ...topHighlightsData]
        this.posts = allPosts

      } catch (error) {
        console.error("Error parsing 'createPost' data:", error);
      }
    },
    /* Delete posts from localstorage */
    deleteHandler(idx){
      this.posts.splice(idx, 1)

      const storedData = localStorage.getItem("createPost") || {}
      const existingData = storedData ? JSON.parse(storedData) : { topHighlights : [], sponsoredNews : [], recentPosts : [] }

      /* Restructureingthe localstorage array */
      existingData.topHighlights = this.posts.filter(post => post.postType === "Top Highlights");
      existingData.sponsoredNews = this.posts.filter(post => post.postType === "Sponsored News");
      existingData.recentPosts = this.posts.filter(post => post.postType === "Recent Post");

    /* Update local storage */
      localStorage.setItem("createPost", JSON.stringify(existingData));
    },
    /* Navigate to Create post with clicked postID */
    editHandler(postId){
      this.$router.push({name : 'edit-post', params : {postId}})
    },
    navigateToCreatePost() {
      this.$router.push({ name: "create-post" });
    },
    /* Move to  Previous Page on Click */
    prevPage(){
      this.currentPage--
    },
    /* Move to Next Page on Click */
    nextpage(){
      this.currentPage++
    },
  /* Move to  Specific Page Number on Click */
    goToPage(pageNumber){
      this.currentPage = pageNumber
    },
    /* Updating the Variable on every change of value */
    updatesearchItem(event){
      this.searchItem = event.target.value
    },
    /* Search for posts in local storage*/
    searchPosts() {
    if (this.searchItem && this.searchItem.trim() !== "") {
      this.filteredPosts = this.posts.filter((post) =>
        post.postName.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        post.postCategory.toLowerCase().includes(this.searchItem.toLowerCase()));
        if (this.filteredPosts.length === 0) {
      // Set a flag or display a message indicating no matching posts
      this.noMatchingPosts = true;
      this.totalPages = 1;
    } else {
      // Reset the flag if there are matching posts
      this.noMatchingPosts = false;
      
    }
    } else {
      console.log("No search item provided");
      this.filteredPosts = [];
      this.noMatchingPosts = false;
    }
    
    this.currentPage = 1;

    },
    /* Sort based on options */
    handleSort() {
      let arrayToSort = this.filteredPosts.length > 0 ? this.filteredPosts : this.posts;

      if (this.sortOption) {
        switch (this.sortOption) {
          case 'name':
            arrayToSort.sort((a, b) => a.postName.localeCompare(b.postName));
            console.log("By Name", arrayToSort);
            break;
          case 'newest':
            arrayToSort.sort((a, b) => {
              const dateComparison = new Date(b.submissionDay + ' ' + b.submissionTime) - new Date(a.submissionDay + ' ' + a.submissionTime);
              return dateComparison !== 0 ? dateComparison : a.postName.localeCompare(b.postName);
            });
            console.log("Newest", arrayToSort);
            break;
          case 'oldest':
            arrayToSort.sort((a, b) => {
              const dateComparison = new Date(a.submissionDay + ' ' + a.submissionTime) - new Date(b.submissionDay + ' ' + b.submissionTime);
              return dateComparison !== 0 ? dateComparison : a.postName.localeCompare(b.postName);
            });
            console.log("Oldest", arrayToSort);
            break;
            default:
              break;
        }
      }
        this.currentPage = 1;

        if (this.filteredPosts.length > 0) {
          this.filteredPosts = arrayToSort;
        } else {
          this.posts = arrayToSort;
        }
    }
  }
};
</script>
<style scoped src="./postList.css"></style>
