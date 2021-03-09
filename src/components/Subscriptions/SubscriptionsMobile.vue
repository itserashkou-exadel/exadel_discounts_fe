<template>
  <v-container fluid>
    <v-card class="mb-5 pb-5">
      <v-row>
        <v-toolbar-title class="ml-7">
          <h3>Подписки</h3>
        </v-toolbar-title>
        <v-col lg="4"
               sm="12"
               md="6"
               v-for="subscription in allSubscriptions"
               :key="subscription.id"
        >
          <div class="d-flex justify-center">
            <SubscriptionsMobileCard
                :subscription="subscription"
                :showSubscriptions="showSubscriptions"
            />
          </div>
        </v-col>
      </v-row>
      <v-pagination
          v-model="pageNumber"
          :length="pageCount"
          @next="paginateNext"
          @previous="paginatePrev"
          @input="paginateInput"
      ></v-pagination>
    </v-card>
  </v-container>
</template>
<script>

import axios from "axios";
import SubscriptionsMobileCard from "@/components/Subscriptions/SubscriptionsMobileCard";
import SwitchButton from "@/views/SwitchButton";
import Modal from "@/components/Filter/Modal";
import {mapActions, mapGetters} from 'vuex'
import token from '@/mixins/token.mixin'

const moment = require('moment')

export default {
  name: "SubscriptionsMobile",
  mixins: [token],
  components: {Modal, SwitchButton, SubscriptionsMobileCard},
  data: () => ({
    pageNumber: 1,
    pageCount: 1,
    pageSize: 5,
    dialog: false,
    subscriptions: []
  }),
  methods: {
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
              "searchPaginationPageNumber": this.pageNumber,
              "searchPaginationCountElementPerPage": this.pageSize,
              "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
            }
        ).then(response => this.updatePageCount())
            .catch((error) => {
              alert(error)}
            )}
      this.getToken(getSubscrResult);
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
          let lastPage = this.pageCount-1;
          this.pageNumber= lastPage;
          this.showSubscriptions();
        }
      }
    }
  },

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
  created() {
    const auth = this.$store.getters.getAuth
    this.setSecondAuth(auth);
  },
  mounted() {
    this.showSubscriptions();
  },
}
</script>
<style scoped>
</style>