<template>
    <v-app>
    <v-container>
        <v-row class="mt-12">
            <v-col lg="4"
                   sm="12"
                   md="6"
                   v-for="description in descriptions"
                   :key="description.id">
                <Card
                        :description="description"
                        />
            </v-col>
        </v-row>
    </v-container>
    </v-app>
</template>
<script>
    import Card from '../components/Card.vue'

    export default {
        name: "Cards",
        data() {
            return {
                descriptions: [
                    {
                        id: 1,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]
                    },
                    {
                        id: 2,
                        name: "Burger",
                        discount: 50,
                        rating: 4.5,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]
                    },
                    {
                        id: 3,
                        name: "Burger",
                        discount: 50,
                        rating: 4.5,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]
                    },
                    {
                        id: 4,
                        name: "Burger",
                        discount: 50,
                        rating: 4.6,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]
                    },
                    {
                        id: 5,
                        name: "Burger",
                        discount: 50,
                        rating: 4.5,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]
                    },
                    {
                        id: 6,
                        name: "Burger",
                        discount: 50,
                        rating: 4.5,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tag", "tag"
                        ]

                    },
                ],

            }
        },
        components: {
            Card
        }
    }
</script>
<style scoped>
</style>