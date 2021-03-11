<template>
  <v-card>
    <v-list-item-content>
      <div class="mx-auto text-center">
        <v-avatar class="mb-2" color="primary">
          <v-img v-if="user.pictureUri" :src="user.pictureUri" aspect-ratio="1.4" />
          <span v-else class="white--text headline">{{ user.initials }}</span>
        </v-avatar>
        <h3>{{ user.fullName }}</h3>
        <p class="caption mt-1">
          {{ user.mail }}
        </p>
        <v-btn color="primary mb-5" @click="goToProfile">
          {{ $t("hAccount") }}
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <v-btn @click="userLogOut" rounded outlined color="primary">
          {{ $t("hLogOut") }}
        </v-btn>
      </div>
    </v-list-item-content>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import token from "@/mixins/token.mixin"

export default {
  props: ["user"],
  
  name: "Avatar",
  mixins: [token],
  data() {
    return {
      signIn: "signWrapper"
    };
  },
  methods: {
    userLogOut() {
      localStorage.removeItem("key");
      sessionStorage.removeItem('currentComponent');
      sessionStorage.removeItem('userLanguage');
      const auth = this.getAuth;
      auth.logout();
    },
    goToProfile()
    {
      this.$emit('sideNavFromAvatar');
      this.$router.push({ name: 'profile' })
    }
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
};
</script>

<style scoped>
</style>
