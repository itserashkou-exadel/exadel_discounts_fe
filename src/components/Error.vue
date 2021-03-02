<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex justify-center mb-6 mt-12 pb-8">
        {{ error.title }}
      </v-card-title>
      <v-card-text class="d-flex justify-center mt-4 pt-5">
        {{ error.text }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
    },
  },
  name: "Error"
}
</script>

<style scoped>
.v-card__title {
  color: #1976d2;
  font-size: 7vw;
}
.v-card__text {
  font-size: 3vw;
}
</style>
