<template>
    <div>
        <v-container v-if="signFormToggle" class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto ">
                <v-card-title :class="{'titleNone' : this.$store.state.userLocation.length === 0 }">Your city is:
                    {{this.$store.state.userLocation.town}}
                </v-card-title>
                <v-card-text>
                    <ChooseOfTown
                            v-on:selectedCountryForObj="getUserCounty"
                            v-on:selectedCityForObj="getUserCity"
                            class="mt-10"
                    />
                    <v-container
                            class="d-flex justify-center mb-5"
                    >
                        <v-btn @click="this.setUserLocAndLocalStorage"
                               :disabled="this.selectedCountry && this.selectedCity === ''"
                               block
                               color="primary"
                        >
                            Login
                        </v-btn>

<!--                        <v-btn @click="logout()">-->
<!--                            Logout-->
<!--                        </v-btn>-->

<!--                        <v-btn @click="deleteLocalStorage">Clear Local Storage!</v-btn>-->

                    </v-container>

                </v-card-text>
            </v-card>
        </v-container>
        <v-container v-else class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto">
                <v-card-text>
                    {{$t('sChooseLocation')}}
                </v-card-text>
                <v-container class="d-flex justify-center align-center">
                    <v-btn @click="backToSelectTown" color="primary">Change Location</v-btn>
                </v-container>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="9">
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-select
                                    item-value="ru"
                                    v-model="language"
                                    :items="items"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import AuthService from '@/services/auth.service';
    import {mapMutations, mapActions} from 'vuex'
    import ChooseOfTown from "@/components/ChooseOfTown";
    import token from '@/mixins/token.mixin'

    const auth = new AuthService();

    export default {
        name: 'Sign',
        components: {ChooseOfTown},
        data: () => ({
            language: 'ru',
            items: ['ru', 'en'],
            selectedCountry: '',
            selectedCity: '',
            signFormToggle: false,

        }),
        methods: {
            ...mapMutations(['setUserLocation', 'setLanguage']),
            setUserLocAndLocalStorage() {
                this.setUserLocation({
                    country: this.selectedCountry,
                    town: this.selectedCity
                })

                const userLoc = this.$store.getters.getUserLocation
                localStorage.setItem('key', JSON.stringify(userLoc))
                console.group('User data')
                console.log('User location in VueX store: ', this.$store.getters.getUserLocation)
                console.groupEnd()
                this.$router.push('/home')
            },
            login() {
                auth.login();
            },
            logout() {
                auth.logout();
            },
            // getProtectedApiData() {
            //     const authorizationHeader = 'Authorization';
            //     auth.getAccessToken().then((userToken) => {
            //         axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
            //
            //         axios.get('https://localhost:9001/api/v1/tags/get/%D0%BA')
            //             .then((response) => {
            //                 this.dataEventRecordsItems = response.data;
            //             })
            //             .catch((error) => {
            //                 alert(error);
            //             });
            //     });
            // },
            deleteLocalStorage() {
                localStorage.clear()
                this.signFormToggle = false
                this.$store.state.userLocation = []
                console.log('User Location: ', this.$store.state.userLocation)
            },
            backToSelectTown() {
                this.signFormToggle = true
            },
            getUserCounty(country) {
                this.selectedCountry = country
            },
            getUserCity(city) {
                this.selectedCity = city
            },
            ...mapActions(['goFetchForCountries'])
        },
        mixins: [token],
        mounted() {
            const getCountries = () => {
                let languageForCountries = (this.$i18n.locale === 'ru' ? 'Ru' : 'En');
                //Берем списаок стран с бэка и оложим в стор
                this.goFetchForCountries(`https://localhost:9001/api/v1/addresses/all/${languageForCountries}/countries`);}
            this.getToken(getCountries)

        },
        watch: {
            language() {
                console.log(this.language)
                if (this.language === 'ru') {
                    this.setLanguage(true);
                    import(`../langs/ru.json`).then((msg) => {
                        this.$i18n.setLocaleMessage('ru', msg);
                        this.$i18n.locale = 'ru';
                    })
                } else {
                    this.setLanguage(false);
                    import(`../langs/en.json`).then((msg) => {
                        this.$i18n.setLocaleMessage('en', msg);
                        this.$i18n.locale = 'en';
                    })
                }
            }
        },
    };
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        background: #40BDED;
    }

    .loginDisabled {
        /*display: none;*/
    }

    .titleNone {
        display: none;
    }
</style>
