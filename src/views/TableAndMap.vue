<template>
    <keep-alive>
        <component v-bind:is="$store.getters.getCurrentComponent"></component>
    </keep-alive>
</template>
<script>
  import HomePage from "@/views/HomePage";
  import MapPage from "@/views/MapPage";
  import FavoritesPage from "@/views/FavoritesPage.vue"
  import SubscribesPage from "@/views/SubscriptionsPage.vue"
  import StatisticPage from "@/views/StatisticPage.vue"


  export default {
    name: 'TableAndMap',
    components: {MapPage, HomePage, FavoritesPage, SubscribesPage, StatisticPage},
  }
</script>

<style>

</style>