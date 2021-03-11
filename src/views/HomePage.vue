<template>
  <v-content class="ml-10 mr-10">
    <Table/>
  </v-content>
</template>

<script>

import Table from "@/components/Table";

export default {
  name: "HomePage",
  mounted() {
    // console.group('STATE')
    // console.log(this.$store.getters.getUserLocation)
    // console.groupEnd()
  },
  components: {
    Table
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Discounts';
      }
    },
  }
}
</script>


