<template>
    <div>
        <v-container v-if="signFormToggle" class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto ">
                <v-card-title :class="{'titleNone' : this.$store.state.userLocation.length === 0 }">Your city is:
                    {{this.$store.state.userLocation.town}}
                </v-card-title>
                <v-card-text>
                    <ChooseOfTown/>
<!--                    <v-list-group eager :value="true">-->
<!--                        <template v-slot:activator>-->
<!--                            <v-list-item-title>{{$t('sChooseLocation')}}</v-list-item-title>-->
<!--                        </template>-->

                        <!--            Первая группа Belarus            -->
                        <!--                        <v-list-group no-action sub-group v-for="country in countriesAndCities()">-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>{{country.Беларусь}}</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->

                        <!--                            <v-list-item-group v-model="fictionalSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in country">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = country, town)">{{-->
                        <!--                                        town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        <v-divider></v-divider>-->
                        <!--            Вторая группа Ukraine           -->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>Ukraine</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in ukraine">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Ukraine', town)">{{-->
                        <!--                                        town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        <v-divider></v-divider>-->
                        <!--                        &lt;!&ndash;            Третья группа Lithuania           &ndash;&gt;-->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>Lithuania</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in lithuania">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Lithuania', town)">-->
                        <!--                                        {{ town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        <v-divider></v-divider>-->
                        <!--                        &lt;!&ndash;            Четвертая группа Russia           &ndash;&gt;-->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>Russia</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in russia">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Russia', town)">{{-->
                        <!--                                        town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        <v-divider></v-divider>-->
                        <!--                        &lt;!&ndash;            Пятая группа Germany           &ndash;&gt;-->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>Germany</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in germany">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Germany', town)">{{-->
                        <!--                                        town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        <v-divider></v-divider>-->
                        <!--                        &lt;!&ndash;            Шестая группа Uzbekistan           &ndash;&gt;-->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>Uzbekistan</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in uzbekistan">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Uzbekistan', town)">-->
                        <!--                                        {{ town-->
                        <!--                                        }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

                        <!--                        &lt;!&ndash;            Седьмая группа USA           &ndash;&gt;-->
                        <!--                        <v-list-group sub-group no-action>-->
                        <!--                            <template v-slot:activator>-->
                        <!--                                <v-list-item-content>-->
                        <!--                                    <v-list-item-title>USA</v-list-item-title>-->
                        <!--                                </v-list-item-content>-->
                        <!--                            </template>-->
                        <!--                            <v-list-item-group v-model="realSelected">-->
                        <!--                                <v-list-item v-bind:key="town" v-for="town in usa">-->
                        <!--                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'USA', town)">-->
                        <!--                                        {{ town }}-->
                        <!--                                    </v-list-item-title>-->
                        <!--                                </v-list-item>-->
                        <!--                            </v-list-item-group>-->
                        <!--                        </v-list-group>-->

<!--                    </v-list-group>-->
                    <v-container class="d-flex justify-center">

                        <v-btn @click="login()">
<!--                               :disabled="this.$store.state.userLocation.length === 0"-->
<!--                        >-->
                            Login
                            <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                        </v-btn>

                        <v-btn @click="logout()">
                            Logout
                            <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                        </v-btn>

                        <!--                        <v-btn @click="getProtectedApiData()">-->
                        <!--                            &lt;!&ndash; <router-link to="/home">{{$t('sLogIn')}}</router-link> &ndash;&gt;-->
                        <!--                        </v-btn>-->

                        <v-btn @click="deleteLocalStorage">Clear Local Storage!</v-btn>

                    </v-container>

                </v-card-text>
            </v-card>
        </v-container>
        <v-container v-else class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto">
                <v-card-title>Your location is: {{this.$store.state.userLocation.town}}</v-card-title>
                <v-card-text>
                    {{$t('sChooseLocation')}}
                </v-card-text>
                <v-container class="d-flex justify-center align-center">
                    <v-btn @click="backToSelectTown">Change Location</v-btn>
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
            // belarus: ['Grodno', 'Minsk', 'Brest', 'Vitebsk'],
            // ukraine: ['Kyiw', 'Kharkiv', 'Lviv', 'Odesa', 'Vinnytsia'],
            // lithuania: ['Klaipeda', 'Vilnius'],
            // russia: ['Chelyabinsk', 'Ekaterinburg'],
            // germany: ['Dresden'],
            // poland: ['Warsaw', 'Bialystock', 'Szczecin', 'Poznan'],
            // uzbekistan: ['Tashkent'],
            // usa: ['Walnut Creek', 'Boulder'],
            fictionalSelected: null,
            realSelected: null,
            signFormToggle: false,
        }),
        methods: {
            countriesAndCities() {
                if (this.$i18n.locale === 'ru') {
                    return
                    [["Гродно", "Минск", "Брест", "Витебск"],
                        ["Киев", "Харьков", "Львов", "Одесса", "Винница"]]
                }
                // if (this.$i18n.locale === 'en') {
                //     return {
                //         belarus: ['Grodno', 'Minsk', 'Brest', 'Vitebsk'],
                //         ukraine: ['Kyiw', 'Kharkiv', 'Lviv', 'Odesa', 'Vinnytsia'],
                //     }
                // }
            },
            ...mapMutations(['setUserLocation', 'setLanguage']),
            setUserLocAndLocalStorage(country, town) {
                this.setUserLocation({
                    country: country,
                    town: town
                })

                const userLoc = this.$store.getters.getUserLocation
                console.log(userLoc)
                localStorage.setItem('key', JSON.stringify(userLoc))
                console.group('User data')
                console.log('User location in VueX store: ', this.$store.getters.getUserLocation)
                //console.log('User state data is: ', this.$store.getters.getUserClaims)
                console.groupEnd()
                //this.$router.push('/home')
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
            ...mapActions(['goFetchForCountries'])
        },
        mixins: [token],
        mounted() {
            this.goFetchForCountries(`https://localhost:9001/api/v1/addresses/all/ru/countries`)

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
