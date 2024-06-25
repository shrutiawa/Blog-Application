<template>
  <div className="login-container">
  <div  class="login">
    <img src="../../../assets/images/hi.png" alt="hi-icon" />
    <h1>Welcome back!</h1>
    <p>Let's write something great</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <form @submit.prevent="handleSubmit">
      <!-- Email input -->
      <div class="email">
        <label for="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Your email address"
          v-model="email"
        />
      </div>
      <!-- Password input -->
      <div class="password">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
          v-model="password"
        />
      </div>
      <!-- Checkbox for 'Keep me logged in' -->
      <div class="checkbox">
        <input
          type="checkbox"
          id="keepLoggedIn"
          name="keepLoggedIn"
          v-model="keepLoggedIn"
        />
        <label for="keepLoggedIn">Keep me logged in</label>
      </div>
      <!-- Sign-in button -->
      <div class="signin">
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "AdminLoginComp",
  data() {
    return {
      staticData: {
      correctEmail: 'admin@gmail.com',
      correctPassword: 'admin123#',
    },
      email: "",
      password: "",
      loggedIn: false,
      keepLoggedIn: false,
      errorMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      // Validate credentials and handle login
      if (
        this.email === this.staticData.correctEmail &&
      this.password === this.staticData.correctPassword
      ) {
        // Set the admin's login status and credentials in localStorage
        localStorage.setItem("isAdminLoggedIn", JSON.stringify(true));
        if (this.keepLoggedIn) {
          localStorage.setItem(
            "adminCredentials",
            JSON.stringify({
              email: this.email,
              password: this.password,
            })
          );
        }
        
        // Navigate to post-list on successful login
        this.$router.push("/post-list");
      } else {
        // Wrong credentials give error message
        this.errorMessage = "Invalid username or password";
      }
    },
  },
};
</script>

<style scoped>

@import "./login.css";
</style>
