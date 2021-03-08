<template>
  <v-card>
    <v-list-item-content>
      <div class="mx-auto text-center">
        <v-avatar class="mb-2" color="primary">
          <img v-if="user.pictureUri" :src="user.pictureUri" alt="John" />
          <span v-else class="white--text headline">{{ user.initials }}</span>
        </v-avatar>
        <h3>{{ user.fullName }}</h3>
        <p class="caption mt-1">
          {{ user.email }}
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

export default {
  name: "Avatar",
  data() {
    return {
      signIn: "signWrapper",
      user: {
        initials: `${this.$store.getters.getUserClaims.name[0]}${this.$store.getters.getUserClaims.surname[0]}`,
        fullName: `${this.$store.getters.getUserClaims.name} ${this.$store.getters.getUserClaims.surname}`,
        email: `${this.$store.getters.getUserClaims.email}`,
        pictureUri: null
      },
    };
  },
  methods: {
    userLogOut() {
      localStorage.removeItem("key");
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
