<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <choose-of-town/>
            </v-col>
            <v-col>
                <date-piker/>
                <v-btn
                        block
                        @click="generate"
                >Сформировать
                </v-btn>
            </v-col>
        </v-row>
        <v-card
                class="mx-auto"
                tile
        >
            <v-list shaped>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                >
                    <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.value"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-container>
</template>
<script>
    import ChooseOfTown from "@/components/ChooseOfTown";

    const moment = require('moment')
    import Card from '../components/Card.vue'
    import SwitchButton from "@/views/SwitchButton";
    import Modal from "@/components/Filter/Modal";
    import token from '@/mixins/token.mixin'
    import DatePiker from "@/components/DatePiker";
    import axios from 'axios'

    export default {
        name: "Cards",
        mixins: [token],
        components: {DatePiker, ChooseOfTown, Modal, SwitchButton, Card},
        data: () => ({
            selectedItem: 1,
            items: [
                {text: 'discountsTotal', value: '100'},
                {text: 'ratedTotal', value: '100'},
                {text: 'inFavoritesListTotal', value: '200'},
                {text: 'viewsTotal', value: '300'},
                {text: 'subscriptionsTotal', value: '400'},
            ],
        }),
        methods: {
            generate() {
                const getStatistic = () => {
                    axios.post('https://localhost:9001/api/v1/statistics/discounts', {}).then(
                        (data) => console.log(data))
                }
                this.getToken(getStatistic);
            }

        }
    }
</script>
<style scoped>
</style>
