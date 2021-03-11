<template>
  <DataTable/>
</template>

<script>
import {mapGetters} from 'vuex'
import DataTable from "@/components/DataTable";

export default {
  name: "Statistic",
  components: {DataTable},
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Statistic';
      }
    },
  }


}
</script>

<style scoped>

</style>
