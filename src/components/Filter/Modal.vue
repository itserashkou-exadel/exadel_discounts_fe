<template>

    <v-dialog
            content-class="zero"
            v-model="dialog"
            max-width="600px"

    >
        <template v-slot:activator="{ on, attrs }">

            <v-img max-height="15"
                   max-width="25"
                   src="../../assets/filter.png"
                   v-bind="attrs"
                   v-on="on"
                   class="pointer"
            ></v-img>
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
                    {{$t('fClose')}}
                </v-btn>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="getFilteredData"
                >
                    {{$t('fSave')}}
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
    import AuthService from "@/services/auth.service";
    const auth = new AuthService();
    export default {
        name: "Modal.vue",
        components: {StarSlider, RangeSlider, DataPicker},
        data: () => ({
            dialog: false,
            from: null,
            title: 'From',
            vendor: ''
        }),
        mixins: [token],
        watch:{
            vendor: function(){
                this.changeFilter({
                    ...this.$store.getters.getFilterData,
                    vendor: this.vendor
                })
            }
        },
        methods: {
            ...mapActions(['changeFilter', 'inputPost']),

            getFilteredData() {
                // console.log(this.search)
                // console.log(this.$store.state.keyWord ? this.$store.state.filtered.rangeDate[0] : null)
                this.$store.state.discounts = [];
                console.log(this.$store.state.filtered.vendor)
                console.log(this.$store.state.filtered.vendor ? this.$store.state.filtered.vendor : null)

                const filterSearch = () => {
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 5,
                            "searchLanguage": "Ru",
                            "searchAdvanced": {
                                "companyName": this.$store.state.filtered.vendor ? this.$store.state.filtered.vendor : null,
                                "searchDate": {
                                    "startDate": "2020-9-26",
                                    "endDate": "2022-02-10"
                                },
                                "searchAmountOfDiscount": {
                                    "searchAmountOfDiscountMin": 0,
                                    "searchAmountOfDiscountMax": 99
                                },
                                "searchRatingTotal": {
                                    "searchRatingTotalMin": 0,
                                    "searchRatingTotalMax": 5
                                }
                            }
                        }
                    );
                     }
                this.getToken(filterSearch)
                this.dialog = true;
                console.log(this.$store.state.discounts)
            },

            test: function () {
                // this.$store.state.filtered.vendor === null ? this.$store.state.filtered.vendor : null;
                // "startDate": this.$store.state.filtered.rangeDate[0] === null ? this.$store.state.filtered.rangeDate[0] : null,
                //     "endDate": this.$store.state.filtered.rangeDate[1] === null ? this.$store.state.filtered.rangeDate[1] : null,
                let res = this.$store.state.filtered.vendor === null ? 'I have this field' : 'Empty';
                console.log(res)
            }
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }


</style>
