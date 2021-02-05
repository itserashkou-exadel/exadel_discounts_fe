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
    export default {
        name: "RangeSlider",
        data () {
            return {
                min: 0,
                max: 100,
                range: [20, 100],
            }
        },
    }
</script>

<style scoped>

</style>
