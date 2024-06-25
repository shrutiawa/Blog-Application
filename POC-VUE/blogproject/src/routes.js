import { createRouter, createWebHistory } from "vue-router";
import LandingPageComp from "./components/Landing Page/landingPage.vue";
import CreatePostComp from "./components/createPost/createPost.vue";
import AdminLoginComp from "./components/Admin Page/Admin Login/login.vue";
import PostList from "./components/PostList/postList.vue";
import DetailPage from "./components/DetailPage/detailpage.vue";

const routes = [
  // Path for the Landing Page First User Interface
  { path: "/", component: LandingPageComp },

  // Path for the Post details
  { path: "/detail-page/:postId", name: "detail-page", component: DetailPage },

  // Path for the detail when admin directly navigate to post detail page
  { path: "/detail-page", component: DetailPage },

  // Path to edit the post same path of create post
  { path: "/create-post/:postId", name: "edit-post", component: CreatePostComp },

  // Path for the admin login
  {
    path: "/admin",
    component: AdminLoginComp,
    beforeEnter: (to, from, next) => {
      const isAdminLoggedIn = JSON.parse(
        localStorage.getItem("isAdminLoggedIn")
      );

      if (isAdminLoggedIn) {
        next("/");
      } else {
        console.log("hello");
        next();
      }
    },
  },

  // Path for the post-list to display all the post
  {
    path: "/post-list",
    name: "post-list",
    component: PostList,
    beforeEnter: (to, from, next) => {
      const isAdminLoggedIn = JSON.parse(
        localStorage.getItem("isAdminLoggedIn")
      );

      if (!isAdminLoggedIn) {
        next("/admin");
      } else {
        next();
      }
    },
  },

  //  Path to navigate to create-post form to create post
  {
    path: "/create-post",
    name: "create-post",
    component: CreatePostComp,
    beforeEnter: (to, from, next) => {
      const isAdminLoggedIn = JSON.parse(
        localStorage.getItem("isAdminLoggedIn")
      );

      if (!isAdminLoggedIn) {
        next("/admin");
      } else {
        next();
      }
    },
  },
];


// Create the router instance by using createRouter
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;