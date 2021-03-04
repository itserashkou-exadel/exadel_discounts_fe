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
                        :key="i"
                        v-for="(item,i) in discountsFromStore"
                        @click="jumpToMarker([item.address.location.longitude, item.address.location.latitude])"
                >
                    <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card
                                class="mx-auto"
                                max-width="400"
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
                                        :value="4.5"
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
                                        @click="addToSubscr"
                                >Воспользоватся
                                </v-btn>
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                Описание:
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>{{item.description}}</div>
                                <v-divider></v-divider>
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
            addToSubscr: function (event) {
                let self = this;
                // let discountId = this.$route.params._id
                const putSubscr = () => {
                    axios({
                        method: 'put',
                        url: `https://localhost:9001/api/v1/discounts/subscriptions/add/${self.$route.params._id}`,
                    }).then(response => console.log("RESPONSE :" + JSON.stringify(response)));
                };
                this.getToken(putSubscr);
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
