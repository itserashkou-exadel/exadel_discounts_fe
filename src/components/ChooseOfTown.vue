<template>
    <div>
        <v-select
                :items="getCountry(countriesAndTowns)"
                label="Choose country"
                outlined
                v-model="selectedCountry"
                @click="setSelectedCountry"
        ></v-select>
        <v-select
                :items="getTown(countriesAndTowns, selectedCountry)"
                label="Choose town"
                outlined
        ></v-select>
    </div>
</template>

<script>
    export default {
        name: "ChooseOfTown",
        data () {
            return {
                selectedCountry: 'gh'
            }
        },
        props: ['countriesAndTowns'],
        methods: {
            getCountry(arr) {
                const countries = [];
                for (let i = 0; i < arr.length; i++){
                    countries.push(arr[i].country)
                }
                return countries
            },
            getTown(arr, country) {
                console.log(country)
                console.log(2);
                const towns = [];
                for (let i = 0; i < arr.length; i++){
                  //  if (arr.country === country){
                    towns.push(arr[i].town)
                }
                return towns
            },
            setSelectedCountry () {
                console.log(typeof(this.selectedCountry))
            }
            // select(town) {
            //     console.log(town);
            //     this.$emit('select', town)

            }
    }
</script>

<style scoped>

</style>