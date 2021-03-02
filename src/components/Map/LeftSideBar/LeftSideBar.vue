<template>
        <div>
                <v-navigation-drawer
                        fixed
                        permanent
                        expand-on-hover
                >

                    <v-divider></v-divider>

                    <v-list
                            nav
                            dense
                    >
                        <v-list-item   v-for="(item,i) in discountsFromStore"
                                       :key="i">
                            <v-list-item-icon>
                                <v-icon>mdi-star</v-icon>
                            </v-list-item-icon>
                            <v-expansion-panels class="d-flex mx-auto">
                                <v-expansion-panel
                                        @click="jumpToMarker([item.address.location.longitude, item.address.location.latitude])"
                                >
                                    <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
                                    <v-expansion-panel-content>{{item.description}}</v-expansion-panel-content>
                                    <v-expansion-panel-content>{{item.address.street}}</v-expansion-panel-content>
                                    <v-expansion-panel-content><p>{{item.amountOfDiscount}}%</p></v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
        </div>

<!--    <div>-->
<!--        <v-btn-->
<!--                color="primary"-->
<!--                dark-->
<!--                @click="drawer = !drawer"-->
<!--                class="showMenuBtn ml-13 mt-2"-->
<!--                v-bind:class="{'showMenuBtn': drawer}"-->
<!--        >-->
<!--            Show menu-->
<!--        </v-btn>-->
<!--        <v-navigation-drawer-->
<!--                fixed-->
<!--                v-model="drawer"-->
<!--                class="navDrawer mt-10"-->
<!--        >-->
<!--            <v-btn-->
<!--                    color="primary"-->
<!--                    dark-->
<!--                    class="mapMenuToggleBtn mt-8 mb-2"-->
<!--                    @click="drawer = !drawer"-->
<!--            >-->
<!--                Hide menu-->
<!--            </v-btn>-->
<!--            <v-divider></v-divider>-->

<!--            <v-expansion-panels class="d-flex mx-auto">-->
<!--                <v-expansion-panel-->
<!--                        v-for="(item,i) in discountsFromStore"-->
<!--                        :key="i"-->
<!--                        @click="jumpToMarker([item.address.location.longitude, item.address.location.latitude])"-->
<!--                >-->
<!--                    <v-expansion-panel-header>-->
<!--                        {{item.name}}-->
<!--                    </v-expansion-panel-header>-->

<!--                    <v-expansion-panel-content>{{item.description}}</v-expansion-panel-content>-->
<!--                    <v-expansion-panel-content>{{item.address.street}}</v-expansion-panel-content>-->
<!--                    <v-expansion-panel-content><p>{{item.amountOfDiscount}}%</p></v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
<!--            </v-expansion-panels>-->

<!--        </v-navigation-drawer>-->
<!--    </div>-->

</template>

<script>
    export default {
        name: "LeftSideBar",
        props: ['discountsFromStore', 'jumpToMarker'],
        data() {
            return {
                something: 0,
                drawer: true,
                items: [
                    {title: 'Home', icon: 'mdi-home-city'},
                    {title: 'My Account', icon: 'mdi-account'},
                    {title: 'Users', icon: 'mdi-account-group-outline'},
                ],
                mini: true,
            }
        },
        methods: {
            test() {
                console.log('TEST!')
            },
        },
    }
</script>

<style scoped>
    .mapMenuToggleBtn {
        margin-left: 60px;
    }

    .showMenuBtn {
        /*visibility: hidden;*/
    }

    .navDrawer {
        border-radius: 3px;
        /*z-index: 5;*/
    }
    .v-list {
        overflow: auto;
    }
</style>