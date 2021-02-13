<template>
    <div>
        <v-select
                :items="countries"
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
    export default {
        name: "ChooseOfTown",
        data() {
            return {
                selectedCountry: null,
                selectedCity: null
            }
        },
        props: ['countries', 'cities','selectCountry', 'selectCity'],
        methods: {
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
