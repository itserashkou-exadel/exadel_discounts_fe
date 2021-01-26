<template>

                <v-card
                        class="mx-4 my-12"
                        max-width="374"
                        height="auto"
                >
                    <div>
                        <v-img
                                height="250"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                class="white--text "
                        >
                            <div>
                                <v-avatar size="59" color="red" class=" mx-3 my-3"><b>{{description.discount}}%</b>
                                </v-avatar>
                            </div>
                        </v-img>
                    </div>
                    <div>
                        <v-card-title>
                            {{ description.name }}
                        </v-card-title>
                    </div>
                    <v-row
                            align="center"
                            class="ml-3 mt-n4 mb-3"
                    >
                        <v-rating
                                :value="description.rating"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                        ></v-rating>
                        <div class="grey--text ml-2">
                            {{description.rating}}
                        </div>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        <b>Description:<br></b>
                        {{description.info}}
                    </v-card-subtitle>
                    <v-chip-group active-class="light-blue accent-4 white--text">
                        <v-chip v-for="tag in description.tags"
                                :key="tag"
                                class="ml-4"> tag
                        </v-chip>
                    </v-chip-group>
                    <v-btn class="ma-4" color="blue" raised>
                        Choose
                    </v-btn>
                </v-card>

</template>
<script>
    export default {
        name: "Card",
        props: {
            description: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>