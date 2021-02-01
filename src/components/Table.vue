<template>
    <v-container fill-height>
      <router-view/>
        <v-row class="justify-center align-center">
            <v-col cols="12" lg="10" md="12" sm="10">
                <v-data-table
                        :headers="headers"
                        :items="offers"
                        class="elevation-8"

                        show-expand
                        item-key="name"
                        :single-expand="singleExpand"
                        :expanded.sync="expanded"
                        mobile-breakpoint="900px"
                >

                    <template v-slot:top>
                        <v-toolbar
                                flat
                        >
                            <v-toolbar-title><h2>Services</h2></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-dialog
                                    v-model="dialog"
                                    max-width="500px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                 <v-btn  @click="$router.push({name:'add_discount', params: {placeOfCall: 'newDiscount'}})"
                                            color="primary"
                                            dark
                                            class="mb-2"
                                            v-bind="attrs"
                                            v-on="on"
                                    >
                                        New Item
                                    </v-btn>
                                </template>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="headline">Are you sure you want to delete this item?
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                    <template v-slot:no-data>
                        <v-btn
                                color="primary"
                                @click="initialize"
                        >
                            Reset
                        </v-btn>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-row justify="center" align="center" class="my-5">
                                <v-col cols="1">
                                    <v-btn>
                                        <v-icon color="orange">{{icons.icon}}</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="7" align-self="start">
                                    <h2 >Details about "{{item.name}}"</h2>
                                </v-col>
                                <v-col  cols="12" md="9" class="inform">
                                    <p class="mb-0">More info about {{ item.info }}</p>
                                </v-col>
                                <v-col cols="12"  class="text-center">
                                    <v-btn
                                            color="primary"
                                    >
                                        More info
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </td>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import router from "@/router";
    export default {
        name: "Table",
        data: () => ({
            expanded: [],
            singleExpand: true,
            dialog: false,
            dialogDelete: false,
            icons: {
                icon: "mdi-star"
            },
            headers: [
                {
                    text: 'Offer',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Vendor', value: 'vendor'},
                {text: 'Discount', value: 'discount'},
                {text: 'Start date', value: 'start_date'},
                {text: 'Finish date', value: 'finish_date'},
                {text: 'Rating', value: 'rating'},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            offers: [],
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
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },
        created() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.offers = [
                    {
                        name: 'Hamburger',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 5.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    },
                    {
                        name: 'Nuggets',
                        discount: 60,
                        vendor: 'KFC',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    }, {
                        name: 'Iced Coffee',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    }, {
                        name: 'Sausage Burrito',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    },
                    {
                        name: 'Egg McMuffin',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    },
                    {
                        name: 'Big Mac®',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
                            'sesd do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                            'Id neque aliquam vestibulum morbi. Lacus vestibulum sed arcu non odio. ' +
                            'Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. ' +
                            'Duis ut diam quam nulla porttitor massa id. ' +
                            'Erat nam at lectus urna duis convallis convallis tellus.'
                    },
                ]
            },
            editItem(item) {
                // this.editedIndex = this.offers.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
                this.$router.push({name:'add_discount', params: {placeOfCall: 'editingOfDiscount', idOfDiscount: item.id}})
            },
            deleteItem(item) {
                this.editedIndex = this.offers.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm() {
                this.offers.splice(this.editedIndex, 1)
                this.closeDelete()
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
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
    .inform{
        text-align: left;
    }

</style>
