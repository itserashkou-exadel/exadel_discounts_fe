<template>
    <v-col cols="12" lg="10" md="12" sm="10" class="pb-10">
        <v-data-table
                :headers="headers()"
                :items="result"
                class="elevation-8"
                :data="filterData"
                item-key="id"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
        >

            <template v-slot:top>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>
                        <h3>{{$t('dtServices')}}</h3>
                    </v-toolbar-title>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">{{$t('dtRemoval')}}
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">{{$t('dtCancel')}}</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{$t('dtOk')}}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-row class="d-flex justify-end my-5">
                        <v-col cols="1" lg="1" >
                            <v-btn>
                                <v-icon color="orange">{{icons.icon}}</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="7" lg="11" class="d-flex justify-center">
                            <h2 >{{$t('dtDetailsAbout')}} "{{item.service}}"</h2>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col  cols="11" lg="11" class="d-flex justify-center">
                            <p class="mb-0">{{ item.description }}</p>
                        </v-col>
                        <v-col cols="11" lg="11" class="text-center">
                            <v-btn
                                    color="primary"
                                    @click="$router.push({name:'detail'})"
                            >
                                {{$t('dtMoreInfo')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </td>
            </template>
        </v-data-table>
    </v-col>
</template>

<script>
    const moment = require('moment')
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import Modal from "@/components/Filter/Modal";
    export default {
        components: {Modal},
        name: "DataTable",
        data: () => ({
            expanded: [],
            singleExpand: true,
            dialog: false,
            dialogDelete: false,
            icons: {
                icon: "mdi-star"
            },
            offers: [],
            info: [],
            result: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                vendor: '',
                discount: 0,
                start_date: 0,
                finish_date: 0,
                raring: 0
            },
            defaultItem: {
                name: '',
                vendor: '',
                discount: 0,
                start_date: '',
                finish_date: '',
                raring: 0
            },

        }),

        mounted() {
            this.goFetch(`http://localhost:3000/discounts`);
        },
        computed: {
            filterData: function (){
                const arr = [];
                this.info = this.$store.state.discounts;
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
                        }
                    )

                })
                this.result = arr;
                return this.result;


            },
            hello: () => {
                console.log('heh');
            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },

        methods: {
            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount']),
            headers(){return [
                {
                    text: this.$t('dtOffer'),
                    align: 'left',
                    sortable: false,
                    value: 'service',
                },
                {text: this.$t('dtVendor'), value: 'vendor'},
                {text: this.$t('dtDiscount'), value: 'amountOfDiscount'},
                {text: this.$t('dtStartDate'), value: 'startDate'},
                {text: this.$t('dtFinishDate'), value: 'endDate'},
                {text: this.$t('dtRating'), value: 'rating'},
                {text: this.$t('dtActions'), value: 'actions', sortable: false},
            ]},

            editItem(item) {
                this.$router.push({name:'add_discount', params: {placeOfCall: 'editingOfDiscount', idOfDiscount: item.id}});
            },
            deleteItem(item) {
                this.editedIndex = this.offers.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
            },
            deleteItemConfirm() {
                this.offers.splice(this.editedIndex, 1);
                this.closeDelete();
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                })
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.offers[this.editedIndex], this.editedItem)
                } else {
                    this.offers.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>
