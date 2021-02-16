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
      ></v-text-field>
</template>

<script>

export default {
  name: "Searching",
  data: () => ({
    sideNav: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    drawer: false,
    searchClosed: true
  }),
   methods:  {
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

