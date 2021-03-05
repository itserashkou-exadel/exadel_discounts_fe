<template>
  <router-link :to="{name:headerButton.route}" class="nav-links" active-class="router-link-active">
  <v-btn
         text>
    <div class="flex-column">
    <div>
        <v-icon> {{ headerButton.icon }}</v-icon>
    </div>
    <div class="header-button">{{ headerButton.text }}</div>
    </div>
  </v-btn>
  </router-link>
</template>

<script>
export default {
  props: {
    headerButton: {
      type: Object,
    }
  },
  name: "HeaderButton"
}

</script>

<style scoped>
.router-link-active
{
  background-color: #2196f3;
  cursor: pointer;
  text-decoration: none;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 67px;
}
.header-button {
  font-weight: lighter !important;
}
</style>
