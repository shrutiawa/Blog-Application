<template>
  <!-- Pagination Template -->
  <div class="pagination">
      <div class="pagination-info">{{ paginationDisplay}}</div>
      <div class="pagination-buttons">
        <!-- Previous page Button -->
        <button @click="goToprev" :disabled="currentPage === 1 || totalPages === 1">Prev</button>
        <!-- Dynamic rendering of Pagination according to the parameters and pages -->
          <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{active : currentPage === pageNumber}">{{pageNumber}}</button>
          <!-- GO next Button -->
        <button @click="goToNext" :disabled="currentPage === totalPages || totalPages === 0">Next</button>
      </div>
    </div>
</template>
<script>
export default {
  name : "PaginationComp",
  /* Props which are passed as Parameters */
  props : {
    paginationDisplay: String,
    totalPages : Number,
    currentPage : Number,
    filteredPosts : Array
  },
  methods : {
    /* Calls previous page function in Postlist */
    goToprev(){
      this.$emit("prev-page")
    },
    /* Calls next page function in Postlist */
    goToNext(){
      this.$emit("next-page")
    },
    /* Calls page number function in Postlist */
    goToPage(pageNumber){
      this.$emit("go-to-page", pageNumber)
    }
  }
}
</script>
<style scoped src="../postList.css"></style>