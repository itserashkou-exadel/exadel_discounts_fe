<template>
    <v-card
            flat
            color="transparent"

    >
        <v-card-text class="pa-0">
            <v-range-slider
                    class="slider-margin"
                    v-model="range"
                    :tick-labels="ticksLabels"
                    :min="1"
                    :max="5"
                    step="1"
                    ticks="always"
                    tick-size="5"
                    :thumb-size="10"
                    thumb-color="white"
                    thumb-label="always"
            >
                <template v-slot:thumb-label="props">
                    <v-icon
                            color="yellow"
                            large>
                        mdi-star
                    </v-icon>
                </template>
            </v-range-slider>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "StarSlider",
        data() {
            return {
                value: 0,
                range: [1, 5],
                ticksLabels: [
                    1, 2, 3, 4, 5
                ],

            }
        },

    }
</script>

<style scoped>

</style>
