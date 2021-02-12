<template>
    <v-card>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                permanent
        >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>John Doe</v-list-item-title>

                <v-btn
                        icon
                        @click.stop="mini = !mini"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-expansion-panels class="d-flex mx-auto">
                <v-expansion-panel
                        v-for="(item,i) in fakeDataPoints2"
                        :key="i"
                >
                    <v-expansion-panel-header >{{item.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>{{item.description}}</v-expansion-panel-content>
                    <v-expansion-panel-content>{{item.address}}</v-expansion-panel-content>
<!--                    <v-btn class="primary  d-flex mx-auto my-5"> Accept</v-btn>-->
                </v-expansion-panel>
            </v-expansion-panels>


            <!--            <v-list dense>-->
            <!--                <v-list-item-->
            <!--                        v-for="item in fakeDataPoints2"-->
            <!--                        :key="item.id"-->
            <!--                        link-->
            <!--                >-->

            <!--                    <v-list-item-icon>-->
            <!--                        <v-icon>{{ item.name }}</v-icon>-->
            <!--                    </v-list-item-icon>-->

            <!--                    <v-list-item-content>-->
            <!--                        <v-list-item-title>{{ item.description }}</v-list-item-title>-->
            <!--                    </v-list-item-content>-->
            <!--                </v-list-item>-->
            <!--            </v-list>-->
        </v-navigation-drawer>
    </v-card>
</template>

<script>

    export default {
        name: "LeftSideBar",
        data() {
            return {
                drawer: true,
                items: [
                    {title: 'Home', icon: 'mdi-home-city'},
                    {title: 'My Account', icon: 'mdi-account'},
                    {title: 'Users', icon: 'mdi-account-group-outline'},
                ],
                mini: false,
                fakeDataPoints2: [
                    {
                        id: '1',
                        name: 'Burger King 1',
                        description: 'Отличное место, чтио бы быстро покушать',
                        address: 'Сурганова 5',
                        coordinates: [27.554179, 53.906461],
                        icon: 'mdi-home-city'
                    },
                    {
                        id: 2,
                        name: 'Burger King 2',
                        description: 'Здесь лучшие бургеры',
                        address: 'Маяковского 15/2',
                        coordinates: [27.496666, 53.912810],
                        icon: 'mdi-home-city'
                    },
                    {
                        id: 3,
                        name: 'Burger King 3',
                        description: 'Ууууу луковые колечки',
                        address: 'Победы 34',
                        coordinates: [27.594500, 53.927107],
                        icon: 'mdi-home-city'
                    },
                    {
                        id: 4,
                        name: 'Burger King 4',
                        description: 'Комбо за 30 рублей на двоих',
                        address: 'Дзержинского 5',
                        coordinates: [27.509685, 53.929633],
                        icon: 'mdi-home-city'
                    },
                    {
                        id: 5,
                        name: 'Burger King 5',
                        description: 'Лучшее место что бы попить колы',
                        address: 'Брикеля 8',
                        coordinates: [27.588133, 53.933288],
                        icon: 'mdi-home-city'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
