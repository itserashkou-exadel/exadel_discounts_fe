<template>
  <div>
    <v-container fluid class="pt-6" :data="filterData">
      <v-row class="">
        <v-col cols="12">
          <!--          dekstop-->
          <v-card max-width="100%" class="d-none mt-n7 d-md-block" style=" position:relative">
            <v-img
                max-height="70vh"
                :src="pictureCheck(info.pictureUrl)"
                class="d-flex"
            >
              <v-icon v-on:click="iconSwitch(info.id)"
                      class="ml-6 mt-4" large color="red">

                {{ card }}
              </v-icon>
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
                <v-row align="center" class="mt-1 mb-n8">

                  <v-rating
                      v-model="info.ratingTotal"
                      :readonly="readonlyRating"
                      @input="ratingChose"
                      class="ml-6 mb-5 mt-n4 "
                      color="yellow darken-3"
                      :value="info.ratingTotal"
                      background-color="grey darken-1"
                      empty-icon="$ratingFull"
                      hover
                  ></v-rating>
                  <div class="grey--text mb-9 ml-2">
                    {{ info.ratingTotal }}
                  </div>
                </v-row>
                <v-row class="ml-2" align-center>
                  <v-card-subtitle class="black--text mb-8 font-weight-bold" style="font-size:32px;">
                    {{ info.amountOfDiscount + "% " + $t('cardDiscount') }}
                  </v-card-subtitle>
                </v-row>
                <v-card-text class="black--text ml-2 mt-n14">
                  <p>{{ info.company.name }}</p>
                  <p class="mt-n4">{{ info.startDate + " - " + info.endDate }}</p>
                </v-card-text>
                <v-btn height="60px" width="300px" color="#1E88E5" style="font-size:24px;"
                       class="white--text ml-6 mt-n5 mb-8 font-weight-bold"
                       v-on:click="addToSubscr"
                       @click="snackbar = true"
                >{{ $t('use') }}
                </v-btn>
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    absolute
                    centered
                    color="primary"
                >
                  {{ $t('additingPromocode') }}
                </v-snackbar>
                <v-row class="ml-6 mb-2">
                  <Promocodes v-bind:subscrItem="info"
                              :showSubscriptions="showSubscriptions"
                  />
                </v-row>
              </v-col>
              <v-col cols="1">

              </v-col>
              <v-col
                  class="
