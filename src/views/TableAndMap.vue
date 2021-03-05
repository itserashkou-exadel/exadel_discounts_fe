<template>
  <div>

  </div>
</template>
<script>
  import HomePage from "./HomePage";
  import
  import {mapGetters} from 'vuex'
  export default {
    components: {HeadermMobile, Footer, Header},
    mixins: [token],
    computed: {
      ...mapGetters(['getAuth'])
    },

  }
</script>

<style>
  html { overflow-y: auto }
  /*h3 {*/
  /*  font-weight: normal;*/
  /*  text-transform: uppercase;*/
  /*}*/

  /*.v-btn__content {*/
  /*  font-weight: normal;*/
  /*}*/
</style>