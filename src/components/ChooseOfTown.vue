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
    import AuthService from "@/services/auth.service";
    const moment = require('moment')
    import axios from 'axios'
    const auth = new AuthService();
    import token from '@/mixins/token.mixin'
    import {mapGetters} from 'vuex'

    export default {
        name: "ChooseOfTown",
        data() {
            return {
                selectedCountry: null,
                selectedCity: null,
                countries: [],
                cities: []
            }
        },
        computed: {
          ...mapGetters(['allCountries'])
        },
        mixins: [token],
       props: ['selectCountry', 'selectCity'],
        methods: {
            selectCountryHandler(value){
                this.$emit('selectedCountryForObj', value);
                this.selectCountry(value);
                this.selectedCity = '';
                this.getCities()
            },
            selectCityHandler(value){
                this.$emit('selectedCityForObj', value);
               this.selectCity(value);
            },
            getCities () {
                const getCities = () => {
                    let languageForCountries = (this.$i18n.locale === 'ru' ? 'Ru' : 'En');
                    axios.get(`https://localhost:9001/api/v1/addresses/all/${languageForCountries}/cities/${this.selectedCountry}`)
                        .then((response) => {
                            this.cities = response.data
                        })

                };
                this.getToken(getCities);
            }
        },
        async mounted() {
            if (this.$route.params.placeOfCall == 'editingOfDiscount') {
                const id = this.$route.params.idOfDiscount;
                const response = await axios.get(`https://localhost:9001/api/v1/discounts/upsert/get/${id}`);
                const discount = response.data;
                this.selectedCountry = discount.address.country || discount.translations[0].address.country;
                this.selectedCity = discount.address.city || discount.translations[0].address.country;
                this.getCities ();
            }
        }
    }
</script>

<style scoped>

</style>
