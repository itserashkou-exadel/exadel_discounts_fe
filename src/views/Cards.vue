<template>
    <v-container fluid>
        <v-card>
            <v-row :data="filterData" >
                <v-col lg="4"
                       sm="12"
                       md="6"
                       v-for="result in results"
                       :key="result.id"
                       class="d-flex justify-center">
                    <Card
                            :description="result"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
    const moment = require('moment')
    import Card from '../components/Card.vue'
    import SwitchButton from "@/views/SwitchButton";
    import Modal from "@/components/Filter/Modal";
    import {mapGetters} from 'vuex'

    export default {
        name: "Cards",
        components: {Modal, SwitchButton, Card},
        data: () => ({
                // descriptions: [
                //     {
                //         id: 1,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                //     {
                //         id: 2,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                //     {
                //         id: 3,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                //     {
                //         id: 4,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                //     {
                //         id: 5,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                //     {
                //         id: 6,
                //         name: "Burger",
                //         discount: 50,
                //         rating: 4,
                //         info: " lorem ipsum balbalba orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalba\n" +
                //             "            orem ipsum balbalbaorem ipsum balbalba...",
                //         tags: [
                //             "tag", "tagz", "tagsd"
                //         ]
                //     },
                // ],
                info: [],
                results:[]
        }),
        computed: {
            ...mapGetters(["allDiscounts"]),
            filterData: function (){
                const arr = [];
                this.info = this.allDiscounts;
                this.info.map((item) => {
                    arr.push(
                        {
                            id: item._id,
                            service: item.name,
                            vendor: item.company.name,
                            amountOfDiscount: item.amountOfDiscount,
                            startDate: moment(item.startDate.$date).format('L'),
                            endDate: moment(item.endDate.$date).format('L'),
                            rating: item.ratingTotal,
                            description: item.description,
                            tags: item.tags
                        }
                    )

                })
                this.results = arr;
                return this.results;


            },
    }}
</script>
<style scoped>
</style>
