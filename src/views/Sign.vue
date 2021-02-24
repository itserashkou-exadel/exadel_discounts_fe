<template>
    <div>
        <v-container v-if="signFormToggle"  class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto ">
                <v-card-title>Your city is: {{this.$store.state.userLocation.town}}</v-card-title>
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Belarus', town)">{{
                                        town }}
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Ukraine', town)">{{
                                        town }}
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Lithuania', town)">
                                        {{ town }}
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Russia', town)">{{
                                        town }}
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Germany', town)">{{
                                        town }}
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
                                    <v-list-item-title @click="setUserLocAndLocalStorage(country = 'Uzbekistan', town)">
                                        {{ town
                                        }}
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list-group>

                    </v-list-group>
                    <v-container class="d-flex justify-center">

                        <v-btn @click="login()" :class="{'loginDisabled' : this.$store.state.userLocation.length === 0 }">
                            <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                            Login In
                        </v-btn>
                        <v-btn @click="logout()">
                            <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                        </v-btn>
                        <v-btn @click="getProtectedApiData()">
                            <!-- <router-link to="/home">{{$t('sLogIn')}}</router-link> -->
                        </v-btn>
                        <v-btn @click="deleteLocalStorage">Kick</v-btn>

                    </v-container>

                </v-card-text>
            </v-card>
        </v-container>
        <v-container v-else class="d-flex align-center wrapper" fluid>
            <v-card width="500" class="mx-auto">
                <v-card-title>Your location is:</v-card-title>
                <v-card-subtitle @click="">{{this.$store.state.userLocation}}</v-card-subtitle>
                <v-btn @click="backToSelectTown">Select city</v-btn>
                <v-card-text></v-card-text>
            </v-card>
        </v-container>
    </div>
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
            signFormToggle: false
        }),
        methods: {
            ...mapMutations(['setUserLocation']),
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
                console.log('User state data is: ', this.$store.getters.getUserClaims)
                console.groupEnd()
                //this.$router.push('/home')
            },
            login() {
                auth.login();
            },
            logout() {
                auth.logout();
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
            deleteLocalStorage() {
                localStorage.clear()
                this.signFormToggle = false
                this.$store.state.userLocation = []
            },
            backToSelectTown() {
                this.signFormToggle = true
            },
        },
        computed:{
            userLocWatcher(){
                if (this.$store.state.userLocation.length === 0){

                }
            }
        }
    };
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        background: #40BDED;
    }
    .loginDisabled{
        display: none;

    }
</style>
