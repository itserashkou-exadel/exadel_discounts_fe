<template>
    <div>
        <v-container fluid class="pt-8" :data="filterData">
            <v-row class="mt-1">
                <v-col cols="12">
                    <v-card max-width="100%" class="d-none mt-n7 d-md-block" style="position:relative">
                        <!--            <v-img-->
                        <!--                max-height="50vh"-->
                        <!--                src="https://images.wallpaperscraft.ru/image/burger_gamburger_chernyj_burger_sochnyj_116248_1920x1080.jpg"-->
                        <!--                class="d-flex"-->
                        <!--            >-->
                        <v-img
                                max-height="70vh"
                                :src="pictureCheck(info.pictureUrl)"
                                class="d-flex"
                        >
                          <v-icon v-on:click="iconSwitch(info.id)"
                                  class="ml-6 mt-4" large color="blue">

                            {{ card }}
                          </v-icon>
<!--                            <v-icon class="ml-6 mt-4" large color="blue">-->
<!--                                mdi-heart-outline-->
<!--                            </v-icon>-->
                        </v-img>
                        <v-row>
                            <v-col cols="5" class="mt-n4">
                                <v-card-title class="black--text
                                ml-1 mt-3
                                font-weight-bold
                                text-lg-h2
                                text-md-h2
                                text-h2
                                " style="word-break: normal">
                                    {{ info.name }}
                                </v-card-title>
                                <v-rating
                                        class="ml-4 mb-5 mt-n4 "
                                        color="yellow darken-3"
                                        :value="info.ratingTotal"
                                        background-color="grey darken-1"
                                        empty-icon="$ratingFull"
                                        half-increments
                                        hover
                                ></v-rating>
                                <v-row class="ml-2" align-center>
                                    <v-card-subtitle class="black--text mb-8 font-weight-bold" style="font-size:32px;">
                                        {{info.amountOfDiscount + "% Скидка"}}
                                    </v-card-subtitle>
                                    <!--                                    <v-icon color="white" large class="ml-14">-->
                                    <!--                                        mdi-heart-outline-->
                                    <!--                                    </v-icon>-->
                                </v-row>
                                <v-card-text class="black--text ml-2 mt-n14">
                                    <p>{{info.company.name}}</p>
                                    <p class="mt-n4">{{info.startDate + " - " + info.endDate}}</p>
                                </v-card-text>
                                <v-btn height="60px" width="300px" color="#1E88E5" style="font-size:24px;"
                                       class="white--text ml-6 mt-n5 font-weight-bold"
                                       v-on:click="addToSubscr">Воспользоваться
                                </v-btn>
                            </v-col>
                            <v-col
                                    class="
                            d-none d-md-block
                            col-md-6
                            col-xs-12"
                            >
                                <h1 class="">Условия использования</h1>
                                <p>{{info.description}}
                                </p>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card max-width="100%" class="d-md-none">
                        <!--            <v-img-->
                        <!--                max-height="70vh"-->
                        <!--                src="https://images.wallpaperscraft.ru/image/burger_gamburger_chernyj_burger_sochnyj_116248_1920x1080.jpg"-->
                        <!--                class="d-flex"-->
                        <!--            >-->
                        <v-img
                                max-height="70vh"
                                :src="pictureCheck(info.pictureUrl)"
                                class="d-flex"
                        >
                          <v-icon v-on:click="iconSwitch(info.id)"
                                  class="ml-6 mt-4" large color="blue">

                            {{ card }}
                          </v-icon>
                        </v-img>
                        <v-col class="mt-1">
                            <v-row justify="center">
                                <v-card-title
                                        class="black--text
                                font-weight-bold
                                text-lg-h2
                                text-md-h2
                                text-h4
                                " style="word-break: normal">
                                    {{ info.name }}
                                </v-card-title>
                            </v-row>


                            <v-row justify="center">
                                <v-rating
                                        class="mt-n3"
                                        color="yellow darken-3"
                                        background-color="grey darken-1"
                                        empty-icon="$ratingFull"
                                        half-increments
                                        size="20px"
                                        hover
                                ></v-rating>
                            </v-row>
                            <v-row justify="center">
                                <v-card-subtitle class="black--text mr-1 font-weight-bold" style="font-size:32px;">
                                    {{info.amountOfDiscount + "% Скидка"}}
                                </v-card-subtitle>
                            </v-row>
                            <v-row align="center" justify="end">
                                <v-card-text class="black--text ">
                                    <v-row justify="center">
                                        <p>{{info.company.name}}</p>
                                    </v-row>
                                    <v-row justify="center">
                                        <p class="mt-n4">{{info.startDate + " - " + info.endDate}}</p>
                                    </v-row>
                                </v-card-text>
                            </v-row>
                            <v-row justify="center">
                                <v-btn height="40px" width="200px" color="#1E88E5" style="font-size:16px;"
                                       class="white--text mb-8 font-weight-bold"
                                       v-on:click="addToSubscr">Воспользоваться
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        class="
                d-md-none
                col-xs-12
                ml-9"
                >
                    <v-row justify="center" class="mb-2">
                        <h1 class="">Условия использования</h1>
                    </v-row>
                    <p>{{info.description}}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="mb-10">
                    <v-row justify="center" justify-md="start" class="mb-2 mt-2">
                        <h1 class="mb-2 ml-9">Где находится</h1>
                    </v-row>
                    <v-card max-width="100%">
                        <!--            <v-img src="../../public/image1.png" height="60%"></v-img>-->
                        <DetailPageMap v-bind:info="info"/>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import axios from "axios";
    import AuthService from "@/services/auth.service";
    import paginationMixin from '@/mixins/token.mixin'
    import DetailPageMap from "@/components/Map/DetailPageMap";


    const auth = new AuthService();
    const moment = require('moment')
    export default {
        name: "Detail",
        components: {DetailPageMap},
        mixins: [paginationMixin],
        data: () => ({
            card: "mdi-heart-outline",
            info: {},
            results: [],
            detailId: "",
        }),

        props: {
            _id: {
                type: String,
                required: true
            }
        },

        methods: {
          iconSwitch(id) {
            if (this.card === "mdi-heart-outline") {
              this.card = "mdi-heart"
              // this.addToFavorites(id);
            } else
              this.card = "mdi-heart-outline"
          },
            pictureCheck(url) {
                console.log(url)
                if (url === false)
                    return "../../public/cat_404.jpg.jpg"
                else
                    // return "https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    return url
            },
            ...mapActions(['getDiscountById']),
            detailView: function () {
                let self = this;
                const authorizationHeader = 'Authorization';
                auth.getAccessToken().then((userToken) => {
                    axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
                    this.getDiscountById(self.$route.params._id)
                        .catch((error) => {
                            alert(error);
                        });
                });
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
        mounted: function () {
            this.detailView();
        },
        computed: {
            ...mapGetters(["getDetailView"]),
            filterData() {
                const arr = [];
                this.info = this.getDetailView;
                this.info.startDate = moment(this.info.startDate).format('L');
                this.info.endDate = moment(this.info.endDate).format('L');
                return this.info;
            },
            discounts() {
                return this.$store.state.discounts
            },
            subscriptions() {
                return this.$store.state.subscriptions
            }
        },
    }


</script>

<style scoped>

</style>