d-none d-md-block
col-md-6
col-xs-12"
              >
                <h1 class="">{{ $t('conditionOfUse') }}</h1>
                <p>{{ info.description }}
                </p>
              </v-col>
            </v-row>
          </v-card>
          <!--mobile-->
          <v-card max-width="100%" class="d-md-none mt-n7">
            <v-img
                max-height="70vh"
                :src="pictureCheck(info.pictureUrl)"
                class="d-flex"
            >
              <v-icon v-on:click="iconSwitch(info.id)"
                      class="ml-6 mt-4" large color="red">
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
" style="word-break: normal;text-align: center">
                  {{ info.name }}
                </v-card-title>
              </v-row>


              <v-row align="center" justify="center">
                <v-rating
                    v-model="info.ratingTotal"
                    :readonly="readonlyRating"
                    @input="ratingChose"
                    class="mt-n3"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    size="20px"
                    hover
                ></v-rating>
                <div class="grey--text mb-2 ml-2">
                  {{ info.ratingTotal }}
                </div>
              </v-row>
              <v-row justify="center">
                <v-card-subtitle class="black--text mr-1 font-weight-bold" style="font-size:32px;">
                  {{ info.amountOfDiscount + "% " + $t('cardDiscount') }}
                </v-card-subtitle>
              </v-row>
              <v-row align="center" justify="end">
                <v-card-text class="black--text ">
                  <v-row justify="center">
                    <p>{{ info.company.name }}</p>
                  </v-row>
                  <v-row justify="center">
                    <p class="mt-n4">{{ info.startDate + " - " + info.endDate }}</p>
                  </v-row>
                </v-card-text>
              </v-row>
              <v-row justify="center">
                <v-btn height="40px" width="200px" color="#1E88E5" style="font-size:16px;"
                       class="white--text mb-5 font-weight-bold"
                       v-on:click="addToSubscr"
                       @click="snackbar = true"
                >{{ $t('use') }}
                </v-btn>
              </v-row>
              <v-row justify="center" class="ma-5">
                                <Promocodes v-bind:subscrItem="info"
                                            :showSubscriptions="showSubscriptions"
                                />
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    absolute
                    centered
                    color="primary"
                >
                  {{ $t('additingPromocode') }}
                </v-snackbar>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            class="d-md-none col-xs-12"
        >
          <v-row justify="center" class="mb-2">
            <h1 class="">{{ $t('conditionOfUse') }}</h1>
          </v-row>
          <p style="text-align: center">{{ info.description }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mb-10">
          <v-row justify="center" justify-md="start" class="mb-2 mt-2 ml-md-6">
            <h1 class="mb-2 ">{{ $t('whereIsIt') }}</h1>
          </v-row>
          <v-card max-width="100%">
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
import paginationMixin from '@/mixins/token.mixin'
import token from '@/mixins/token.mixin'
import DetailPageMap from "@/components/Map/DetailPageMap";
import Promocodes from "@/components/Subscriptions/Promocodes";


const moment = require('moment')
export default {
  name: "Detail",
  components: {Promocodes, DetailPageMap},
  mixins: [paginationMixin, token],
  data: () => ({
    readonlyRating:false,
    card: "mdi-heart-outline",
    info: {},
    results: [],
    detailId: "",
    snackbar: false,
    timeout: 2000,
  }),
  props: {
    _id: {
      type: String,
      required: true
    },
  },
  methods: {
    iconSwitch(id) {
      if (this.card === "mdi-heart-outline") {
        this.card = "mdi-heart"
        this.addToFavorites(id);
      } else{
        this.card = "mdi-heart-outline"
        this.deleteFromFavor(id)}

    },
    addToFavorites: function (id) {
      const putSubscr = () => {
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/favorites/add/${id}`,
        }).then(()=>{
          this.showFavorites()
          })
      };
      this.getToken(putSubscr);
    },
    deleteFromFavor: function (id) {
      let show = () => this.showFavorites();
      const putFavor = () => {
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/favorites/delete/${id}`,
        }).then(()=>{
          this.$store.state.favorites = this.$store.state.favorites.filter(item => item.id !== id);
          })
      };
      this.getToken(putFavor);
    },
    checkToFavorites: function (id) {
      const checkFavor = () => {
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/favorites/exists/${id}`,
        }).then((promise) => {
          this.card="mdi-heart"})
      };
      this.getToken(checkFavor);
    },
    ...mapActions(['getFavorites']),
    showFavorites() {
      let loc = JSON.parse(localStorage.getItem('key'));
      let country = loc.country ? loc.country : 'Беларусь';
      let city = loc.city ? loc.city : 'Минск';
      const getFavoritesResult = () => {
        this.getFavorites(
            {
              "searchDiscountOption": "Favorites",
              "searchAddressCountry": country,
              "searchAddressCity": city,
              "searchSortFieldOption": "NameDiscount",
              "searchSortOption": "Asc",
              "searchPaginationPageNumber": 1,
              "searchPaginationCountElementPerPage": 24,
              "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"            }
        )
      }
      this.getToken(getFavoritesResult);
    },
    ...mapActions["putRatingById"],
    ratingChose(rate) {
      let str = "";
      let self = this;
      const putRate = () => {
        str += self.$route.params._id + '/';
        str += rate;
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/vote/${str}`,
        }).then(this.detailView).then(()=> this.readonlyRating = true);
      }
      this.getToken(putRate)
    },
    pictureCheck(url) {
      if (url === false)
        return "../../public/cat_404.jpg.jpg"
      else
        return url
    },
    ...mapActions(['getDiscountById']),
    detailView: function () {
      const func = () => {
        this.getDiscountById(this.$route.params._id)
            .catch((error) => {
              alert(error);
            });

      }
      this.getToken(func)
    },
    addToSubscr: function (event) {
      let self = this;
      const putSubscr = () => {
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/subscriptions/add/${self.$route.params._id}`,
        });
      };
      this.getToken(putSubscr);
    },
    getPromo: function (id) {
      let updatePromocodes = (promocodes) => this.promocodes = promocodes;
      const promo = () => {
        axios({
          method: 'get',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/subscriptions/get/${id}`,
        }).then(response => {
          updatePromocodes(response.data.promocodes);
        }).catch(error => {
          updatePromocodes([]);
        })
      };
      this.getToken(promo);
    },
    checkToRating: function () {
      const checkRating = () => {
        axios({
          method: 'put',
          url: `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/vote/exists/${this.$route.params._id}`,
        }).then((promise) => {
          this.readonlyRating = true;
          })
      };
      this.getToken(checkRating);
    },
    ...mapActions(['getSubscription']),
    showSubscriptions() {
      let loc = JSON.parse(localStorage.getItem('key'));
      let country = loc.country ? loc.country : 'Беларусь';
      let city = loc.city ? loc.city : 'Минск';
      const getSubscrResult = () => {
        this.getSubscription(
            {
              "searchDiscountOption": "Subscriptions",
              "searchAddressCountry": country,
              "searchAddressCity": city,
              "searchSortFieldOption": "NameDiscount",
              "searchSortOption": "Asc",
              "searchPaginationPageNumber": 5,
              "searchPaginationCountElementPerPage": 24,
              "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
            }
        ).catch((error) => {
              alert(error)}
            )}
      this.getToken(getSubscrResult);
    },
  },
  mounted: function () {
    this.detailView();
    this.checkToRating();
    this.checkToFavorites(this.$route.params._id)

  },
  computed: {
    ...mapGetters(["getDetailView"]),
    filterData() {
      this.info = this.getDetailView;
      this.info.startDate = moment(this.info.startDate).format('L');
      this.info.endDate = moment(this.info.endDate).format('L');
      this.info.ratingTotal = +Number.parseFloat(this.info.ratingTotal).toFixed(2);
      return this.info;
    },
    discounts() {
      return this.$store.state.discounts
    },
    subscriptions() {
      return this.$store.state.subscriptions
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Detail';
      }
    },
  }
}


</script>

<style scoped>

</style>