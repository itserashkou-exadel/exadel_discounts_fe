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
                hide-default-footer
                :page.sync="page"
                @page-count="pageCount = $event"
                :items-per-page="itemsPerPage"
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
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">{{$t('dtOk')}}</v-btn>
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
                        @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-row class="d-flex justify-end my-5">
                        <v-col cols="1" lg="1" >
                            <v-btn>
                                <v-icon @click="showId(item.id)" color="orange">{{icons.icon}}</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="7" lg="11" class="d-flex justify-center">
                            <h2 >{{$t('dtDetailsAbout')}} "{{item.service}}"</h2>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="11" lg="11" class="d-flex justify-center">
                            <p class="mb-0">{{ item.description }}</p>
                        </v-col>
                        <v-col cols="11" lg="11" class="text-center">
<!--                            <v-btn-->
<!--                                    color="primary"-->
<!--                                    @click="$router.push({name:'detail'})"-->
<!--                            >-->
                          <v-btn
                              color="primary"
                              @click="$router.push({name:'detail',params:{_id:item.id}})"
                          >
                                {{$t('dtMoreInfo')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </td>
            </template>
            <template v-slot:footer>
                    <v-row class="mt-5">
                        <v-col xl="7" lg="7" md="7" sm="7" class="d-flex justify-end mr-xl-10">
                            <v-pagination
                                    v-model="page"
                                    :length="pageCount"
                                    @input="next"
                            ></v-pagination>
                        </v-col>
                        <v-spacer>
                        </v-spacer>
                        <v-col xl="1" lg="2" md="2" sm="2">
                            <v-select
                                    v-model="itemsPerPage"
                                    :items="itmPer"
                                    label="items per page"
                                    dense
                                    solo
                            ></v-select>
                        </v-col>
                        <v-col xl="1" lg="1"></v-col>
                    </v-row>
            </template>
        </v-data-table>
    </v-col>
</template>

<script>
    import axios from "axios";
    import AuthService from "@/services/auth.service";
    const auth = new AuthService();
    const moment = require('moment')
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import Modal from "@/components/Filter/Modal";
    import token from '@/mixins/token.mixin'
    export default {
        components: {Modal},
        name: "DataTable",
        data: () => ({
            deleteID: null,
            searchWord: '',
            itmPer: [5, 10],
            selectedPages: [],
            page: 1,
            pageCount: 1,
            itemsPerPage: 5,
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
                id: '',
                service: '',
                vendor: '',
                amountOfDiscount: 0,
                startDate: '',
                endDate: '',
                rating: 0,
                description: ''
            },
            defaultItem: {
                id: '',
                service: '',
                vendor: '',
                amountOfDiscount: 0,
                startDate: '',
                endDate: '',
                rating: 0,
                description: ''
            },

        }),
        mixins: [token],
        computed: {
            filterData: function () {
                if (this.$store.state.discounts.length > 0) {
                    const arr = [];
                    this.page = this.$store.state.disPage;
                    this.searchWord = this.$store.state.keyWord;
                    // console.log(this.searchWord)
                    this.info = this.$store.state.discounts;
                    // console.log(this.info)
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
                            }
                        )

                    })
                    this.result = arr;
                    // console.log(this.result);
                    return this.result;
                }

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
            searchWord: function(){
                this.selectedPages = [1];
            },
            // result: function(){
            //     console.log('res')
            //     this.selectedPages.push(this.page)
            // }
            /*itemsPerPage: function(){
                console.log(this.itemsPerPage)
                this.changeItemsPerPage(this.itemsPerPage);
                this.inputPost(
                    {
                        "searchText": 'Меха',
                        "searchDiscountOption": "All",
                        "searchAddressCountry": "Украина",
                        "searchAddressCity": "Вінниця",
                        "searchSortFieldOption": "NameDiscount",
                        "searchSortOption": "Asc",
                        "searchPaginationPageNumber": 1,
                        "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                        "searchLanguage": "Ru"
                    }
                )
            }*/
            /*  itemsPerPage: function () {
                  this.inputPost(
                      {
                          "searchText": 'Меха',
                          "searchDiscountOption": "All",
                          "searchAddressCountry": "Украина",
                          "searchAddressCity": "Вінниця",
                          "searchSortFieldOption": "NameDiscount",
                          "searchSortOption": "Asc",
                          "searchPaginationPageNumber": 1,
                          "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                          "searchLanguage": "Ru"
                      }
                  )
              }*/
        },

        methods: {
            ...mapActions(['goFetch', 'changeItemsPerPage', 'inputPost', 'nextDiscount']),
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
            next() {
                console.log(this.page, this.pageCount)
                console.log(this.selectedPages)
                console.log(this.selectedPages.indexOf(this.page))
                // console.log(this.$store.state.discounts)
                console.log(this.page, this.pageCount);
                    // console.log(this.page,this.pageCount)
                this.$store.commit('setDisPage', this.page)
                console.log(this.$store.state.disPage)
                const goNext = () => {
                    if(this.$store.state.filterRequest === false){
                        this.nextDiscount(
                            {
                                "searchText": this.$store.state.keyWord,
                                "searchDiscountOption": "All",
                                "searchAddressCountry": "Украина",
                                "searchAddressCity": "Винница",
                                "searchSortFieldOption": "NameDiscount",
                                "searchSortOption": "Asc",
                                "searchPaginationPageNumber": this.pageCount + 1,
                                "searchPaginationCountElementPerPage": this.itemsPerPage,
                                "searchLanguage": "Ru"
                            }
                        )
                    }else{
                        console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
                        this.inputPost(
                            {
                                "searchText": this.$store.state.keyWord,
                                "searchDiscountOption": "All",
                                "searchAddressCountry": "Украина",
                                "searchAddressCity": "Винница",
                                "searchSortFieldOption": "NameDiscount",
                                "searchSortOption": "Asc",
                                "searchPaginationPageNumber": this.pageCount + 1,
                                "searchPaginationCountElementPerPage": 5,
                                "searchLanguage": "Ru",
                                "searchAdvanced": {
                                    "companyName": this.$store.state.filtered.vendor,
                                    "searchDate": {
                                        "startDate": this.$store.state.filtered.rangeDate[0],
                                        "endDate": this.$store.state.filtered.rangeDate[1],
                                    },
                                    "searchAmountOfDiscount": {
                                        "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
                                        "searchAmountOfDiscountMax": this.$store.state.filtered.range[1],
                                    },
                                    "searchRatingTotal": {
                                        "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
                                        "searchRatingTotalMax": this.$store.state.filtered.starRange[1],
                                    }
                                }
                            }
                        );
                    }

                }
                this.getToken(goNext)
            },

            deleteDiscount(){
                let itemID = this.deleteID;
                const goDelete = () => {
                    console.log(itemID)
                    let url = 'https://localhost:9001/api/v1/discounts/delete/';
                    url += itemID;
                    axios.delete(url);
                     this.$store.state.discounts = this.$store.state.discounts.filter(item => item.id !== itemID);
                     console.log(this.info)
                }
                this.getToken(goDelete)
            },

            showId(id){
              console.log(id);
            },

            test(){
                this.inputPost(
                    {
                        "searchText": 'Меха',
                        "searchDiscountOption": "All",
                        "searchAddressCountry": "Украина",
                        "searchAddressCity": "Вінниця",
                        "searchSortFieldOption": "NameDiscount",
                        "searchSortOption": "Asc",
                        "searchPaginationPageNumber": 1,
                        "searchPaginationCountElementPerPage": 15,
                        "searchLanguage": "Ru"
                    }
                )

                console.log(this.$store.state.discounts)

                setTimeout(this.test_2,1000)
            },

            test_2(){
                this.inputPost(
                    {
                        "searchText": 'Меха',
                        "searchDiscountOption": "All",
                        "searchAddressCountry": "Украина",
                        "searchAddressCity": "Вінниця",
                        "searchSortFieldOption": "NameDiscount",
                        "searchSortOption": "Asc",
                        "searchPaginationPageNumber": 2,
                        "searchPaginationCountElementPerPage": 5,
                        "searchLanguage": "Ru"
                    }
                )

                console.log(this.$store.state.discounts)
            },
            showSelect() {
                console.log(this.$store.state.itemsPerPage);
            },
            editItem(item) {
                this.$router.push({
                    name: 'add_discount',
                    params: {placeOfCall: 'editingOfDiscount', idOfDiscount: item.id}
                });
            },
            deleteItem(id) {
                this.deleteID = id;
                this.dialogDelete = true;
            },
            deleteItemConfirm(id) {
                this.deleteDiscount(id);
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
                    Object.assign(this.result[this.editedIndex], this.editedItem)
                } else {
                    this.result.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>
