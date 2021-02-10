<template>
    <div>
        <v-select
                :items="getCountry(countriesAndTowns)"
                :label="this.$t('adLabelOfDiscountCountry')"
                outlined
                v-model="selectedCountry"
                @change="selectCountryHandler"
        ></v-select>
        <v-select
                :items="getSelectedCountry()"
                :label="this.$t('adLabelOfDiscountCity')"
                outlined
                @change="selectCityHandler"
                v-model="selectedCity"
        ></v-select>
    </div>
</template>

<script>
    export default {
        name: "ChooseOfTown",
        data() {
            return {
                selectedCountry: null,
                selectedCity: null
            }
        },
        props: ['countriesAndTowns', 'selectCountry', 'selectCity'],
        methods: {
            getCountry(arr) {
                const countries = arr.map(element => element.country)
                return countries;

            },
            getSelectedCountry() {
                const towns = this.countriesAndTowns.filter(element => element.country === this.selectedCountry)
                .map(element => element.town)
                return towns
            },
            selectCountryHandler(value){
                this.$emit('selectedCountryForObj', value);
               this.selectCountry(value);
            },
            selectCityHandler(value){
                this.$emit('selectedCityForObj', value);
               this.selectCity(value);
            }
        }
    }
</script>

<style scoped>

</style>
