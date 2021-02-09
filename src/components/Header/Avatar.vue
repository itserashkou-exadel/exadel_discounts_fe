<template>
  <v-card>
    <v-list-item-content>
      <div class="mx-auto text-center">
        <v-avatar class="mb-2"
            color="primary"
        >
          <span class="white--text headline">{{ user.initials }}</span>
        </v-avatar>
        <h3>{{ user.fullName }}</h3>
        <p class="caption mt-1">
          {{ user.email }}
        </p>
        <v-divider class="my-3"></v-divider>
        <v-btn @click="$router.push({name: signIn})"
               rounded
               outlined
               color="primary"
        >
          {{$t('hLogOut')}}
        </v-btn>
      </div>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  name: "Avatar",
  data() {
    return {
      signIn: "sign",
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      }
    }
  }
}
</script>

<style scoped>

</style>
