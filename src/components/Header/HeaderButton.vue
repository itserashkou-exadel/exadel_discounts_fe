<template>

  <v-btn class="font-weight-light" text
         @click="$router.push({name:headerButton.route})"
  >
    <div class="flex-column">
    <div>
        <v-icon> {{ headerButton.icon }}</v-icon>
    </div>
    <div>{{ headerButton.text }}</div>
    </div>
  </v-btn>


</template>

<script>
export default {
  props: {
    headerButton: {
      type: Object,
    }
  },
  name: "HeaderButton"
}

</script>

<style scoped>

</style>
