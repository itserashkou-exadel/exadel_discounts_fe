<template>
    <v-app>
        <v-app-bar app dark color="primary">

            <v-row>
                <v-col cols="12" md="2" class="pl-10 pt-5">
                    <v-toolbar-title><h1>Logo</h1></v-toolbar-title>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field class="pt-7" label="Search" append-icon="mdi-magnify"></v-text-field>
                </v-col>

            </v-row>
            <v-row justify="end">
                <v-col cols="12" md="1">
                    <v-avatar
                            color="primary"
                            size="56"
                    ></v-avatar>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-content>
            <v-row>
                <v-col cols="12" md="3" class="sidebar">
                    <v-card
                            :loading="loading"
                            class="mx-auto my-12"
                            max-width="374"
                    >
                        <v-img
                                height="200"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        ></v-img>
                        <v-card-title>Croissant <span>-20%</span></v-card-title>
                        <v-card-text>
                            <v-row
                                    align="center"
                                    class="mx-0"
                            >
                                <v-rating
                                        :value="4.5"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="14"
                                ></v-rating>

                                <div class="grey--text ml-4">
                                    4.5 (413)
                                </div>
                            </v-row>

                            <div class="my-4 subtitle-1">
                                $ • Lviv, Cafe
                            </div>

                            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus
                                patio
                                seating.
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Unill 21.01 - 19:00</v-card-title>

                        <v-card-actions>
                            <v-btn
                                    color="deep-purple lighten-2"
                                    text
                                    @click="reserve"
                            >
                                <h3>Apply</h3>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                            :loading="loading"
                            class="mx-auto"
                            max-width="374"
                    >


                        <v-img
                                height="250"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        ></v-img>

                        <v-card-title>Cafe Croissant</v-card-title>

                        <v-card-text>
                            <v-row
                                    align="center"
                                    class="mx-0"
                            >
                                <v-rating
                                        :value="4.5"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="14"
                                ></v-rating>

                                <div class="grey--text ml-4">
                                    4.5 (413)
                                </div>
                            </v-row>

                            <div class="my-4 subtitle-1">
                                $ • Lviv, Cafe
                            </div>

                            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus
                                patio
                                seating.
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Untill 21.01. 19:00</v-card-title>


                        <v-card-actions>
                            <v-btn
                                    color="deep-purple lighten-2"
                                    text
                                    @click="reserve"
                            >
                                <h3>Apply</h3>
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-row>


        </v-content>
        <Footer/>
    </v-app>

</template>

<script>
    import Footer from '@/components/Footer'

    export default {
        name: "Home",
        components: {Footer},
        data: () => ({
            loading: false,
            selection: 1,
        }),

        methods: {
            reserve() {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
        },

        products: [
            {
                id: 1,
                title: "Cafe Croissant",
                discount: '-20%',
                stars: 4,
                location: 'Lviv',
                info: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
                duration: 'Until 21.01 - 19:00'
            },

            {
                id: 2,
                title: "Cafe Julmepe",
                discount: '-23%',
                stars: 5,
                location: 'Kyiv',
                info: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
                duration: 'Until 21.01 - 19:00'
            }
        ]
    }
</script>

<style scoped>
    span {
        color: red;
        margin-left: 10px;
    }

    .sidebar {
        background-color: aliceblue;
    }
</style>
