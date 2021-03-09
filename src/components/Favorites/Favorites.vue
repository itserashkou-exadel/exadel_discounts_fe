<template>
  <div>
    <v-data-table
        :items="filterData"
        :headers="headers()"
        hide-default-footer
        height="400"
        class="elevation-8 mb-16"
        show-expand
        :single-expand="singleExpand"
        :expanded.sync="expanded"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>
            <h3>{{$t('hFavorites')}}</h3>
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
            @click="deleteFromFavor(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="d-flex justify-center my-5">
            <v-col cols="12" lg="12" class="d-flex justify-center">
              <h2>{{ $t('dtDetailsAbout') }} "{{ item.service }}"</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="11" lg="11" class="d-flex justify-center">
              <p class="mb-0">{{ item.description }}</p>
            </v-col>
            <v-col cols="9" lg="9" class="d-flex justify-space-around">
              <v-btn class="font-weight-light"
                     color="primary"
                     @click="$router.push({name:'detail',params:{_id:item.id}})"
              >
                {{ $t('dtMoreInfo') }}
              </v-btn>
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
  </div>
</template>

<script>
import axios from "axios";

import authMixin from '@/mixins/token.mixin';
import {mapGetters, mapActions} from 'vuex'
import Modal from "@/components/Filter/Modal";

const moment = require('moment')

export default {
  components: {Modal},
  name: "Favorites",
  mixins: [authMixin],
  data: () => ({
    pageNumber: 1,
    pageCount: 1,
    pageSize: 24,
    dialog: false,
    expanded: [],
    singleExpand: true,
  }),
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
                rating: item.ratingTotal,
                description: item.description
              }
          ))
    },
  },
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
    deleteFromFavor: function (id) {
      let show = () => this.showFavorites();
      const putFavor = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/favorites/delete/${id}`,
        }).then(response => show());
      };
      this.getToken(putFavor);
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
          this.pageCount--;
          this.pageNumber = 1;
          this.showFavorites();
        }
      }
    }
  },
  created() {
    const auth = this.getAuth
    this.setSecondAuth(auth);
  },
  mounted() {
    this.showFavorites();
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

.v-data-table {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

td {
  width: 0;
  white-space: nowrap;
  vertical-align: top;
}
</style>
