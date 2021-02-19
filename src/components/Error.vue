<template>
    <v-content>
      <v-card flat v-for="(item, i) in errors"
              :key="i">
        <v-card-title class="d-flex justify-center mb-6 mt-4 pb-8">{{ item.title }}</v-card-title>
        <v-card-text class="d-flex justify-center mt-4 pt-5">{{ item.text }}
          <div>htjgfrjkjglkrjflkfldksfsdkflkdklh</div>
        </v-card-text>
      </v-card>
    </v-content>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
    },
  },
  name: "Error"
}
</script>

<style scoped>

</style>
