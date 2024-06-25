<template>
  <div class="ref">
    <div class="footer-container">
      <div class="ref1">
        <img id="logo" src="../../assets/images/mainlogo.png" alt="Logo" />
        <section>
          <div id="text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perspiciatis aut laudantium ipsum suscipit optio fugiat, inventore
            repellat culpa architecto, quis odit autem praesentium asperiores!
          </div>
          <!-- Email Address and Subscribe Button -->
          <div id="subscribe">
            <form id="sub" @submit.prevent="submitForm">
              <input
                id="email"
                type="text"
                v-model="email"
                placeholder="Enter your email address"
              />
              <button class="red-btn"><b>Subscribe</b></button>
            </form>
            <p v-if="showError" class="errorMessage">{{ errorMessage }}</p>
            <div class="text2">
              By subscribing you agree to our <u>Privacy Policy</u>
            </div>
          </div>
        </section>
      </div>
      <hr color="grey" />
      <div class="ref2">
        <div class="ref2-heading">
          Recent post
          <div id="post">
            <button class="red-label">
              <font-awesome-icon icon="fa-solid fa-circle" size="2xs" />
              Business
            </button>
            <div>Up-coming business bloggers, you need to watch</div>
            <div>by Dennis - Apr 06,2022</div>
          </div>
          <div id="post">
            <button class="red-label">
              <font-awesome-icon icon="fa-solid fa-circle" size="2xs" />
              Marketing
            </button>
            <div>
              How did we get here? The history of <br />the business told
              through tweets
            </div>
            <div>by Larry - May 29,2022</div>
          </div>
        </div>
        <div class="ref2-heading">
          Navigation
          <div class="list">
            <section>
              <div>Features</div>
              <div>Style Guide</div>
              <div>Contact us</div>
              <div>Get Theme</div>
              <div>Support</div>
              <div>Privacy Policy</div>
              <div>Newsletter</div>
            </section>
            <section>
              <div>News</div>
              <div>Career <button class="red-label1">2 Job</button></div>
              <div>Technology</div>
              <div>Startups</div>
              <div>Gadgets</div>
              <div>Inspiration</div>
            </section>
          </div>
        </div>
        <div class="ref2-heading">
          Get Regular updates
          <div class="list">
            <section>
              <div>
                <font-awesome-icon icon="fa-brands fa-whatsapp" size="sm" />
                Whatsapp
              </div>
              <div>
                <font-awesome-icon icon="fa-brands fa-youtube" size="sm" />
                YouTube
              </div>
              <div>
                <font-awesome-icon icon="fa-solid fa-bell" size="sm" /> Website
                Notifications
              </div>
              <div>
                <font-awesome-icon icon="fa-regular fa-envelope" size="sm" />
                Newsletters
              </div>
              <div>
                <font-awesome-icon icon="fa-solid fa-headphones" size="sm" />
                Podcasts
              </div>
            </section>
          </div>
        </div>
        <div class="ref2-heading">
          Our mobile App
          <div>
            Download our App and get the latest Breaking News Alerts and latest
            headlines and daily articles near you.
          </div>
          <div>
            <img src="../../assets/images/appstore.png" alt="" />
            <img src="../../assets/images/googleplay.png" alt="" />
          </div>
        </div>
      </div>
      <div class="ref3">
        <div class="ref3-heading">Hot Topics</div>
        <div class="topics">
          <div>Covid-19</div>
          <div>Politics</div>
          <div>Entertainment</div>
          <div>Media</div>
          <div>Royalist</div>
          <div>World</div>
          <div>Half full</div>
          <div>Scouted</div>
          <div>Travel</div>
          <div>Beast Inside</div>
          <div>Crossword</div>
          <div>Newsletters</div>
          <div>Podcasts</div>
          <div>Auction 2022</div>
          <div>Protests</div>
          <div>News Cyber</div>
          <div>Education</div>
          <div>Sports</div>
          <div>Tech and Auto</div>
          <div>Option</div>
          <div>Share Market</div>
        </div>
      </div>
    </div>
    <!-- Copyright and Other important information  -->
    <footer>
      <div id="footer">
        <div>&copy; 2023,Blogs. All Rights Reserved</div>
        <div id="footer1">
          <div>English Edition</div>
          <div>Terms</div>
          <div>Privacy</div>
          <div>Cookies</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "FooterComp",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      email: "",
      showError: false,
      errorMessage: "",
    };
  },
  methods: {
    submitForm() {
      if (this.email.trim() === "") {
        (this.showError = true),
          (this.errorMessage = "Email address cannot be empty");
      } else if (!this.isValidEmail(this.email)) {
        (this.showError = true),
          (this.errorMessage = "Should be in abc@email.com format");
      } else {
        this.showError = false;
        this.email = "";
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
@import "../Footer/footer.css";
</style>
