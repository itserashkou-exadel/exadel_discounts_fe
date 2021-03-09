<template>
    <v-app>
        <v-app-bar app
                   flat
                   dark
                   color="primary"
        >
            <HeadermMobile class="hidden-lg-and-up"/>
            <Header class="hidden-sm-and-down"/>
        </v-app-bar>
        <v-main>
                <router-view></router-view>
        </v-main>
        <v-footer absolute app flat color="primary">
            <Footer/>
        </v-footer>
    </v-app>
</template>
<script>
    import Header from "@/components/Header/Header";
    import Footer from "@/components/Footer";
    import HeadermMobile from "@/components/Header/HeaderMobile";
    import token from "@/mixins/token.mixin"
    import {mapGetters, mapMutations} from 'vuex'

    export default {
      components: {HeadermMobile, Footer, Header},
      mixins: [token],
      computed: {
        ...mapGetters(['getAuth'])
      },
      methods: {
        ...mapMutations(['setUserClaims'])
      },
      async created() {
        const auth = this.$store.getters.getAuth
        this.setSecondAuth(auth);
        const data = await this.$store.getters.getAuth.getUser();
        if (window.location.pathname !== '' && data === null) {
          this.$store.getters.getAuth.login()
        }
        this.setUserClaims({
          name: data.profile.name,
          surname: data.profile.surname,
          role: data.profile.role,
        })
        const localStorage = JSON.parse(window.localStorage.getItem('key'));
        this.$store.commit('setUserLocation', localStorage);
        this.setLanguage();
      }
    }

</script>

<style>
    html {
        overflow-y: auto
    }
    h3 {
        font-weight: normal;
        text-transform: uppercase;
    }
    .v-btn__content {
        font-weight: normal;
    }
</style>
