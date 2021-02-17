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

  import {mapActions} from "vuex";
    import AuthService from "@/services/auth.service";
  const moment = require('moment')
  import {mapGetters, mapMutations,  mapState} from 'vuex'
  import axios from 'axios'
  const auth = new AuthService();
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
        const authorizationHeader = 'Authorization';
        auth.getAccessToken().then((userToken) => {
          axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
          this.inputPost(
                  {
                    "searchText": "Игр",
                    "searchDiscountOption": "All",
                    "searchAddressCountry": "Беларусь",
                    "searchAddressCity": "Минск",
                    "searchSortFieldOption": "NameDiscount",
                    "searchSortOption": "Asc",
                    "searchPaginationPageNumber": 1,
                    "searchPaginationCountElementPerPage": 10,
                    "searchLanguage": "Ru"
                  }
          )
                  .then((response) => {
                    this.countries = response.data;
                  })
                  .catch((error) => {
                    alert(error);
                  });

        });

        this.searchResult = '';
      }
    }
  }


</script>

<style scoped>

</style>
