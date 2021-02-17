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
      :class="{'closed' : searchClosed}"
      @focus="searchClosed = false"
      @blur.native="searchClosed = true"
      ></v-text-field>
</template>

<script>
  import axios from "axios"
  import {mapActions} from "vuex";
  import AuthService from "@/services/auth.service";

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
      ...mapActions(['inputPost']),
      showSearch() {
        const authorizationHeader = 'Authorization';
        auth.getAccessToken().then((userToken) => {
          axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
          this.inputPost(
              {
                "searchText": "Ботинок",
                "searchDiscountOption": "All",
                "searchAddressCountry": "Филиппины",
                "searchAddressCity": "Белгород",
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
      },
        onResize() {
          this.searchClosed = document.documentElement.clientWidth < 1080 ? true  : false;
        },
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

