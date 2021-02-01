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
                // for (let i = 0; i < arr.length; i++) {
                //     countries.push(arr[i].country)
                // }
                return countries
            },
            getSelectedCountry() {
                const towns = []
                for (let i = 0; i < this.countriesAndTowns.length; i++) {
                    if (this.countriesAndTowns[i].country === this.selectedCountry) {
                        towns.push(this.countriesAndTowns[i].town)
                    }
                }
                return towns
            }
        }
    }
</script>

<style scoped>

</style>