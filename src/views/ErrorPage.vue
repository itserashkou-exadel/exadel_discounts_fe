<template>
  <v-content>
    <Error :error="errors[code]"/>
  </v-content>
</template>

<script>

import Error from "@/components/Error";

export default {
  components: {Error},
  name: 'ErrorPage',
  props: {
    code: {
      type: Number,
    },
  },
  data() {
    return {
      errors: {
        500: {text: 'Internal Server Error', title: '500'},
        502: {text: 'Bad Gateway', title: '502'},
        404: {text: "Sorry, we can't find this page", title: '404'},
      },
    }
  }
}
</script>

<style scoped>

</style>
