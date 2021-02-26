<template>
    <v-container fluid>
        <v-card class="mb-16 pb-5">
            <v-row >
                <v-col lg="4"
                       sm="12"
                       md="6"
                       v-for="result in visibleCards"
                       :key="result.id"
                       >
                    <div class="d-flex justify-center">
                        <Card
                                :description="result"
                        />
                    </div>
                </v-col>
            </v-row>
          <v-pagination
              v-model="page"
              :length="paginationLength"
              :total-visible="7"
              @input="next"
          ></v-pagination>
        </v-card >
    </v-container>
</template>
<script>
    const moment = require('moment')
    import Card from '../components/Card.vue'
    import SwitchButton from "@/views/SwitchButton";
    import Modal from "@/components/Filter/Modal";
    import {mapActions, mapGetters} from 'vuex'
    import token from '@/mixins/token.mixin'

    export default {
        name: "Cards",
        mixins: [token],
        components: {Modal, SwitchButton, Card},
        data: () => ({
          arr:[],
                info: [],
                results:[],
          itemsPerPage:6,
          page: 1,
          pageCount: 1,
        }),
        methods: {
          ...mapActions(['goFetch', 'changeItemsPerPage', 'inputPost', 'nextDiscount']),
          next() {
            console.log("rrrr")
            console.log(this.page, this.pageCount)
            console.log(this.$store.state.discounts)
            console.log(this.page, this.pageCount);
            this.$store.commit('setDisPage', this.page)
            console.log(this.$store.state.disPage)
            console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
            const goNext = () => {
              if(this.$store.state.filterRequest === false){
                console.log('zzzz');
                this.nextDiscount(
                    {
                      "searchText": this.$store.state.keyWord,
                      "searchDiscountOption": "All",
                      "searchAddressCountry": "Украина",
                      "searchAddressCity": "Винница",
                      "searchSortFieldOption": "RatingDiscount",
                      "searchSortOption": "Asc",
                      "searchPaginationPageNumber": this.pageCount + 1,
                      "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                      "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                    }
                )
              }else{
                console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
                console.log(this.$store.state.filtered.range)
                this.nextDiscount(
                    {
                      "searchText": this.$store.state.keyWord,
                      "searchDiscountOption": "All",
                      "searchAddressCountry": "Украина",
                      "searchAddressCity": "Винница",
                      "searchSortFieldOption": "NameDiscount",
                      "searchSortOption": "Asc",
                      "searchPaginationPageNumber": this.pageCount + 1,
                      "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                      "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En",
                      "searchAdvanced": {
                        "companyName": this.$store.state.filtered.vendor,
                        "searchDate": {
                          "startDate": this.$store.state.filtered.rangeDate[0],
                          "endDate": this.$store.state.filtered.rangeDate[1],
                        },
                        "searchAmountOfDiscount": {
                          "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
                          "searchAmountOfDiscountMax": this.$store.state.filtered.range[1],
                        },
                        "searchRatingTotal": {
                          "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
                          "searchRatingTotalMax": this.$store.state.filtered.starRange[1],
                        }
                      }
                    }
                );
              }

            }
            this.getToken(goNext)
          },
        },
        computed: {
          visibleCards: function() {
            this.$store.commit('setItemsPerPage', this.itemsPerPage)
            console.log(this.$store.state.itemsPerPage)
            this.page = this.$store.state.disPage;
            this.searchWord = this.$store.state.keyWord;
            let arr = [];
            let info = this.allDiscounts.slice((this.page - 1)* this.$store.state.itemsPerPage, this.page* this.$store.state.itemsPerPage);
            console.log(info)
            info.map(item => {
              arr.push({
                id: item.id,
                service: item.name,
                vendor: item.company.name,
                amountOfDiscount: item.amountOfDiscount,
                startDate: moment(item.startDate.$date).format('L'),
                endDate: moment(item.endDate.$date).format('L'),
                rating: item.ratingTotal,
                description: item.description,
                tags: item.tags,
                picture: item.pictureUrl
              })
            })
            return this.results = arr;

          },
            paginationLength: function() {
              console.log(Math.ceil(this.allDiscounts.length/this.$store.state.itemsPerPage));
              return this.pageCount = Math.ceil(this.allDiscounts.length/this.$store.state.itemsPerPage)
            },
            ...mapGetters(["allDiscounts"]),

    }}
</script>
<style scoped>
</style>
