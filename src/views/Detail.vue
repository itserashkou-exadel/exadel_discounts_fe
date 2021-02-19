<template>
  <div>
    <v-container fluid class="pt-8" :data="filterData">
      <v-row class="mt-1">
        <v-col cols="12">
          <v-card max-width="100%" class="d-none mt-n7 d-md-block" style="position:relative">
            <v-img
                max-height="50vh"
                src="https://images.wallpaperscraft.ru/image/burger_gamburger_chernyj_burger_sochnyj_116248_1920x1080.jpg"
                class="d-flex"
            >
              <v-icon class="ml-6 mt-4" large color="blue">
                mdi-heart-outline
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
                                name">
                  {{ info.name }}
                </v-card-title>
                <v-rating
                    class="ml-4 mb-5 mt-n4 "
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    half-increments
                    hover
                ></v-rating>
                <v-row class="ml-2" align-center>
                  <v-card-subtitle class="black--text mb-8 font-weight-bold" style="font-size:32px;">
                    50% Скидка
                  </v-card-subtitle>
                  <!--                                    <v-icon color="white" large class="ml-14">-->
                  <!--                                        mdi-heart-outline-->
                  <!--                                    </v-icon>-->
                </v-row>
                <v-card-text class="black--text ml-2 mt-n14">
                  <p>Мак дональдс</p>
                  <p class="mt-n4">21.01.01 - 22.01.01</p>
                </v-card-text>
                <v-btn height="60px" width="300px" color="#1E88E5" style="font-size:24px;"
                       class="white--text ml-6 mt-n5 font-weight-bold">Воспользоваться
                </v-btn>
              </v-col>
              <v-col
                  class="
                            d-none d-md-block
                            col-md-6
                            col-xs-12"
              >
                <h1 class="">Условия использования</h1>
                <p>
                  - Получить промокод можно до 28.02, воспользоваться до 01.04.21
                  - Промокод дает право на скидку 50% на пиццы и комплексы от "Еж Пицца & Ежедневник"

                  - Акция действует на доставку, навынос и в кафе

                  - Стоимость пицц:

                  - "Маргарита NEW": 5,50 руб. 11 руб.

                  - "Mama Mia": 7,25 руб. 14,50 руб.

                  - "С маринованными опятами": 10,50 руб. 21 руб.

                  - "Цыпленок Дорблю": 10,50 руб. 21 руб.

                  - комплексы:

                  🍕 сет 1 (3 пиццы): 15,50 руб. 31 руб.

                  🍕 сет 2 (3 пиццы): 25 руб. 50 руб.

                  🍕 сет 3 (5 пицц): 39 руб. 78 руб.

                  🍕 сет 4 (4 пиццы): 23,50 руб. 47 руб.

                  - Подробное описание пицц и комплексов смотрите ниже

                  - Доставка бесплатная при заказе от 20 руб. для зеленой зоны и от 40 руб. для желтой
                  зоны. При меньшей сумме заказа стоимость доставки 5 руб. Карту зоны доставки
                  смотрите ниже

                  - Один промокод - один заказ со скидкой.
                </p>
              </v-col>
            </v-row>
          </v-card>
          <v-card max-width="100%" class="d-md-none">
            <v-img
                max-height="70vh"
                src="https://images.wallpaperscraft.ru/image/burger_gamburger_chernyj_burger_sochnyj_116248_1920x1080.jpg"
                class="d-flex"
            >
              <v-icon class="ml-6 mt-4" large color="blue">
                mdi-heart-outline
              </v-icon>
            </v-img>
            <v-col class="mt-1">
              <v-row justify="center">
                <v-card-title
                    class="black--text
                                font-weight-bold
                                text-lg-h1
                                text-md-h1
                                text-h2
                                name" style="">
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
                  {{info.amountOfDiscount + " Скидка"}}
                </v-card-subtitle>
              </v-row>
              <v-row align="center" justify="end">
                <v-card-text class="black--text ">
                  <v-row justify="center">
                    <p>{{info.company.description}}</p>
                  </v-row>
                  <v-row justify="center">
                    <p class="mt-n4">21.01.01 - 22.01.01</p>
                  </v-row>
                </v-card-text>
              </v-row>
              <v-row justify="center">
                <v-btn height="40px" width="200px" color="#1E88E5" style="font-size:16px;"
                       class="white--text mb-8 font-weight-bold">Воспользоваться
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
          <p>
            - Получить промокод можно до 28.02, воспользоваться до 01.03.21
            - Промокод дает право на скидку 50% на баскеты, стрипсы, твистеры в ресторанах "KFC"
            - Стоимость блюд:
            - В 21 заведении Минска:
            - 2 твистера (оригинальных/острых) + 2 газированных напитка 0,5 л: 8,60 руб. 17,20 руб.
            - 2 баскет дуэта (4 ножки, 8 куриных крылышек, 8 стрипсов, 4 мал. картофеля фри) + 2 соуса + 2
            газированных напитка 0,5 л: 18,60 руб. 37,20 руб.
            - Акция на баскет дуэт действует с 11:00
            - Акция не действует в киосках самообслуживания
            - Один промокод - одно акционное предложение со скидкой.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mb-10">
          <v-row justify="center" justify-md="start" class="mb-2 mt-2">
            <h1 class="mb-2 ml-9">Где находится</h1>
          </v-row>
          <v-card max-width="100%">
            <v-img src="../../public/image1.png" height="60%"></v-img>
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

const auth = new AuthService();
const moment = require('moment')
export default {
  name: "Detail",
  data: () => ({
    info: [],
    results: [],
    detailId:""
  }),

  props: {
    _id: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions(['getDiscountById']),
    detailView: function () {
      let self = this;
      const authorizationHeader = 'Authorization';
      auth.getAccessToken().then((userToken) => {
        if(self._id !== undefined){
          localStorage.detailId = self._id;
        }
        axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
        this.getDiscountById(localStorage.detailId)
            .catch((error) => {
              alert(error);
            });
      });
    },
    alertFunction: function () {
      let self = this;
      alert(self._id)
    }
  },
  // computed: {
  //   // ...mapGetters(["detailView"]),
  //   // filterData: function () {
  //   //   const arr = [];
  //   //   this.info = this.detailView;
  //   // arr.push(
  //   //     {
  //   //       id: info.id,
  //   //       service: info.name,
  //   //       vendor: info.company.name,
  //   //       amountOfDiscount: info.amountOfDiscount,
  //   //       startDate: moment(info.startDate.$date).format('L'),
  //   //       endDate: moment(info.endDate.$date).format('L'),
  //   //       rating: info.ratingTotal,
  //   //       description: info.description,
  //   //       tags: info.tags
  //   //     }
  //   // )
  //
  //   // this.results = arr;
  //   // return this.results;
  //
  //
  // },

  mounted: function () {
    this.detailView();
  },
  computed:{
    ...mapGetters(["getDetailView"]),
    filterData () {
      this.info = this.getDetailView;

    }
  },
}
</script>

<style scoped>

</style>