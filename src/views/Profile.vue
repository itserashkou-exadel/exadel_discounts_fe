<template>
  <UserInfo v-bind:user="data" />
</template>

<script>
import UserInfo from '@/components/UserInfo';
import token from '@/mixins/token.mixin';
import axios from 'axios';

export default {
  name: 'Profile',
  components: { UserInfo },
  mixins: [token],
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getUserInfo() {
      const getUserInfo = () => {
        axios
          .get(`${process.env.VUE_APP_URL_SWAGGER}/api/v1/users/get`)
          .then((responce) => {
            this.data = responce.data;
          });
      };
      this.getToken(getUserInfo);
    },
  },
  mounted: function() {
    this.getUserInfo();
  },
  watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'User Profile';
            }
        },
  }

};
</script>

<style scoped>
</style>
