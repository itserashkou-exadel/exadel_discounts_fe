<template>
  <v-app-bar color="primary"
             flat
             app
             fixed
  >
    <!-- dropdown menu -->
    <v-row align="center">
      <v-col cols="2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon class="mr-6"
                                text
                                v-on="on"
                                v-bind="attrs"
                                @click.stop="sideNav = !sideNav">
            </v-app-bar-nav-icon>
          </template>
          <v-dialog
              v-model="sideNav"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition 10s"
          >
            <v-card>
              <v-toolbar
                  dark
                  color="primary"
              >
                <v-btn class="ml-2"
                       icon
                       dark
                       @click="sideNav = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <router-link to="/home">
                  <v-btn text>
                    <v-toolbar-title class="headline text-uppercase mr-6">
        <span class="text--accent-4"
              color="blue lighten-5">Crazy</span>
                      <span class="font-weight-light"
                            color="blue lighten-5">Price</span>
                    </v-toolbar-title>
                  </v-btn>
                </router-link>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
              </v-toolbar>
              <v-list
                  three-line
                  subheader
              >
                <v-list-item v-for="link in links()" :key="link.text" router :to="{name:link.route}"
                             @click="sideNav= false">
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item>
                <v-btn text>
                  <v-icon @click="changeUserLoc">mdi-map-marker</v-icon>
                  <span>{{currentLoc.country}}, {{currentLoc.town}}</span>
                </v-btn>
                <Avatar/>
              </v-list>
            </v-card>
          </v-dialog>
        </v-menu>
      </v-col>
      <v-col>
        <v-toolbar-title>
          <span class="font-weight-light">Crazy</span>
          <span>Price</span>
        </v-toolbar-title>
      </v-col>
      <v-col>
        <Searching/>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import Avatar from "@/components/Header/Avatar";
import Searching from "@/components/Header/Searching";
export default {
  name: "Header_mobile",
  components: {Searching, Avatar},
  methods: {
    links() {
      let hLinks = [
        {id: 2, text: this.$t('hDiscounts'), route: "home", icon: "mdi-clipboard-text"},
        {id: 1, text: this.$t('hMap'), route: "map", icon: "mdi-map-search-outline"},
        {id: 3, text: this.$t('hSubscribe'), route: "subscriptions", icon: "mdi-tag"},
        {id: 4, text: this.$t('hFavorites'), route: "favorites", icon: "mdi-star"},
      ]
      if (this.$store.getters.getUserClaims.role === "Administrator") {
        hLinks.push({id: 5, text: this.$t('hStatistic'), route: "statistic", icon: "mdi-sort-descending"})
      }
      return hLinks
    },
    changeUserLoc() {
      localStorage.removeItem('key')
      this.$router.push('/location')
    },
  },
  data() {
    const loc = JSON.parse(localStorage.getItem('key'));
    return {
      sideNav: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      drawer: false,
      searchClosed: true,
      currentLoc: {
        country: loc.country,
        town: loc.town
      }
    }
  }
}
</script>

<style lang="sass">
.expanding-search
  transition: max-width 0.8s
  .v-input__slot
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
  .v-app-bar__nav-icon
    margin-left: -24px
</style>