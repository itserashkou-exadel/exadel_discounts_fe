<template>
    <v-card
            class=" my-12"
            max-width="374"
            height="570"
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
        <v-row align="center" justify="space-between">
            <v-col>
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
            </v-col>
            <v-icon
                    v-on:click="iconSwitch"
                    class="mr-13" large>
                {{ card }}
            </v-icon>
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
        <v-row class="mt-4 ml-4" align="center" justify="space-between">
            <v-btn color="blue" raised>
                <router-link to="/details">Choose</router-link>
            </v-btn>
            <div class="mr-12">
                <v-icon>
                    mdi-pencil
                </v-icon>
                <v-icon class="mr-2 ml-2" >
                    mdi-delete
                </v-icon>
            </div>
        </v-row>
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
            return {
                card: "mdi-heart-outline"
            }
        },
        methods: {
            iconSwitch() {
                if (this.card === "mdi-heart-outline")
                    this.card = "mdi-heart"
                else
                    this.card = "mdi-heart-outline"
            }
        }
    }
</script>

<style scoped>

</style>
