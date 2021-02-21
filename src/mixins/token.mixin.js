import AuthService from "@/services/auth.service";
import axios from "axios";
import {functionalThemeClasses} from "vuetify/lib/mixins/themeable";
import {mapGetters} from 'vuex'
const auth = new AuthService();
export default {
    data() {
        return {
            version: 1,
            langGl: 'ru'
        }
    },
    computed: {
        ...mapGetters(['allDiscounts'])
    },
    methods: {
        async getToken (func) {
            const authorizationHeader = 'Authorization';
            await auth.getAccessToken().then((userToken) => {
               axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
                func()
            });
        }
    }

}
