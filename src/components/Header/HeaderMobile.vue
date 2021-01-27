<template>
  <v-toolbar color="primary"
             flat
  >
    <!-- dropdown menu -->
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
            <v-toolbar-title>
              <span class="font-weight-light">Crazy</span>
              <span>Price</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <v-list
              three-line
              subheader
          >
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route"
                         @click="sideNav= false">
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
            <v-btn value="nearby"
                   icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <Avatar/>
          </v-list>
        </v-card>
      </v-dialog>
    </v-menu>
    <v-toolbar-title>
      <span class="font-weight-light">Crazy</span>
      <span>Price</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="expanding-search mt-4"
        :class="{'closed' : searchClosed}"
        filled
        dense
        chips
        color="blue lighten-5"
        multiple
    ></v-text-field>

  </v-toolbar>
</template>

<script>
import Avatar from "@/components/Header/Avatar";

export default {
  name: "Header_mobile",
  components: {Avatar},
  data: () => ({
    sideNav: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    drawer: false,
    links: [
      {id: 1, text: "КАРТА", route: "map", icon: "mdi-map-search-outline"},
      {id: 2, text: "СКИДКИ", route: "home", icon: "mdi-clipboard-text"},
      {id: 3, text: "ПОДПИСКИ", route: "subscriptions", icon: "mdi-tag"},
      {id: 4, text: "ИЗБРАННОЕ", route: "favorites", icon: "mdi-star"},
    ],
    searchClosed: true,

  })
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
