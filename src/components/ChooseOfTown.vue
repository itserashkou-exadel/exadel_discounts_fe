<template>
    <div>
        <v-select
                :items="getCountry(countriesAndTowns)"
                :label="this.$t('adLabelOfDiscountCountry')"
                outlined
                v-model="selectedCountry"
        ></v-select>
        <v-select
                :items="getSelectedCountry()"
                :label="this.$t('adLabelOfDiscountCity')"
                outlined
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
        props: ['countriesAndTowns'],
        methods: {
            getCountry(arr) {
                const countries = arr.map(element => element.country)
                return countries
            },
            getSelectedCountry() {
                const towns = this.countriesAndTowns.filter(element => element.country === this.selectedCountry)
                .map(element => element.town)
                return towns
            }
        },
        watch: {
            selectedCountry () {
                this.$emit('selectedCountry', this.selectedCountry);
            },
            selectedTown () {
                this.$emit('selectedCity', this.selectedCity);
            }
        }
    }
</script>

<style scoped>

</style>