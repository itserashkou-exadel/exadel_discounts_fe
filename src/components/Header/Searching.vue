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
      v-model="search"
      @keydown.enter="showSearch()"
      ></v-text-field>
</template>

<script>
  import axios from "axios"
  import {mapActions} from "vuex";

export default {
  name: "Searching",
  data: () => ({
    sideNav: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    drawer: false,
    searchClosed: true,
    search: null
  }),
  watch: {
    search: function(){
      this.setKeyWord(this.search)
    }
  },
   methods:  {
     ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount']),
     showSearch() {
       console.log(this.search)
       this.$store.state.discounts = [];
       this.inputPost(
               {
                 "searchText": this.search,
                 "searchDiscountOption": "All",
                 "searchAddressCountry": "Украина",
                 "searchAddressCity": "Вінниця",
                 "searchSortFieldOption": "NameDiscount",
                 "searchSortOption": "Asc",
                 "searchPaginationPageNumber": 1,
                 "searchPaginationCountElementPerPage": 5,
                 "searchLanguage": "Ru"
               }
       );
       setTimeout(this.nextDiscount(
               {
                 "searchText": this.search,
                 "searchDiscountOption": "All",
                 "searchAddressCountry": "Украина",
                 "searchAddressCity": "Вінниця",
                 "searchSortFieldOption": "NameDiscount",
                 "searchSortOption": "Asc",
                 "searchPaginationPageNumber": 2,
                 "searchPaginationCountElementPerPage": 5,
                 "searchLanguage": "Ru"
               }
       ), 1000);
       setTimeout(this.nextDiscount(
               {
                 "searchText": this.search,
                 "searchDiscountOption": "All",
                 "searchAddressCountry": "Украина",
                 "searchAddressCity": "Вінниця",
                 "searchSortFieldOption": "NameDiscount",
                 "searchSortOption": "Asc",
                 "searchPaginationPageNumber": 3,
                 "searchPaginationCountElementPerPage": 5,
                 "searchLanguage": "Ru"
               }
       ), 1000);
       console.log(this.$store.state.discounts)
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

