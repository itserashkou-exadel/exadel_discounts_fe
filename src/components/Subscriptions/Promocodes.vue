<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="1000"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            @click="getPromo(subscrItem.id)"
        >
          Мои промокоды
        </v-btn>
      </template>

      <v-card>

        <v-card-title class="headline grey lighten-2">
          Промокоды
        </v-card-title>
        <v-card-text
        >
          <v-data-table
              :headers="headers()"
              :items="filterData"
              hide-default-footer
          >
            <template v-slot:item.promocodeValue="{ item }">
              <v-chip
                  :color="getColor(item.promocodeValue)"
                  dark
              >
                {{ item.promocodeValue }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                  small
                  @click="deleteFromSubscr(subscrItem.id ,item.id)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from "axios";
import AuthService from "@/services/auth.service";
import authMixin from '@/mixins/token.mixin'
import {mapGetters, mapMutations, mapActions} from 'vuex'

const moment = require('moment');
const auth = new AuthService();

export default {
  name: "Promocodes",
  props: ['subscrItem', 'showSubscriptions'],
  mixins: [authMixin],
  data() {
    return {
      dialog: false,
      promocodes: [],
      info: [],
      result: [],
    }
  },
  methods: {
    headers() {
      return [
        {
          align: 'left',
          sortable: false,
          value: 'service',
        },
        {text: 'НОМЕР ПРОМОКОДА', value: 'promocodeValue'},
        {text: 'ДАТА НАЧАЛА', value: 'createDate'},
        {text: 'ДАТА ОКОНЧАНИЯ', value: 'endDate'},
        {text: 'УДАЛИТЬ', value: 'actions'},
      ]
    },
    getColor(endDate) {

      return '#2196f3'
    },
    getPromo: function (id) {
      let updatePromocodes = (promocodes) => this.promocodes = promocodes;

      const promo = () => {
        axios({
          method: 'get',
          url: `https://localhost:9001/api/v1/discounts/subscriptions/get/${id}`,
        }).then(response => {
          console.log("RESPONSE:", response);

          updatePromocodes(response.data.promocodes);
          console.log('ПРОМО', this.promocodes);
        }).catch(error => {
          console.log("ERROR:", error);
          updatePromocodes([]);
        })
      };
      this.getToken(promo);
    },
    deleteFromSubscr: function (discountId, promoId) {
      let showSubscriptions = () => this.showSubscriptions();
      let showPromocodes = () => this.getPromo(discountId);
      const putSubscr = () => axios({
        method: 'put',
        url: `https://localhost:9001/api/v1/discounts/subscriptions/delete/${discountId}/${promoId}`,
      }).then(response => showPromocodes())
          .then(response => showSubscriptions());
      this.getToken(putSubscr);
    },
  },
  computed: {
    filterData: function () {
      return this.promocodes.map((item) =>
          new Object({
                createDate: moment(item.createDate).format('L'),
                endDate: moment(item.endDate).format('L'),
                expired: false,
                id: item.id,
                promocodeValue: item.promocodeValue,
              }
          ))
    },
  },
}

</script>

<style scoped>

</style>