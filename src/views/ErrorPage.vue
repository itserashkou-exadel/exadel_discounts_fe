<template>
  <v-container>
    <Error/>
    <div> hghgjhgjglkfjg
      fgfj
    </div>
  </v-container>
</template>

<script>

import Error from "@/components/Error.vue";

export default {
  components: {Error},
  name: 'ErrorPage',
  data() {
    return {
      errors: [
        {id: 1, text: 'Internal Server Error', route: '500', title: '500'},
        {id: 2, text: 'Bad Gateway', route: '502', title: '502'},
        {id: 3, text: "Sorry, we can't find this page", route: '404', title: '404'},
      ],
    }
  }
}
</script>

<style scoped>
.v-card__title {
  color: #40bfef;
  font-size: 7vw;
}
.v-card__text {
  font-size: 3vw;
}
</style>
