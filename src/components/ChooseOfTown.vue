<template>
    <div>
        <v-select
                :items="getCountry(countriesAndTowns)"
                label="Choose country"
                outlined
                v-model="selectedCountry"
        ></v-select>
        <v-select
                :items="getSelectedCountry()"
                label="Choose town"
                outlined
        ></v-select>
    </div>
</template>

<script>
    export default {
        name: "ChooseOfTown",
        data() {
            return {
                selectedCountry: null
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
        }
    }
</script>

<style scoped>

</style>