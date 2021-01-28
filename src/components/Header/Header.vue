<template>
  <v-app-bar color="primary" flat
  >
    <v-toolbar-title class="headline text-uppercase">
        <span class="text--accent-4"
              color="blue lighten-5">Crazy</span>
      <span class="font-weight-light"
            color="blue lighten-5">Price</span>
    </v-toolbar-title>
    <v-toolbar-items v-for="(item, i) in headerButtons"
                     :key="i">
      <HeaderButton v-bind:headerButton="item"
      />
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn value="nearby"
           icon>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <Searching/>
    <v-row justify="end">
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
                color="blue lighten-4"
                size="48"
            >
              <span class="white--text headline">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
       <Avatar/>
      </v-menu>
    </v-row>
  </v-app-bar>
</template>

<script>
import HeaderButton from "@/components/Header/HeaderButton";
import Avatar from "@/components/Header/Avatar";
import Searching from "@/components/Header/Searching";

export default {
  name: "Header",
  components: {Searching, Avatar, HeaderButton},
  data() {
    return {
      headerButtons: [
        {id: 1, text: "Карта", route: "map", icon: "mdi-map-search-outline"},
        {id: 2, text: "Скидки", route: "home", icon: "mdi-clipboard-text"},
        {id: 3, text: "Подписки", route: "subscriptions", icon: "mdi-tag"},
        {id: 4, text: "Избранное", route: "favorites", icon: "mdi-star"},
      ],
      signIn: "sign",
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }
  }
}
</script>
