import AuthService from "@/services/auth.service";
import axios from "axios";
import {functionalThemeClasses} from "vuetify/lib/mixins/themeable";
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            version: 1,
            langGl: 'ru'
        }
    },
    computed: {
        ...mapGetters(['allDiscounts']),
        myF: function () {
            let a = this.$i18n.locale;
            console.log(a);
        }
    },
    methods: {
        async getToken (func) {
            const auth = this.$store.getters.getAuth;
         //   console.log(auth);
            const authorizationHeader = 'Authorization';
            await auth.getAccessToken().then((userToken) => {
               axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
                func()
            });
        },
        getCountries () {
            const getCountries = () => {
            this.goFetchForCountries(`https://localhost:9001/api/v1/addresses/all/${this.$store.getters.language}/countries`)}
            this.getToken(getCountries)
        }
    }

}
