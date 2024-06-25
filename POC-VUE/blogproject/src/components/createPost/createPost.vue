<template>
  <!-- Post creation/edit form -->
  <div class="post-container">
    <!-- Post navigation section -->
    <div class="post-navigation">
      <!-- Display "Edit Post" or "Create Post" based on editing status -->
      <h2>{{ isEditing ? "Edit Post" : "Create Post" }}<i class="fa fa-pen-square" style="color: #000"></i>
      </h2>
      <div>
        <button class="red-btn" @click="navigateToPostList">Dashboard</button>
      </div>
    </div>
    <!-- Form content -->
    <div class="dorm-container">
      <form @submit.prevent="handleSubmit">
        <!-- Input fields for post details -->
        <div class="post-name">
          <label for="postName">Post Name</label>
          <input v-model="formData.postName" type="text" name="postName" id="postName" placeholder="Post Name" required/>
        </div>
        <div class="post-description">
          <label for="shortDescription">Short Description</label>
          <textarea v-model="formData.shortDescription" name="shortDescription" id="shortDescription" rows="4" placeholder="Add Description" required></textarea>
        </div>
        <div class="post-body">
          <label for="postBody">Post Body</label>
          <!-- Quill editor -->
          <div ref="editor" style="height: 250px"></div>
        </div>
        <div class="post-image">
          <label for="postImage">Upload Post Image Here</label><br />
          <button>Choose File</button>
          <input v-model="formData.postImage" name="postImage" type="text" id="postImage" accept=".jpg,jpeg,.png" placeholder="Paste Image URL" required/>
        </div>
        <div class="type-category">
          <!-- Post type and category selection -->
          <div class="post-type">
            <label for="postType">Type</label>
            <select v-model="formData.postType" name="postType" id="postType" required>
              <!-- Options for post type -->
              <option value="">--Select Type--</option>
              <option value="Recent Post">Recent Post</option>
              <option value="Top Highlights">Top Highlights</option>
              <option value="Sponsored News">Sponsored News</option>
            </select>
          </div>
          <div class="post-category">
            <label for="postCategory">Category</label>
            <select v-model="formData.postCategory" name="postCategory" id="postCategory" required>
              <option value="">--Select Category--</option>
              <!-- Options for post category -->
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
        <div class="post-featured">
          <!-- Checkbox for featured post -->
          <input v-model="formData.isFeatured" type="checkbox" name="isFeatured" id="isFeatured"/>
          <label for="isFeatured"> Make this post featured ?</label>
        </div>
        <div>
          <button class="submit-btn" type="submit">
            <!-- Display "Update Post" or "Create Post" based on editing status -->
            {{ isEditing ? "Update Post" : "Create Post" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Import Quill styles and Quill library
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Quill from "quill";

export default {
  name: "CreatePostComp",
  data() {
    return {
      formData: {
        // Object to hold form data
        postName: "",
        shortDescription: "",
        postBody: "",
        postImage: "",
        postType: "",
        postCategory: "",
        isFeatured: false,
      },
      editor: null,
      isEditing: false,
      postIdToEdit: null,
    };
  },
  created() {
    // Check if editing an existing post
    if (this.$route.params.postId) {
      this.isEditing = true;
      this.postIdToEdit = parseInt(this.$route.params.postId, 10);
      this.loadEditedData();
    }
  },
  mounted() {
    // Initialize Quill editor on component mount
      this.initializeEditor();
  },
  methods: {
    // Function to initialize Quill editor
    initializeEditor() {
      // Quill editor initialization logic
      if(!this.editor){ 
      this.editor = new Quill(this.$refs.editor, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
            [{ align: [] }],
            ["clean"],
            [{ color: [] }, { background: [] }],
            ["font", "size"],
            ["script", "sub", "super"],
          ],
        },
      });
      // Event listener for editor text changes
      this.editor.on("text-change", this.handleEditorChange);
      }
    },
     // Function to handle changes in the editor content
    handleEditorChange() {
      this.formData.postBody = this.editor.root.innerHTML;
    },
    // Function to handle form submission
    handleSubmit() {
      const submissionTime = new Date().toLocaleTimeString();
      const submissionDay = new Date().toDateString();
      const postId = this.formData.postId || Math.floor(Math.random() * 100000000);
      const updatedFormData = {
        ...this.formData,
        submissionDay,
        submissionTime,
        postId,
      };
      // Retrieve existing data from local storage or initialize empty categories
      const storedData = localStorage.getItem("createPost")
      let existingData = storedData ? JSON.parse(storedData) : { topHighlights: [], sponsoredNews: [], recentPosts: [] };

      // Check if editing an existing post and decide whether to update or add a new post
      if (this.isEditing) {
        this.updateExistingPost(existingData, updatedFormData);
      } else {
        this.addNewPost(existingData, updatedFormData);
      }
      // Clear form data and editor content after submission
      this.formData = {
        postName: "",
        shortDescription: "",
        postBody: "",
        postImage: "",
        postType: "",
        postCategory: "",
        isFeatured: false,
      };
      this.editor.root.innerHTML = "";
      // Display success message
      window.alert(
        `${this.isEditing ? "Updated" : "Added"} Blog Post Successfully!!!`
      );
    },
    // Function to load data of the post being edited
    loadEditedData() {
      const storedData = localStorage.getItem("createPost") || {};
      const allPosts = JSON.parse(storedData);

      const allPostsData = [
        ...allPosts.topHighlights,
        ...allPosts.sponsoredNews,
        ...allPosts.recentPosts,
      ];

      const postToEdit = allPostsData.find(
        (post) => post.postId === this.postIdToEdit
      );

      if (postToEdit) {
        this.formData = { ...postToEdit };
        this.$nextTick(() => {
       // Populate the editor with the post body content
        this.initializeEditor();
        this.editor.root.innerHTML = this.formData.postBody;
      });
      } else {
        console.error(`Post with ID ${this.postIdToEdit} not found`);
      }
    },
    // Function to add a new post to respective category
    addNewPost(existingData, updatedFormData) {
      // Add the new post to the appropriate category
      if (updatedFormData.postType === "Top Highlights") {
        existingData.topHighlights.push(updatedFormData)
      } else if (updatedFormData.postType === "Sponsored News") {
        existingData.sponsoredNews.push(updatedFormData)
      } else if (updatedFormData.postType === "Recent Post") {
        existingData.recentPosts.push(updatedFormData)
      } 

      localStorage.setItem("createPost", JSON.stringify(existingData));
    },
    // Function to update an existing post in the respective category
    updateExistingPost(existingData, updatedFormData) { 
      // Update the existing post in the appropriate category
      const topHighlightsIndex = existingData.topHighlights.findIndex(
        (post) => post.postId === updatedFormData.postId
      )
      const sponsoredNewsIndex = existingData.sponsoredNews.findIndex(
        (post) => post.postId === updatedFormData.postId
      )
      const recentPostsIndex = existingData.recentPosts.findIndex(
        (post) => post.postId === updatedFormData.postId
      )

      // Remove the existing post from its category
      if (topHighlightsIndex !== -1) {
        existingData.topHighlights.splice(topHighlightsIndex, 1)
      } else if (sponsoredNewsIndex !== -1) {
        existingData.sponsoredNews.splice(sponsoredNewsIndex, 1)
      } else if (recentPostsIndex !== -1) {
        existingData.recentPosts.splice(recentPostsIndex, 1)
      } else {
        console.error("Post not found for updating.")
      }

      // Add the updated post to the appropriate category
      if (updatedFormData.postType === "Top Highlights") {
        existingData.topHighlights.push(updatedFormData)
      } else if (updatedFormData.postType === "Sponsored News") {
        existingData.sponsoredNews.push(updatedFormData)
      } else if (updatedFormData.postType === "Recent Post") {
        existingData.recentPosts.push(updatedFormData)
      } else {
        console.error("Invalid post type.")
        return
      }
      // Update local storage with the modified data and navigate to post list
      localStorage.setItem("createPost", JSON.stringify(existingData));

      this.navigateToPostList()
    },
    // Function to navigate back to the post list
    navigateToPostList() {
      this.$router.push({ name: "post-list" });
    },
  },
};
</script>

<style src="./createPost.css" scoped></style>
