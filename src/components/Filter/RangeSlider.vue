<template>
    <v-card
            flat
            color="transparent"
    >
        <v-card-text>
            <v-row>

                <v-col class="px-4">
                    <v-range-slider
                            v-model="range"
                            :max="max"
                            :min="min"
                            hide-details
                            class="align-center slider-margin"
                            thumb-label="always"

                    >

                    </v-range-slider>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: "RangeSlider",
        data () {
            return {
                min: 1,
                max: 99,
                range: [1, 99],
            }
        },
        watch:{
            range: function(){
                this.changeFilter({
                    ...this.$store.getters.getFilterData,
                    range: [this.range[0], this.range[1]]
                })
            }
        },
        mounted() {
            this.changeFilter({
                ...this.$store.getters.getFilterData,
                range: [this.range[0], this.range[1]]
            })
        },
        methods: {
            ...mapActions(['changeFilter']),
        }
    }
</script>

<style scoped>

</style>
