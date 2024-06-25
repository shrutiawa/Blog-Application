<template>
    <div class="main-content">
      <section class="heading">
        <h1>{{ filteredComments.length }} Comments</h1>
      </section>
      <section class="box1">
        <ol class="ol">
          <li v-for="(comment, index) in filteredComments" :key="index">
            <div class="comments">
              <div class="image">
                <img src="../../../assets/images/user-2.jpg" alt="user" />
              </div>
              <!-- comments of that particular post -->
              <div class="content-comments">
                <p>{{ comment.name }}</p>
                <p>{{ comment.time }}</p>
                <button class="reply">Reply</button><br>
                <p class="comments-main">{{ comment.comment }}</p><br>
                <!-- deleting the component -->
                <button @click="deleteComment(index)" class="delete-comment">Delete</button>
              </div>
            </div>
          </li>
        </ol>
      </section>
      <section class="form">
        <h2>Leave a reply</h2>
        <p>Your email address will not be published. Required fields are marked*</p>

        <!-- form layout -->
        <form @submit.prevent="submitChange">
          <div class="form-container" :class="{ 'disabled-form': !isCommentSectionEnabled }" >
            <div class="name">
              <label for="name">Name</label><br><br>
              <input v-model="store.name" type="text" name="name" id="name" required  />
            </div>
            <div class="email">
              <label for="email">Email</label><br><br>
              <input v-model="store.email" type="email" name="email" id="email" required />
            </div>
          </div>
          <div class="check" :class="{ 'disabled-form': !isCommentSectionEnabled }">
            <input type="checkbox" name="check" id="check" :disabled="!isCommentSectionEnabled"/>
            <p class="para-info">Save my name and email in this browser for the next time I comment</p><br><br>
          </div>
          
          <div class="textarea" :class="{ 'disabled-form': !isCommentSectionEnabled }">
            <label for="comment">Your Comment</label><br>
            <textarea v-model="store.comment" name="comment" id="comment" rows="7" required :disabled="!isCommentSectionEnabled"></textarea>
          </div>
          <button  type="submit" class="btn-comment" :disabled="!isCommentSectionEnabled">Post comment</button>
        </form>
        <p v-if="!isCommentSectionEnabled">The comment section is disabled.</p>
      </section>
    </div>
  </template>
  
  <script>
  
  export default {
    name:'CommentsComp',
    props: {
      postId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        store: {
          postId: this.postId,
          list: JSON.parse(localStorage.getItem('userlist')) || [],
        }
      };
    },
    computed: {
      filteredComments() {
        return this.store.list.filter(val => val.postId === this.postId);
      },
      isCommentSectionEnabled() {
      return !!this.postId;
    },
    },
    methods: {
      submitChange() {
        if (this.store.name.trim() !== '' && this.store.comment.trim() !== '') {
          const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
          const submissionDate = new Date().toLocaleString('en', options);
          this.store.list = [
          ...this.store.list, 
          { postId: this.postId, 
            name: this.store.name, 
            email: this.store.email, 
            comment: this.store.comment, 
            time: submissionDate }
          ];
          this.resetForm();
        }
      },
      resetForm() {
        this.store.name = '';
        this.store.email = '';
        this.store.comment = '';
      },
      // deleting the comments
      deleteComment(index) {
      this.store.list.splice(index, 1);
    },
    fetchComments(postId) {
      const storedComments = JSON.parse(localStorage.getItem('userlist')) || [];
      this.store.list = storedComments.filter((val) => val.postId === postId);
    },
    },
    watch: {
      store: {
        immediate: true,
        handler: function (newVal) {
          const jsonList = JSON.stringify(newVal.list);
          localStorage.setItem('userlist', jsonList);
         
        },
        deep: true
      },
      postId: function (newPostId) {
    // Update the postId in the store
    this.$set(this.store, 'postId', newPostId);

    // Fetch comments based on the new postId
    this.fetchComments(newPostId);
  }
    }
  };
  </script>
  
  <style scoped>
  @import "../Comments/comments.css";
  </style>