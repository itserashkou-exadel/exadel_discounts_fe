<template>
    <v-container fluid>
        <v-card>
            <v-row :data="filterData" >
                <v-col lg="4"
                       sm="12"
                       md="6"
                       v-for="result in results"
                       :key="result.id"
                       >
                    <div class="d-flex justify-center">
                        <Card
                                :description="result"
                        />
                    </div>
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
                            id: item.id,
                            service: item.name,
                            vendor: item.company.name,
                            amountOfDiscount: item.amountOfDiscount,
                            startDate: moment(item.startDate.$date).format('L'),
                            endDate: moment(item.endDate.$date).format('L'),
                            rating: item.ratingTotal,
                            description: item.description,
                            tags: item.tags,
                            picture: item.pictureUrl
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
