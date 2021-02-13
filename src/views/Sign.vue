<template>
    <v-container class="d-flex align-center wrapper" fluid>
        <v-card width="500" class="mx-auto ">
            <v-card-text >
                <v-list-group eager>
                    <template v-slot:activator>
                        <v-list-item-title>{{$t('sChooseLocation')}}</v-list-item-title>
                    </template>

                    <!--            Первая группа            -->
                    <v-list-group no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Belarus</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item-group v-model="fictionalSelected">
                            <v-list-item v-bind:key="town" v-for="town in belarus" @click="redirectToIS4">
                                <v-list-item-title>{{ town }}</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                    <v-divider></v-divider>
                    <!--            Вторая группа            -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Ukraine</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in ukraine ">
                                <v-list-item-title >{{ town }}</v-list-item-title>
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
                </v-container>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import AuthService from '@/services/auth.service';
    import axios from 'axios';
    const auth = new AuthService();


    export default {
        name: 'Test2',
        data: () => ({
            belarus: ['Grodno', 'Minsk', 'Brest'],
            fictionalSelected: null,
            ukraine: ['Kiew'],
            realSelected: null,
        }),
        methods: {
            redirectToIS4(){
                console.log('You was redirected')
                this.$router.push('/identity')
            },
            login()
            {
                auth.login();
            },
            logout()
            {
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
