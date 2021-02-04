<template>
    <v-app>
    <v-container>
        <v-card>
            <v-row no-gutters class="mx-12 justify-center">

                <v-col lg="4"
                       md="6"
                       sm="12"
                       class="d-flex justify-center"
                       v-for="description in descriptions"
                       :key="description.id">
                    <Card
                            :description="description"
                    />
                </v-col>
            </v-row>
        </v-card>

    </v-container>
    </v-app>
</template>
<script>
    import Card from '../components/Card.vue'
    import SwitchButton from "@/views/SwitchButton";
    import Modal from "@/components/Filter/Modal";

    export default {
        name: "Cards",
        components: {Modal, SwitchButton, Card},
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
                            "tag", "tagz", "tagsd"
                        ]
                    },
                    {
                        id: 2,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tagz", "tagsd"
                        ]
                    },
                    {
                        id: 3,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tagz", "tagsd"
                        ]
                    },
                    {
                        id: 4,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tagz", "tagsd"
                        ]
                    },
                    {
                        id: 5,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tagz", "tagsd"
                        ]
                    },
                    {
                        id: 6,
                        name: "Burger",
                        discount: 50,
                        rating: 4,
                        info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalba\n" +
                            "            orem ipsum balbalbaorem ipsum balbalba...",
                        tags: [
                            "tag", "tagz", "tagsd"
                        ]
                    },
                ],

            }
        },

    }
</script>
<style scoped>
</style>
