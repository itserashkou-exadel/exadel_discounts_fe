<template>
  <v-app-bar color="primary" flat>
    <router-link :to="{name:'home'}">
      <v-btn text
             @click="seeCurrentComponent({text:'СКИДКИ'})">
        <v-toolbar-title class="headline mr-6">
        <span class="text--accent-4"
              color="blue lighten-5">Crazy</span>
          <span class="font-weight-light"
                color="blue lighten-5">Price</span>
        </v-toolbar-title>
      </v-btn>
    </router-link>
    <v-toolbar-items v-for="(item, i) in headerButtons()"
                     :key="i"
                     @click="seeCurrentComponent(item)"
    >
      <HeaderButton v-bind:headerButton="item"
                    v-slot:extension
      />
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn text class="font-weight-light"
           @click="changeUserLoc">
      <span class="loc">{{ currentLoc.country }}, {{ currentLoc.town }}</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <Searching/>
    <v-spacer></v-spacer>
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
            icon
            x-large
            v-on="on"
        >
          <v-avatar
              color="#2196f3"
              size="48"
          >
            <v-img v-if="user.pictureUri" :src="user.pictureUri" aspect-ratio="1.4"/>
            <span v-else class="white--text headline">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <Avatar v-bind:user="user"/>
    </v-menu>
  </v-app-bar>
</template>

<script>
import HeaderButton from "@/components/Header/HeaderButton";
import Avatar from "@/components/Header/Avatar";
import Searching from "@/components/Header/Searching";
import {mapGetters, mapActions, mapMutations} from "vuex"
import axios from "axios";
import token from '@/mixins/token.mixin'

export default {
  name: "Header",
  components: {Searching, Avatar, HeaderButton},
  mixins: [token],
  props: ['user'],
  data() {
    const loc = JSON.parse(localStorage.getItem('key'));
    return {
      signIn: "sign",
      currentLoc: {
        country: loc.country,
        town: loc.town
      }
    }
  },
  methods: {
    ...mapActions(['goForCurrentComponent']),
    ...mapMutations(['setUserClaims']),
    seeCurrentComponent (item) {
      if (item.text === 'СКИДКИ' || item.text ==='DISCOUNTS') {
        this.goForCurrentComponent('HomePage');
        sessionStorage.setItem('currentComponent', 'HomePage')
      }
      if (item.text === 'КАРТА' || item.text ==='MAP') {
        this.goForCurrentComponent('MapPage')
        sessionStorage.setItem('currentComponent', 'MapPage')
      }
      if (item.text === 'ПОДПИСКИ' || item.text ==='SUBSCRIBE') {
        this.goForCurrentComponent('SubscribesPage')
        sessionStorage.setItem('currentComponent', 'SubscribesPage')
      }
      if (item.text === 'ИЗБРАННОЕ' || item.text ==='FAVORITES') {
        this.goForCurrentComponent('FavoritesPage')
        sessionStorage.setItem('currentComponent', 'FavoritesPage')
      }
      if (item.text === 'СТАТИСТИКА' || item.text ==='STATISTICS') {
        this.goForCurrentComponent('StatisticPage')
        sessionStorage.setItem('currentComponent', 'StatisticPage')
      }
      if (item.text === '' || item.text ==='STATISTICS') {
        this.goForCurrentComponent('StatisticPage')
        sessionStorage.setItem('currentComponent', 'StatisticPage')
      }
    },
    headerButtons() {
      let hButtons = [
        {id: 2, text: this.$t('hDiscounts'), route: "home", icon: "mdi-clipboard-text"},
        {id: 1, text: this.$t('hMap'), route: "map", icon: "mdi-map-search-outline"},
        {id: 3, text: this.$t('hSubscribe'), route: "subscriptions", icon: "mdi-tag"},
        {id: 4, text: this.$t('hFavorites'), route: "favorites", icon: "mdi-star"},
      ]
      if (this.$store.getters.getUserClaims.role === "Administrator") {
        hButtons.push({id: 5, text: this.$t('hStatistic'), route: "statistic", icon: "mdi-sort-descending"})
      }
      return hButtons
    },
    changeUserLoc() {
      localStorage.removeItem('key')
      sessionStorage.removeItem('currentComponent')
      this.$router.push('/location')
    },
  },
  computed: {
    ...mapGetters(['getUserClaims']),
  }
}
</script>

<style scoped>
.loc {
  font-size: smaller;
}
</style>

