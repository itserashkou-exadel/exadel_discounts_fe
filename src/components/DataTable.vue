<template>
    <v-row align="center">
        <v-col cols="12" lg="8" offset-lg="2" md="10" offset-md="1" sm="10" offset-sm="1" >
            <v-data-table
                    :headers="headers"
                    :items="offers"
                    sort-by="calories"
                    class="elevation-8"
                    mobile-breakpoint="800px"
                    :elevation="12"
            >
                <template v-slot:top>
                    <v-toolbar
                            flat
                    >
                        <v-toolbar-title class="ml-4"><h2>Services</h2></v-toolbar-title>

                        <v-spacer></v-spacer>
                        <v-dialog
                                v-model="dialog"
                                max-width="500px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    New Item
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.name"
                                                        label="Offer name"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.calories"
                                                        label="Vendor"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Discount"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.carbs"
                                                        label="Start date"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.protein"
                                                        label="Finish date"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
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
            </v-data-table>
        </v-col>
    </v-row>


</template>

<script>
    export default {
        name: "DataTable",
        data: () => ({
            dialog: false,
            dialogDelete: false,
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
                { text: 'Actions', value: 'actions', sortable: false },
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
                    },
                    {
                        name: 'Nuggets',
                        discount: 60,
                        vendor: 'KFC',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                    }, {
                        name: 'Iced Coffee',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                    }, {
                        name: 'Sausage Burrito',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                    },
                    {
                        name: 'Egg McMuffin',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                    },
                    {
                        name: 'Big Mac®',
                        discount: 50,
                        vendor: 'MacDonalds',
                        start_date: '20.01.2021',
                        finish_date: '25.01.2021',
                        rating: 4.0,
                    },
                ]
            },

            editItem(item) {
                this.editedIndex = this.offers.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
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

</style>
