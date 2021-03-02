<template>
    <v-col cols="12" lg="10" md="12" sm="10" class="pb-10">
        <v-data-table
                :headers="headers()"
                :items="result"
                class="elevation-8 mb-16"
                :data="filterData"
                item-key="id"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
                hide-default-footer
                :page.sync="page"
                @page-count="pageCount = $event"
                :items-per-page="itemsPerPage"
                :sortCol="sortData"
        >

            <template v-slot:header.CompanyName>
                <div>
                    <button @click="pilik">Вендор</button>
                    <v-icon v-show="sortOption === true && sortOptionName === 'CompanyName' " class="pl-2" dense>mdi-sort-ascending </v-icon>
                    <v-icon v-show="sortOption === false && sortOptionName === 'CompanyName'" class="pl-2" dense>mdi-sort-descending</v-icon>
                </div>
            </template>
            <template v-slot:header.AmountOfDiscount>
                <div class="d-flex">
                    <button @click="pilik">Скидка</button>
                    <v-icon v-show="sortOption === false && sortOptionName === 'AmountOfDiscount' " class="pl-2" dense>mdi-sort-ascending </v-icon>
                    <v-icon v-show="sortOption === true && sortOptionName === 'AmountOfDiscount'" class="pl-2" dense>mdi-sort-descending</v-icon>
                </div>
            </template>
            <template v-slot:header.DateStart>
                <div class="d-flex">
                    <button @click="pilik">Дата начала</button>
                    <v-icon v-show="sortOption === false && sortOptionName === 'DateStart' " class="pl-2" dense>mdi-sort-ascending </v-icon>
                    <v-icon v-show="sortOption === true && sortOptionName === 'DateStart'" class="pl-2" dense>mdi-sort-descending</v-icon>
                </div>
            </template>
            <template v-slot:header.DateEnd>
                <div>
                    <button @click="pilik">Дата окончания</button>
                    <v-icon v-show="sortOption === false && sortOptionName === 'DateEnd' " class="pl-2" dense>mdi-sort-ascending </v-icon>
                    <v-icon v-show="sortOption === true && sortOptionName === 'DateEnd'" class="pl-2" dense>mdi-sort-descending</v-icon>
                </div>
            </template>
            <template v-slot:header.RatingDiscount>
                <div>
                    <button @click="pilik">Рейтинг</button>
                    <v-icon v-show="sortOption === null" class="pl-2" dense>mdi-sort-ascending </v-icon>
                    <v-icon v-show="sortOption === false && sortOptionName === 'RatingDiscount' " class="pl-2" dense>mdi-sort-ascending</v-icon>
                    <v-icon v-show="sortOption === true && sortOptionName === 'RatingDiscount'" class="pl-2" dense>mdi-sort-descending</v-icon>
                </div>
            </template>

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
            <template v-if="this.$store.state.userClaimsStoreData.role !=='Employee'" v-slot:item.actions="{ item }">
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
                        <v-col cols="1" lg="1">
                            <v-btn>
                                <v-icon color="orange">{{icons.icon}}</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="7" lg="11" class="d-flex justify-center">
                            <h2>{{$t('dtDetailsAbout')}} "{{item.NameDiscount}}"</h2>
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
                                :total-visible="7"
                                @input="next"
                        ></v-pagination>
                    </v-col>
                    <v-spacer>
                    </v-spacer>
                    <v-col xl="1" lg="2" md="2" sm="2">
                        <v-select v-if="page === 1"
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
            showSortIcon: true,
            sortOptionName: '',
            sortOption: null,
            deleteID: null,
            searchWord: '',
            itmPer: [6, 12],
            selectedPages: [],
            page: 1,
            pageCount: 1,
            itemsPerPage: 6,
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
                description: '',
                viewsTotal: 0,
                subscriptionsTotal: 0,
                usersSubscriptionTotal: 0,
                createDate: ''
            },
            defaultItem: {
                id: '',
                service: '',
                vendor: '',
                amountOfDiscount: 0,
                startDate: '',
                endDate: '',
                rating: 0,
                description: '',
                userClaimsLocalData: [],
                viewsTotal: 0,
                subscriptionsTotal: 0,
                usersSubscriptionTotal: 0,
                createDate: ''
            },

        }),
        mixins: [token],
        created() {
            this.getUser2();
            const localStorage = JSON.parse(window.localStorage.getItem('key'));
            this.$store.commit('setUserLocation', localStorage);
            const resSearch = () => {
                this.inputPost(
                    {
                        "searchText": null,
                        "searchDiscountOption": "All",
                        "searchAddressCountry": localStorage.country,
                        "searchAddressCity": localStorage.town,
                        "searchSortFieldOption": "RatingDiscount",
                        "searchSortOption": "Desc",
                        "searchPaginationPageNumber": 1,
                        "searchPaginationCountElementPerPage": 24,
                        "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                    }
                );
            }
            this.getToken(resSearch)
        },
        computed: {
            filterData: function () {
                if (this.$store.state.discounts.length > 0) {
                    this.$store.commit('setItemsPerPage', this.itemsPerPage)
                    const arr = [];
                    this.page = this.$store.state.disPage;
                    // this.searchWord = this.$store.state.keyWord;
                    // console.log(this.searchWord)
                    this.info = this.$store.state.discounts;
                    console.log(this.info)
                    console.log(this.$store.state.userClaimsStoreData)
                    this.info.map((item) => {
                        arr.push(
                            {
                                id: item.id,
                                NameDiscount: item.name,
                                CompanyName: item.company.name,
                                AmountOfDiscount: item.amountOfDiscount,
                                DateStart: moment(item.startDate).format('DD-MM-YYYY'),
                                DateEnd: moment(item.endDate).format('DD-MM-YYYY'),
                                RatingDiscount: item.ratingTotal.toFixed(2),
                                description: item.description,
                                viewsTotal: item.viewsTotal,
                                subscriptionsTotal: item.subscriptionsTotal,
                                usersSubscriptionTotal: item.usersSubscriptionTotal,
                                createDate: moment(item.createDate).format("DD-MM-YYYY")
                            }
                        )
                    })
                    this.result = arr;
                    // console.log(this.result);
                    return this.result;
                }

            },
            sortData: function(){
                this.sortOptionName = this.$store.state.sortOption.sortName;
                if (this.sortOptionName !== '') {
                    console.log('WATCHER')
                    console.log(this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex])

                }
            },
            // sortData() {
            //     console.log('WORKING')
            //     console.log(this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex])
            //
            // },
        },
        watch: {
            // sortOption: function(){
            //     console.log("THIS IS SORTOPTION: ", this.sortOption)
            //     this.$store.commit('setPreviousOrder')
            //     console.log(this.$store.state.sortOption.sortOrder)
            // },

            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
            searchWord: function () {
                this.selectedPages = [1];
            },
            itemsPerPage: function () {
                this.$store.state.discounts = [];
                const resSearch = () => {
                    if (this.$store.state.filterRequest === false) {
                        console.log(this.$store.state.userLocation.country, this.$store.state.userLocation.town);
                        this.inputPost(
                            {
                                "searchText": this.$store.state.keyWord,
                                "searchDiscountOption": "All",
                                "searchAddressCountry": this.$store.state.userLocation.country,
                                "searchAddressCity": this.$store.state.userLocation.town,
                                "searchSortFieldOption": this.$store.state.sortOption.sortName ? this.$store.state.sortOption.sortName : "RatingDiscount",
                                "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                                "searchPaginationPageNumber": 1,
                                "searchPaginationCountElementPerPage": 24,
                                "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                            }
                        );
                    } else {
                        this.inputPost(
                            {
                                "searchText": this.$store.state.keyWord,
                                "searchDiscountOption": "All",
                                "searchAddressCountry": this.$store.state.userLocation.country,
                                "searchAddressCity": this.$store.state.userLocation.town,
                                "searchSortFieldOption": this.$store.state.sortOption.sortName ? this.$store.state.sortOption.sortName : "RatingDiscount",
                                "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                                "searchPaginationPageNumber": 1,
                                "searchPaginationCountElementPerPage": 24,
                                "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En",
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
                this.getToken(resSearch)
                console.log(this.$store.state.discounts)
            }
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
            ...mapMutations(['setUserClaims']),
            pilik: function (e) {
                console.log('PILICK')
                this.$store.commit('setDisPage', 1)
                if (e.target.innerText === 'Вендор') {
                    this.$store.commit('setSortName', 'CompanyName')
                    this.$store.commit('setSortOrder', 1)
                    this.$store.commit('setPreviousOrder', 1)
                    this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex]
                    console.log(this.sortOption)
                    console.log(this.$store.state.sortOption.sortOrder)
                }
                if (e.target.innerText === 'Скидка') {
                    console.log(e.target.innerText)
                    this.$store.commit('setSortName', 'AmountOfDiscount')
                    this.$store.commit('setSortOrder', 2)
                    this.$store.commit('setPreviousOrder', 2)
                    this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex]
                    console.log(this.$store.state.sortOption.sortOrder)
                }
                if (e.target.innerText === 'Дата начала') {
                    console.log(e.target.innerText)
                    this.$store.commit('setSortName', 'DateStart')
                    this.$store.commit('setSortOrder', 3)
                    this.$store.commit('setPreviousOrder', 3)
                    this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex]
                    console.log(this.$store.state.sortOption)
                }
                if (e.target.innerText === 'Дата окончания') {
                    console.log(e.target.innerText)
                    this.$store.commit('setSortName', 'DateEnd')
                    this.$store.commit('setSortOrder', 4)
                    this.$store.commit('setPreviousOrder', 4)
                    this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex]
                    console.log(this.$store.state.sortOption)
                }
                if (e.target.innerText === 'Рейтинг') {
                    console.log(e.target.innerText)
                    this.$store.commit('setSortName', 'RatingDiscount')
                    this.$store.commit('setSortOrder', 5)
                    this.$store.commit('setPreviousOrder', 5)
                    this.sortOption = this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex]
                    console.log(this.$store.state.sortOption)
                }
                this.sortOptionName = this.$store.state.sortOption.sortName;
                if (this.$store.state.filterRequest === false){
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": this.$store.state.userLocation.country,
                            "searchAddressCity": this.$store.state.userLocation.town,
                            "searchSortFieldOption": this.$store.state.sortOption.sortName,
                            "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 24,
                            "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                        }
                    );
                }else{
                    console.log('SECOND')
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": this.$store.state.userLocation.country,
                            "searchAddressCity": this.$store.state.userLocation.town,
                            "searchSortFieldOption": this.$store.state.sortOption.sortName,
                            "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 24,
                            "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En",
                            "searchAdvanced": {
                                "companyName": this.$store.state.filtered.vendor,
                                "searchDate": {
                                    "searchStartDate": this.$store.state.filtered.rangeDate[0],
                                    "searchEndDate": this.$store.state.filtered.rangeDate[1]
                                },
                                "searchAmountOfDiscount": {
                                    "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
                                    "searchAmountOfDiscountMax": this.$store.state.filtered.range[1]
                                },
                                "searchRatingTotal": {
                                    "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
                                    "searchRatingTotalMax": this.$store.state.filtered.starRange[1]
                                }
                            }
                        }
                    );
                }


            },
            headers() {
                // console.log(this.$route.name)
                let headerArr = [
                    {
                        text: this.$t('dtOffer'),
                        align: 'left',
                        sortable: false,
                        value: 'NameDiscount',
                    },
                    {text: this.$t('dtVendor'), value: 'CompanyName', sortable: false},
                    {text: this.$t('dtDiscount'), value: 'AmountOfDiscount', sortable: false},
                    {text: this.$t('dtStartDate'), value: 'DateStart', sortable: false},
                    {text: this.$t('dtFinishDate'), value: 'DateEnd', sortable: false},
                    {text: this.$t('dtRating'), value: 'RatingDiscount', sortable: false},
                ];
                if (this.$store.state.userClaimsStoreData.role !== 'Employee' && !(this.$route.name === 'statistic')) {
                    headerArr.push({text: this.$t('dtActions'), value: 'actions', sortable: false})
                }
                if (this.$route.name === 'statistic') {
                    headerArr.push(
                        {text: this.$t('viewsTotal'), value: 'viewsTotal', sortable: true},
                        {text: this.$t('subscriptionsTotal'), value: 'subscriptionsTotal', sortable: true},
                        {text: this.$t('usersSubscriptionTotal'), value: 'usersSubscriptionTotal', sortable: true},
                        {text: this.$t('createDate'), value: 'createDate', sortable: true},
                    )
                }
                return headerArr;
            },
            next() {
                // console.log(this.page, this.pageCount)
                // console.log(this.selectedPages)
                // console.log(this.selectedPages.indexOf(this.page))
                // console.log(this.$store.state.discounts)
                // console.log(this.page, this.pageCount);
                //     console.log(this.page,this.pageCount)
                this.$store.commit('setDisPage', this.page)
                console.log(this.$store.state.disPage)
                const goNext = () => {
                    if (this.$store.state.filterRequest === false) {
                        if(this.$store.state.disPage === this.pageCount || this.$store.state.disPage === this.pageCount-1){
                            console.log("PAGINATION")
                            this.nextDiscount(
                                {
                                    "searchText": this.$store.state.keyWord,
                                    "searchDiscountOption": "All",
                                    "searchAddressCountry": this.$store.state.userLocation.country,
                                    "searchAddressCity": this.$store.state.userLocation.town,
                                    "searchSortFieldOption": this.$store.state.sortOption.sortName ? this.$store.state.sortOption.sortName : "RatingDiscount",
                                    "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                                    "searchPaginationPageNumber": this.pageCount + 1,
                                    "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                                    "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                                }
                            )
                        }

                    } else {
                        console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
                        console.log(this.$store.state.filtered.range)
                        console.log(this.$store.state.sortOption.sortName ? this.$store.state.sortOption.sortName : "RatingDiscount")
                        if(this.$store.state.disPage === this.pageCount || this.$store.state.disPage === this.pageCount-1){
                            this.nextDiscount(
                                {
                                    "searchText": this.$store.state.keyWord,
                                    "searchDiscountOption": "All",
                                    "searchAddressCountry": this.$store.state.userLocation.country,
                                    "searchAddressCity": this.$store.state.userLocation.town,
                                    "searchSortFieldOption": this.$store.state.sortOption.sortName ? this.$store.state.sortOption.sortName : "RatingDiscount",
                                    "searchSortOption": this.$store.state.sortOption.sortOrder[this.$store.state.sortOption.sortIndex] ? 'Asc' : 'Desc',
                                    "searchPaginationPageNumber": this.pageCount + 1,
                                    "searchPaginationCountElementPerPage": this.$store.state.itemsPerPage,
                                    "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En",
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

                }
                this.getToken(goNext)
            },

            deleteDiscount() {
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

            editItem(item) {
                this.$router.push({
                    name: 'editingDetails',
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
            async getUser2() {
                const result = await auth.getUser()
                this.userClaimsLocalData = result
                console.log('USER CLAIMS: ', result)

                this.setUserClaims({
                    name: result.profile.name,
                    surname: result.profile.surname,
                    role: result.profile.role,

                    //email: result.profile.email
                })
                console.log('USER CLAIMS STORED IN VUEX STORE: ', this.$store.getters.getUserClaims)
            },
        },
    }
</script>

<style scoped>

</style>
