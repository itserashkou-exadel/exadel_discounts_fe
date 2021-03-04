<template>
  <router-link :to="{name:headerButton.route}" class="nav-links" active-class="router-link-active">
  <v-btn class="font-weight-light"
         text>
    <div class="flex-column">
    <div>
        <v-icon> {{ headerButton.icon }}</v-icon>
    </div>
    <div>{{ headerButton.text }}</div>
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
/*.font-weight-light {*/
/*  font-weight: lighter !important;*/
/*}*/
</style>
