<template>
    <div>
        <v-select
                :items="allCountries"
                :label="this.$t('adLabelOfDiscountCountry')"
                outlined
                v-model="selectedCountry"
                @change="selectCountryHandler"
        ></v-select>
        <v-select
                :items="cities"
                :label="this.$t('adLabelOfDiscountCity')"
                outlined
                @change="selectCityHandler"
                v-model="selectedCity"
        ></v-select>
    </div>
</template>

<script>
    import axios from 'axios'
    import token from '@/mixins/token.mixin'
    import {mapGetters} from 'vuex'

    const moment = require('moment')


    export default {
        name: "ChooseOfTown",
        data() {
            return {
                selectedCountry: null,
                selectedCity: null,
                countries: [],
                cities: [],
            }
        },
        computed: {
            ...mapGetters(['allCountries'])
        },
        mixins: [token],
        methods: {
            selectCountryHandler(value) {
                this.$emit('selectedCountryForObj', value);
                this.selectedCity = '';
                this.getCities()
            },
            selectCityHandler(value) {
                this.$emit('selectedCityForObj', value);
            },
            getCities() {
               const funcForCities = () => {
                   let languageForCountries = (this.$i18n.locale === 'ru' ? 'Ru' : 'En');

                axios.get(`${process.env.VUE_APP_URL_SWAGGER}/api/v1/addresses/all/${languageForCountries}/cities/${this.selectedCountry}`)
                    .then((response) =>
                        this.cities = response.data
                    )}
                    this.getToken(funcForCities);
            },
        },
        async mounted() {
            if (this.$route.params.placeOfCall === 'editingOfDiscount') {
                const id = this.$route.params.idOfDiscount;
                const funcForCountries = () => {
                    axios.get(`${process.env.VUE_APP_URL_SWAGGER}/v1/discounts/upsert/get/${id}`).then((response) => {
                        const discount = response.data;
                        if (this.$store.getters.language === 'Ru') {
                            this.selectedCountry = discount.address.country || discount.translations[0].address.country;
                            this.selectedCity = discount.address.city || discount.translations[0].address.country;}
                        if (this.$store.getters.language === 'En') {
                            this.selectedCountry = discount.translations[0].address.country || discount.address.country;
                            this.selectedCity = discount.translations[0].address.city || discount.address.city}
                        this.getCities();
                        }
                    )
                }
                this.getToken(funcForCountries)

            }
        },
    }
</script>

<style scoped>

</style>
