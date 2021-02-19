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
      :class="{'closed' : searchClosed}"
      @focus="searchClosed = false"
      @blur.native="searchClosed = true"
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
        searchResult: '',
        sideNav: false,
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        drawer: false,
        searchClosed: true
      }
    },
    methods: {
      onResize() {
        this.searchClosed = document.documentElement.clientWidth < 1080 ? true  : false;
      },
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
                  .catch((error) => {
                    alert(error);
                  });

        });

        this.searchResult = '';
      }
    },
    created() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },
  }



</script>

<style scoped>

</style>
