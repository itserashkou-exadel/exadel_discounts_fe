<template>
    <div>
        <v-btn
                color="primary"
                dark
                @click="drawer = !drawer"
                class="ml-13 mt-2"
                v-bind:class="{'btnShowMenu': drawer}"
        >
            Show menu
        </v-btn>
        <div >
            <v-navigation-drawer
                    fixed
                    v-model="drawer"
                    class="navDrawer mt-10"
            >
                <v-btn
                        color="primary"
                        dark
                        class="mapMenuToggleBtn mt-8 mb-2"
                        @click="drawer = !drawer"
                >
                    Hide menu
                </v-btn>
                <v-divider></v-divider>
                <v-expansion-panels class="d-flex mx-auto">
                    <v-expansion-panel
                            v-for="(item,i) in markersData"
                            :key="i"
                            @click="jumpToMarker([item.address.location.latitude, item.address.location.longitude])"
                    >
                        <v-expansion-panel-header>
                            {{item.name}}
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>{{item.company.description}}</v-expansion-panel-content>
                        <v-expansion-panel-content>{{item.address.street}}</v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeftSideBar",
        props: ['markersData', 'jumpToMarker'],
        data() {
            return {
                something: 0,
                drawer: false,
                items: [
                    {title: 'Home', icon: 'mdi-home-city'},
                    // {title: 'My Account', icon: 'mdi-account'},
                    // {title: 'Users', icon: 'mdi-account-group-outline'},
                ],
                // fakeDataPoints2: [
                //     {
                //         id: '1',
                //         name: 'Burger King 1',
                //         description: 'Отличное место, чтио бы быстро покушать',
                //         address: 'Сурганова 5',
                //         coordinates: [27.554179, 53.906461],
                //         icon: 'mdi-home-city'
                //     },
                //     {
                //         id: 2,
                //         name: 'Burger King 2',
                //         description: 'Здесь лучшие бургеры',
                //         address: 'Маяковского 15/2',
                //         coordinates: [27.496666, 53.912810],
                //         icon: 'mdi-home-city'
                //     },
                //     {
                //         id: 3,
                //         name: 'Burger King 3',
                //         description: 'Ууууу луковые колечки',
                //         address: 'Победы 34',
                //         coordinates: [27.594500, 53.927107],
                //         icon: 'mdi-home-city'
                //     },
                //     {
                //         id: 4,
                //         name: 'Burger King 4',
                //         description: 'Комбо за 30 рублей на двоих',
                //         address: 'Дзержинского 5',
                //         coordinates: [27.509685, 53.929633],
                //         icon: 'mdi-home-city'
                //     },
                //     {
                //         id: 5,
                //         name: 'Burger King 5',
                //         description: 'Лучшее место что бы попить колы',
                //         address: 'Брикеля 8',
                //         coordinates: [27.588133, 53.933288],
                //         icon: 'mdi-home-city'
                //     },
                // ]
            }
        },
        methods: {
            test() {
                console.log('TEST!')
            },
            mouseOverMethod() {
                // this.drawer = !this.drawer;
                // this.something += 1;
                // console.log('Mouse Over !!!', this.drawer)
            }
        },
    }
</script>

<style scoped>
    .mapMenuToggleBtn {
        margin-left: 60px;
    }
    .btnShowMenu{
        visibility: hidden;
    }

    .navDrawer {
        border-radius: 3px;
    }
</style>
