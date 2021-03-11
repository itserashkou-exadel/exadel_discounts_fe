<template>
    <v-app>
        <v-app-bar app
                   flat
                   dark
                   color="primary"
        >
            <HeadermMobile class="hidden-lg-and-up"
                           v-bind:user="user"
            />
            <Header class="hidden-sm-and-down"
                    v-bind:user="user"
            />
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
    import axios from 'axios';

    export default {
      components: {HeadermMobile, Footer, Header},
      data () {
        return {
          user: {
            initials: null,
            fullName: null,
            mail: null,
            pictureUri: null
          },
        }
      },
      mixins: [token],
      computed: {
        ...mapGetters(['getAuth'])
      },
      methods: {
        ...mapMutations(['setUserClaims'])
      },
      async created() {
        const auth = this.$store.getters.getAuth;
        this.setSecondAuth(auth);
        const data = await this.$store.getters.getAuth.getUser();
        if (window.location.pathname !== '' && data === null) {
          this.$store.getters.getAuth.login()
        }
       // this.userClaimsLocalData = data;
        const localStorage = JSON.parse(window.localStorage.getItem('key'));
        this.$store.commit('setUserLocation', localStorage);
        this.setLanguage();

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
              })
              .then(() => {
                this.user.initials = `${this.$store.getters.getUserClaims.name.charAt(0)}${this.$store.getters.getUserClaims.surname.charAt(0)}`;
                this.user.fullName = `${this.$store.getters.getUserClaims.name} ${this.$store.getters.getUserClaims.surname}`;
                this.user.mail = `${this.$store.getters.getUserClaims.mail}`;
                this.user.pictureUri = `${this.$store.getters.getUserClaims.photoUrl}`;
              })
        };
        await this.getToken(getUserInfo);
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
