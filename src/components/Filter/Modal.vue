<template>
    <v-dialog
            v-model="dialog"
            max-width="600px"
    >
<!--        content-class="zero"-->
        <template v-slot:activator="{ on, attrs }">
            <v-icon
                    large
                    v-bind="attrs"
                    v-on="on"
                    color="blue"
                    class="pointer"
                    @click="setTrue">mdi-filter-outline
            </v-icon>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{$t('fFilter')}}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6" lg="6" md="6" sm="6" class="pa-0 pl-3">
                            <h3 class="mt-2">{{$t('dtDate')}}</h3>
                            <DataPicker/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                lg="12"
                        >
                            <h3 class="mb-2">{{$t('fVendor')}}</h3>
                            <v-text-field
                                    class="pt-0"
                                    v-model="vendor"
                            >
                                <v-icon
                                        slot="append"
                                        color="blue"
                                >
                                    mdi-domain
                                </v-icon>
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <h3 class="mb-4">{{$t('fDiscount')}}</h3>
                    <v-row>
                        <v-col cols="12">
                            <RangeSlider/>
                        </v-col>
                    </v-row>
                    <h3 class="pb-4">{{$t('fRating')}}</h3>
                    <v-row class="ml-2">
                        <v-col cols="12" md="12" sm="12">
                            <StarSlider/>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                >
                    {{$t('fCancel')}}
                </v-btn>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="getFilteredData"
                >
                    {{$t('fOk')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions} from "vuex";
    import DataPicker from "@/components/Filter/DataPicker";
    import RangeSlider from "@/components/Filter/RangeSlider";
    import StarSlider from "@/components/Filter/StarSlider";
    import token from '@/mixins/token.mixin'

    export default {
        name: "Modal.vue",
        components: {StarSlider, RangeSlider, DataPicker},
        data: () => ({
            dialog: false,
            from: null,
            title: 'From',
            vendor: null
        }),
        mixins: [token],
        watch: {
            vendor: function () {
                this.changeFilter({
                    ...this.$store.getters.getFilterData,
                    vendor: this.vendor
                })
            }
        },
        methods: {
            ...mapActions(['changeFilter', 'inputPost', 'setFilterRequest', 'setTrueFilterRequest', 'setFilterIcon']),
            setTrue: function(){
    },
    getFilteredData()
    {
        // console.log(this.search)
        // console.log(this.$store.state.keyWord ? this.$store.state.filtered.rangeDate[0] : null)
        this.$store.commit('setTrueFilterRequest');
        this.$store.state.sortOption.sortName = "RatingDiscount";
        this.$store.state.sortOption.sortOrder = [false,false,true,true,true,false];
        this.$store.state.sortOption.sortOrder[5] = false;
        this.$store.state.sortOption.sortIndex = 5;
        this.$store.state.discounts = [];
        this.$store.commit('setDisPage', 1)
        const filterSearch = () => {
            this.inputPost(
                {
                    "searchText": this.$store.state.keyWord,
                    "searchDiscountOption": "All",
                    "searchAddressCountry": this.$store.state.userLocation.country,
                    "searchAddressCity": this.$store.state.userLocation.town,
                    "searchSortFieldOption": "RatingDiscount",
                    "searchSortOption":'Desc',
                    "searchPaginationPageNumber": 1,
                    "searchPaginationCountElementPerPage": 24,
                    "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En",
                    "searchAdvanced": {
                        "companyName": this.$store.state.filtered.vendor,
                        "searchDate": {
                            "searchStartDate": this.$store.state.filtered.rangeDate[0],
                            "searchEndDate": this.$store.state.filtered.rangeDate[1]
                        },
                        "searchAmountOfDiscount": {
                            "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
                            "searchAmountOfDiscountMax": this.$store.state.filtered.range[1]
                        },
                        "searchRatingTotal": {
                            "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
                            "searchRatingTotalMax": this.$store.state.filtered.starRange[1]
                        }
                    }
                }
            );

        }
        this.getToken(filterSearch)
        this.dialog = false;
        // this.$store.commit('changeFilterRequest');
        console.log(this.$store.state.filterRequest)
        console.log(this.$store.state.discounts)
        this.setFilterIcon(true);
    }
    ,

    test: function () {
        // this.$store.state.filtered.vendor === null ? this.$store.state.filtered.vendor : null;
        // "startDate": this.$store.state.filtered.rangeDate[0] === null ? this.$store.state.filtered.rangeDate[0] : null,
        //     "endDate": this.$store.state.filtered.rangeDate[1] === null ? this.$store.state.filtered.rangeDate[1] : null,
        // let res = this.$store.state.filtered.vendor === null ? 'I have this field' : 'Empty';
        console.log(this.$store.state.discounts)
    }
    }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }


</style>
