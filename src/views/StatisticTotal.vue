<template>
    <v-container fluid>
        <v-form ref="form">
            <v-row>
                <v-col>
                    <v-list-item-title>{{$t('dateOfCreatedOfDiscount')}}</v-list-item-title>
                    <date-piker
                            class="mt-16"
                            v-on:selectedDateStart="setStartDate"
                            v-on:selectedDateFinish="setFinishDate"
                    />
                </v-col>
                <v-col>
                    <ChooseOfTown
                            v-on:selectedCountryForObj="setCountry"
                            v-on:selectedCityForObj="setCity"
                    />
                </v-col>
            </v-row>
                <v-btn
                        block
                        @click="clearAll"
                >{{$t('ClearAll')}}
                </v-btn>
                <v-btn class="mt-10"
                        block
                        @click="generate"
                >{{$t('Form')}}
                </v-btn>
                <v-col>

                </v-col>

            <v-card
                    class="mx-auto"
                    tile
            >
                <v-list shaped>
                    <v-subheader>REPORTS</v-subheader>
                    <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                    >
                        <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.value"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-form>
    </v-container>
</template>
<script>
    import ChooseOfTown from "@/components/ChooseOfTown.vue";
    import token from '@/mixins/token.mixin'
    import DatePiker from "@/components/DatePiker";
    import axios from 'axios'

    const moment = require('moment')

    export default {
        name: "StatisticTotal",
        mixins: [token],
        components: {DatePiker, ChooseOfTown},
        data: () => ({
            selectedItem: 1,
            items: [
                {text: 'discountsTotal', value: '0'},
                {text: 'ratedTotal', value: '0'},
                {text: 'inFavoritesListTotal', value: '0'},
                {text: 'viewsTotal', value: '0'},
                {text: 'subscriptionsTotal', value: '0'},
            ],
            country: '',
            city: '',
            startDate: '',
            finishDate: ''
        }),
        methods: {
            clearAll() {
                this.$refs.form.reset();
                this.items[0].value = 0
                this.items[1].value = 0
                this.items[2].value = 0
                this.items[3].value = 0
                this.items[4].value = 0
            },
            setCountry(country) {
                this.country = country
            },
            setCity(city) {
                this.city = city
            },
            setStartDate(date) {
                this.startDate = `${date}T00:00:00.459Z`
            },
            setFinishDate(date) {
                this.finishDate = `${date}T23:59:59.459Z`
            },
            generate() {
                const getStatistic = () => {
                    let surchObj = {
                        createStartDate: this.startDate,
                        createEndDate: this.finishDate,
                        searchAddressCountry: this.country,
                        searchAddressCity: this.city
                    }
                    axios.post('https://localhost:9001/api/v1/statistics/discounts', surchObj).then(
                        (data) => {
                            this.items[0].value = data.data.discountsTotal;
                            this.items[1].value = data.data.ratedTotal;
                            this.items[2].value = data.data.favoritesTotal;
                            this.items[3].value = data.data.viewsTotal;
                            this.items[4].value = data.data.subscriptionsTotal;
                        }
                    )
                }
                this.getToken(getStatistic);
            }
        }
    }
</script>
<style scoped>
</style>
