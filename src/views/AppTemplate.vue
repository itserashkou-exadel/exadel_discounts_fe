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
<!--            <keep-alive>-->
                <router-view></router-view>
<!--            </keep-alive>-->
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
    import axios from 'axios';

    export default {
      components: {HeadermMobile, Footer, Header},
      mixins: [token],
      computed: {
        ...mapGetters(['getAuth'])
      },
      data() {
        return {
          userClaimsLocalData: [],
        }
      },
      methods: {
        ...mapMutations(['setUserClaims'])
      },
      async created() {
        const auth = this.$store.getters.getAuth;
        this.setSecondAuth(auth);
        const data = await this.$store.getters.getAuth.getUser();
        this.userClaimsLocalData = data;
        const getUserInfo = () => {
                    axios.get(`${process.env.VUE_APP_URL_SWAGGER}/api/v1/users/get`)
                    .then((responce) => {
                        this.setUserClaims({
                            name: responce.data.name,
                            surname: responce.data.surname,
                            role: data.profile.role,
                            mail: responce.data.mail,
                            language: responce.data.language,
                            photoUrl: responce.data.photoUrl,
                        })
                    });
                };
                this.getToken(getUserInfo);
        if (window.location.pathname !== '' && data === null) {
          this.$store.getters.getAuth.login()
        }
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
