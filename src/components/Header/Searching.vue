<template>
  <v-text-field
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      class="expanding-search mt-4"
      filled
      dense
      chips
      color="blue lighten-5"
      multiple
      v-model="searchResult"
      @keydown.enter="showSearch()"
  ></v-text-field>
</template>

<script>
  import axios from "axios"
  import {mapActions} from "vuex";

  export default {
    name: "Searching",
    data() {
      return {
        searchResult: ''
      }
    },
    methods: {
      ...mapActions(['inputPost']),
      showSearch() {
        this.inputPost(
                {
                  "searchText": this.searchResult,
                  "searchDiscountOption": "All",
                  "searchAddressCountry": "Украина",
                  "searchAddressCity": "Вінниця",
                  "searchSortFieldOption": "NameDiscount",
                  "searchSortOption": "Asc",
                  "searchPaginationPageNumber": 1,
                  "searchPaginationCountElementPerPage": 5,
                  "searchLanguage": "Ru"
                }
        )
        this.searchResult = '';
      }
    }
  }
</script>

<style scoped>

</style>
