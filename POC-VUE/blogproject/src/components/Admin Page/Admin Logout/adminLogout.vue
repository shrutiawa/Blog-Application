<template>
  <!-- Logging out of Admin -->
    <div>
    <button class="red-btn nav-link" @click="handleLogout">Logout</button>
  </div>
</template>
<script>
export default {
    name: "LogoutComp",
    methods: {
      // Click of logout button , it will delete the admin's credentials
    handleLogout() {
        localStorage.removeItem('adminCredentials');
        localStorage.setItem("isAdminLoggedIn",false)
      // When admin logged out it will navigate to admin page to log in
      this.$router.push('/admin');
    },
  },
}</script>
<style scoped src="../../PostList/postList.css"></style>