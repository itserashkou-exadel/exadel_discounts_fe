<template>
  <v-col cols="12" lg="10" md="12" sm="10" class="pb-10">
    <v-data-table
        :items="filterData"
        :headers="headers()"
        hide-default-footer
        show-expand
        height="500"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>
            <h3>{{$t('hSubscribe')}}</h3>
          </v-toolbar-title>
          <v-dialog max-width="500px">
            <v-card>
              <v-card-title class="headline">{{ $t('dtRemoval') }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text>{{ $t('dtCancel') }}</v-btn>
                <v-btn color="blue darken-1" text>{{ $t('dtOk') }}</v-btn>
                <template v-slot:item.calories="{ item }">
                </template>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="content">
          <v-row class="d-flex justify-center my-5">
            <v-col cols="12" lg="12" class="d-flex justify-center">
              <h2>{{ $t('dtDetailsAbout') }} "{{ item.service }}"</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="12" class="d-flex justify-center">
              <p class="mb-0">{{ item.description }}</p>
            </v-col>
            <v-col cols="9" lg="9" class="d-flex justify-space-around">
              <v-btn
                  color="primary"
                  @click="$router.push({name:'detail'})"
              >
                {{ $t('dtMoreInfo') }}
              </v-btn>
              <Promocodes v-bind:subscrItem="item"
                          :showSubscriptions="showSubscriptions"
              />
            </v-col>
          </v-row>
        </td>

      </template>

    </v-data-table>
    <v-pagination
        v-model="pageNumber"
        :length="pageCount"
        @next="paginateNext"
        @previous="paginatePrev"
        @input="paginateInput"
    ></v-pagination>
  </v-col>
</template>

<script>
import axios from "axios";
import AuthService from "@/services/auth.service";
import authMixin from '@/mixins/token.mixin';
import {mapGetters, mapActions} from 'vuex'
import Modal from "@/components/Filter/Modal";
import Promocodes from "@/components/Subscriptions/Promocodes";

const auth = new AuthService();
const moment = require('moment')

export default {
  components: {Promocodes, Modal},
  name: "Subscriptions",
  mixins: [authMixin],
  data: () => ({
    pageNumber: 1,
    pageCount: 1,
    pageSize: 5,
    dialog: false,
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
                description: item.description,
              }
          ))
    },
  },
  methods: {
    ...mapActions(['getSubscription']),
    showSubscriptions() {
      const {country, town} = this.$store.state.userLocation
      const authorizationHeader = 'Authorization';
      auth.getAccessToken().then((userToken) => {
        axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
        this.getSubscription(
            {
              "searchDiscountOption": "Subscriptions",
              "searchAddressCountry": country,
              "searchAddressCity": town,
              "searchSortFieldOption": "NameDiscount",
              "searchSortOption": "Asc",
              "searchPaginationPageNumber": this.pageNumber,
              "searchPaginationCountElementPerPage": this.pageSize,
              "searchLanguage": "Ru"
            }
        ).then(response => this.updatePageCount());
      }).catch((error) => {
        alert(error);
      });
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
      ]
    },
    paginateInput(pageNumber) {
      this.showSubscriptions(pageNumber);
    },
    paginateNext() {
      this.showSubscriptions();

    },
    paginatePrev() {
      this.showSubscriptions();
    },
    updatePageCount() {
      if (this.pageNumber === this.pageCount) {
        if (this.allSubscriptions.length >= this.pageSize  ) {
          this.pageCount++
        }else if (this.allSubscriptions.length <= 0  ) {
          this.pageCount--;
          this.pageNumber=1;
          this.showSubscriptions();
        }
      }
    }
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

tr {
  box-shadow: none !important;
}
</style>
