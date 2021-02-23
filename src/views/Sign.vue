<template>
    <v-container class="d-flex align-center wrapper" fluid>
        <v-card width="500" class="mx-auto ">
            <v-card-text>
                <v-list-group eager :value="true">
                    <template v-slot:activator>
                        <v-list-item-title>{{$t('sChooseLocation')}}</v-list-item-title>
                    </template>

                    <!--            Первая группа Belarus            -->
                    <v-list-group no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Belarus</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item-group v-model="fictionalSelected">
                            <v-list-item v-bind:key="town" v-for="town in belarus">
                                <v-list-item-title @click="redirectToMainPage(country = 'Belarus', town)">{{ town }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                    <v-divider></v-divider>
                    <!--            Вторая группа Ukraine           -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Ukraine</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in ukraine">
                                <v-list-item-title @click="redirectToMainPage(country = 'Ukraine', town)">{{ town }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                    <v-divider></v-divider>
                    <!--            Третья группа Lithuania           -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Lithuania</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in lithuania">
                                <v-list-item-title @click="redirectToMainPage(country = 'Lithuania', town)">{{ town }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                    <v-divider></v-divider>
                    <!--            Четвертая группа Russia           -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Russia</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in russia">
                                <v-list-item-title @click="redirectToMainPage(country = 'Russia', town)">{{ town }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                    <v-divider></v-divider>
                    <!--            Пятая группа Germany           -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Germany</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in germany">
                                <v-list-item-title @click="redirectToMainPage(country = 'Germany', town)">{{ town }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                    <v-divider></v-divider>
                    <!--            Шестая группа Uzbekistan           -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Uzbekistan</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in uzbekistan">
                                <v-list-item-title @click="redirectToMainPage(country = 'Uzbekistan', town)">{{ town
                                    }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>

                </v-list-group>
                <v-container class="d-flex justify-center">

                    <v-btn @click="login()">
                        <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                    </v-btn>
                    <v-btn @click="logout()">
                        <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                    </v-btn>
                    <v-btn @click="getProtectedApiData()">
                        <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                    </v-btn>
                    <v-btn @click="getUser">
                        123
                    </v-btn>
                </v-container>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import AuthService from '@/services/auth.service';
    import axios from 'axios';
    import {mapMutations} from 'vuex'

    const auth = new AuthService();


    export default {
        name: 'Test2',
        data: () => ({
            belarus: ['Grodno', 'Minsk', 'Brest', 'Vitebsk'],
            ukraine: ['Kyiw', 'Kharkiv', 'Lviv', 'Odesa', 'Vinnytsia'],
            lithuania: ['Klaipeda', 'Vilnius'],
            russia: ['Chelyabinsk', 'Ekaterinburg'],
            germany: ['Dresden'],
            poland: ['Warsaw', 'Bialystock', 'Szczecin', 'Poznan'],
            uzbekistan: ['Tashkent'],
            fictionalSelected: null,
            realSelected: null,
        }),
        methods: {
            ...mapMutations(['setUserLocation']),
            redirectToMainPage(country, town) {
                //this.getUser()
                //this.clickedLoc = town
                this.setUserLocation({
                    country: country,
                    town: town
                })

                console.log('User location is: ', this.$store.getters.getUserLocation)
                //this.$router.push('/home')
            },
            login() {
                auth.login();
            },
            logout() {
                auth.logout();
            },
            getUser() {
                const userClaims = auth.getUser();
                console.log(userClaims)
            },
            getProtectedApiData() {

                const authorizationHeader = 'Authorization';
                auth.getAccessToken().then((userToken) => {
                    axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;

                    axios.get('https://localhost:9001/api/v1/tags/get/%D0%BA')
                        .then((response) => {
                            this.dataEventRecordsItems = response.data;
                        })
                        .catch((error) => {
                            alert(error);
                        });
                });

            },
            setUserLocationAfterLogin() {

            }
        },
    };
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        background: #40BDED;
    }
</style>
