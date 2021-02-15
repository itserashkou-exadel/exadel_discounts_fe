<template>
    <v-card
            class="mx-4 my-12"
            max-width="370px"
            max-height="800px"
    >
        <div>
            <v-img
                    height="250"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    class="white--text "
            >
                <div>
                    <v-avatar size="59" color="red" class=" mx-3 my-3"><b>{{description.amountOfDiscount}}%</b>
                    </v-avatar>
                </div>
            </v-img>
        </div>
        <v-row align="start" justify="space-between">
            <v-col>
                <div>
                    <v-card-title>
                        {{ description.service +" dadasdaskjdsakjdndadsadadasdasdasdasdasda"}}
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
            <v-icon v-on:click="iconSwitch"
                    class="mr-7 mt-7" large>>

                {{ card }}
            </v-icon>
        </v-row>
        <v-divider></v-divider>
        <v-card-subtitle v-if="description.description.length<120">
            <b>Description:<br></b>
            {{description.description.substring(0,120)}}
        </v-card-subtitle>
        <v-card-subtitle v-else>
            <b>Description:<br></b>
            {{description.description.substring(0,120) + " ..."}}
        </v-card-subtitle>
        <v-sheet>
            <v-chip-group
                    show-arrows
                    class="v-slide-group--has-affixes v-slide-group__next"
                    active-class="light-blue accent-4 white--text">
                <v-chip v-for="tag in description.tags"
                        :key="tag"
                > {{tag}}
                </v-chip>
            </v-chip-group>
        </v-sheet>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>

                <v-card-title class="headline">Вы уверены, что хотите удалить эту скидку
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row class="mt-4 ml-4 pb-6" align="center" justify="space-between">
            <v-btn @click="$router.push({name:'detail'})" color="blue" raised>
                Choose
            </v-btn>
            <div class="mr-12">
                <v-icon @click="editItem(description)">
                    mdi-pencil
                </v-icon>
                <v-icon class="ml-4" @click="deleteItem(description)">
                    mdi-delete
                </v-icon>
            </div>
        </v-row>
    </v-card>
</template>
<script>
    import {mapActions} from "vuex";
    const moment = require('moment')
    export default {
        name: "Card",
        data: () => ({

            dialogDelete: false,
            editedIndex: -1,
            dialog: false,
            card: "mdi-heart-outline",
            offers: [],
            info: [],
            result: [],
            editedItem: {
                name: '',
                vendor: '',
                discount: 0,
                start_date: 0,
                finish_date: 0,
                raring: 0
            },


        }),
        props: {
            description: {
                type: Object,
                required: true
            }
        },
        methods: {
            iconSwitch() {
                if (this.card === "mdi-heart-outline")
                    this.card = "mdi-heart"
                else
                    this.card = "mdi-heart-outline"
            },

            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount']),
            headers() {
                return [
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
                ]
            },

            editItem(item) {
                this.$router.push({
                    name: 'add_discount',
                    params: {placeOfCall: 'editingOfDiscount', idOfDiscount: item.id}
                });
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
