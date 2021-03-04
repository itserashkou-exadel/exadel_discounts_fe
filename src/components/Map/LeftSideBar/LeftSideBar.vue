<template>
    <v-navigation-drawer
            permanent
            class="d-flex mb-5"
            width="375px"
    >
        <v-divider></v-divider>

        <template>
            <v-expansion-panels focusable>
                <v-expansion-panel
                        :key="item.id"
                        v-for="item in discountsFromStore"
                        @click="jumpToMarker([item.address.location.longitude, item.address.location.latitude], item.id)"
                >
                    <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card
                                class="mx-auto"
                                max-width="450"
                                flat
                        >
                            <v-img
                                    class="white--text align-end mt-1"
                                    height="250px"
                                    :src="pictureCheck(item.pictureUrl)"
                            >
                                <v-card-title class="text--darken-4">{{item.company.name}}</v-card-title>
                                <v-card-subtitle class="white--text">{{item.address.street}}</v-card-subtitle>
                                <v-rating
                                        :value="item.ratingTotal"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="25"
                                        class="d-flex justify-center"
                                ></v-rating>
                                <v-card-subtitle class="white--text d-flex justify-end">{{item.amountOfDiscount}}%
                                </v-card-subtitle>
                                <!--                                <v-card-subtitle class="text-button blue-grey&#45;&#45;text" >Подписаться</v-card-subtitle>-->
                                <v-btn
                                        class="ml-3 mb-3 primary"
                                        @click="$router.push({name:'detail',params:{_id:item.id}})"
                                >Подробно
                                </v-btn>
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Описание:
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>{{item.description}}</div>
                                <v-divider></v-divider>
                                <div>{{item.id}}</div>
                                <!--                                <div>Whitsunday Island, Whitsunday Islands</div>-->
                                <!--                                <div>Whitsunday Island, Whitsunday Islands</div>-->
                            </v-card-text>

                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </v-navigation-drawer>

</template>

<script>

    import axios from "axios";

    export default {
        name: "LeftSideBar",
        props: ['discountsFromStore', 'jumpToMarker'],
        data() {
            return {
                drawer: false,
                myKey: 0,
            }
        },
        methods: {
            test() {
                console.log('TEST!')
            },
            pictureCheck(url) {
                return url ? url : "../../public/cat_404.jpg"
            },
        },
        mounted() {
            console.log('PROPS navBar:', this.props)
        },
        computed: {
            propsFromMap: function () {
                return this.discountsFromStore
            }
        },
        watch: {
            discountsFromStore() {
                console.log('WATCH')
                this.myKey += 1
            }
        },
    }
</script>

<style scoped>

</style>
