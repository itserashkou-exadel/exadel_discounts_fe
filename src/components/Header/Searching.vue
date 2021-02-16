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
          v-model="search"
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
        search: null
      }
    },

    watch: {
      search: function(){
        this.setKeyWord(this.search)
      }
    },
    methods: {
      ...mapActions(['inputPost', 'setKeyWord']),
      showSearch() {
        this.inputPost(
                {
                  "searchText": this.search,
                  "searchDiscountOption": "All",
                  "searchAddressCountry": "Украина",
                  "searchAddressCity": "Вінниця",
                  "searchSortFieldOption": "NameDiscount",
                  "searchSortOption": "Asc",
                  "searchPaginationPageNumber": 1,
                  "searchPaginationCountElementPerPage": 15,
                  "searchLanguage": "Ru"
                }
        )


      }
    }
  }
</script>

<style scoped>

</style>
