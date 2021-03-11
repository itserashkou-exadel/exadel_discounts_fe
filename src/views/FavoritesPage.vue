<template>
  <v-content>
    <FavoritesMobile class="hidden-md-and-up"/>
    <Favorites class="hidden-sm-and-down ml-10 mr-10"/>
  </v-content>
</template>

<script>
import Favorites from "@/components/Favorites/Favorites";
import FavoritesMobile from "@/components/Favorites/FavoritesMobile";

export default {
  name: "FavoritesPage",
  components: {FavoritesMobile, Favorites},
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Favorites';
      }
    },
  }
}
</script>


