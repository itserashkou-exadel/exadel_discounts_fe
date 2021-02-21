<template>
  <v-col cols="12" lg="10" md="12" sm="10" class="pb-10">
    <v-data-table
        :items="filterData"
        :headers="headers()"
        hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>
            <h3>Подписки</h3>
          </v-toolbar-title>
          <v-dialog max-width="500px">
            <v-card>
              <v-card-title class="headline">{{ $t('dtRemoval') }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text>{{ $t('dtCancel') }}</v-btn>
                <v-btn color="blue darken-1" text>{{ $t('dtOk') }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="deleteFromSubscr(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="d-flex justify-end my-5">
            <v-col cols="1" lg="1">
            </v-col>

            <v-col cols="7" lg="11" class="d-flex justify-center">
              <h2>{{ $t('dtDetailsAbout') }} "{{ item.service }}"</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="11" lg="11" class="d-flex justify-center">
              <p class="mb-0">{{ item.description }}</p>
            </v-col>
            <v-col cols="11" lg="11" class="text-center">
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
    <v-pagination
        v-model="page"
        :length="pageCount"
    ></v-pagination>
  </v-col>
</template>

<script>
import axios from "axios";
import AuthService from "@/services/auth.service";
import authMixin from '@/mixins/token.mixin'

const auth = new AuthService();
const moment = require('moment')

import {mapGetters, mapMutations, mapActions} from 'vuex'
import Modal from "@/components/Filter/Modal";

export default {
  components: {Modal},
  name: "Subscriptions",
  mixins: [authMixin],
  data: () => ({
    searchResult: '',
    offers: [],
    info: [],
    result: [],
    page: 1,
    pageCount: 1
  }),
  computed: {
    ...mapGetters(["allSubscriptions"]),
    filterData: function () {
      return this.allSubscriptions.map((item) =>
          new Object({
                id: item.id,
                service: item.name,
                vendor: item.company.name,
                amountOfDiscount: item.amountOfDiscount,
                startDate: moment(item.startDate.$date).format('L'),
                endDate: moment(item.endDate.$date).format('L'),
                rating: item.ratingTotal,
                description: item.description
              }
          ))
    },
  },
  methods: {
    ...mapActions(['getSubscription']),
    showSubscriptions() {
      const authorizationHeader = 'Authorization';
      auth.getAccessToken().then((userToken) => {
        axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
        this.getSubscription(
            {
              "searchDiscountOption": "Subscriptions",
              "searchAddressCountry": "Украина",
              "searchAddressCity": "Винница",
              "searchSortFieldOption": "NameDiscount",
              "searchSortOption": "Asc",
              "searchPaginationPageNumber": 1,
              "searchPaginationCountElementPerPage": 10,
              "searchLanguage": "Ru"
            }
        )
      }).catch((error) => {
        alert(error);
      });
    },
    deleteFromSubscr: function (id) {
      let show = () => this.showSubscriptions();

      const putSubscr = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/subscriptions/delete/${id}`,
        }).then(response => show());
      };
      this.getToken(putSubscr);
    },
    headers() {
      return [
        {
          text: this.$t('dtOffer'),
          align: 'left',
          sortable: false,
          value: 'service',
        },
        {text: this.$t('dtVendor'), value: 'vendor'},
        {text: this.$t('dtDiscount'), value: 'amountOfDiscount'},
        {text: this.$t('dtStartDate'), value: 'startDate'},
        {text: this.$t('dtFinishDate'), value: 'endDate'},
        {text: this.$t('dtRating'), value: 'rating'},
        {text: this.$t('dtActions'), value: 'actions', sortable: false},
      ]
    },
  },
  mounted() {
    this.showSubscriptions();
  },
}
</script>


<style scoped>
.pb-10 {
  margin: 0 auto;
}
</style>
