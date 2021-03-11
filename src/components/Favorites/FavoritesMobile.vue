<template>
  <v-container fluid>
    <v-card class="mb-16 pb-5"
            flat>
      <v-row>
        <v-toolbar-title class="ml-7">
          <h3>{{$t('hFavorites')}}</h3>
        </v-toolbar-title>
        <v-col lg="4"
               sm="12"
               md="6"
               v-for="favorite in allFavorites"
               :key="favorite.id"
        >
          <div class="d-flex justify-center">
            <FavoritesMobileCard
                :favorite="favorite"
                :showFavorites="showFavorites"
            />
          </div>
        </v-col>
      </v-row>
      <v-pagination v-if="allFavorites.length > 0"
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

import FavoritesMobileCard from "@/components/Favorites/FavoritesMobileCard";
import SwitchButton from "@/views/SwitchButton";
import Modal from "@/components/Filter/Modal";
import {mapActions, mapGetters} from 'vuex'
import token from '@/mixins/token.mixin'

const moment = require('moment')

export default {
  name: "FavoritesMobile",
  mixins: [token],
  components: {Modal, SwitchButton, FavoritesMobileCard},
  data: () => ({
    pageNumber: 1,
    pageCount: 1,
    pageSize: 5,
    dialog: false,
    favorites: []
  }),
  methods: {
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
              "searchPaginationPageNumber": this.pageNumber,
              "searchPaginationCountElementPerPage": this.pageSize,
              "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
            }
        ).then(response => this.updatePageCount())
            .catch((error) => {
              alert(error)}
            )}
      this.getToken(getFavoritesResult);
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
      this.showFavorites(pageNumber);
    },
    paginateNext() {
      this.showFavorites();

    },
    paginatePrev() {
      this.showFavorites();
    },
    updatePageCount() {
      if (this.pageNumber === this.pageCount) {
        if (this.allFavorites.length >= this.pageSize) {
          this.pageCount++
        } else if (this.allFavorites.length <= 0) {
          let lastPage = this.pageCount - 1;
          this.pageNumber = lastPage;
          this.showFavorites();
        }
      }
    }
  },

  computed: {
    ...mapGetters(["allFavorites"]),
    filterData: function () {
      return this.allFavorites.map((item) =>
          new Object({
                id: item.id,
                service: item.name,
                vendor: item.company.name,
                amountOfDiscount: item.amountOfDiscount,
                startDate: moment(item.startDate).format('L'),
                endDate: moment(item.endDate).format('L'),
                rating: item.ratingTotal ? +Number.parseFloat(item.ratingTotal).toFixed(2) : 0,
                description: item.description,
              }
          ))
    },
  },
  mounted() {
    this.showFavorites();
  },
}
</script>
