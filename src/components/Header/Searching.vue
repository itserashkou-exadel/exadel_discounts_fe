<template>
    <v-menu
            :offset-x="true"
            :offset-y="true"
    >
        <template v-slot:activator="{ on, attrs }">
            <div class="d-flex">
                <v-text-field
                              placeholder="Search"
                              class="mt-4"
                              color="blue lighten-5"
                              v-model="search"
                              full-width
                              @keydsown.enter="showSearch"
                              v-on="on"
                              autocomplete="off"
                              dense
                ></v-text-field>
                <v-icon
                        @click="showSearch"
                >mdi-magnify
                </v-icon>
            </div>
        </template>
        <v-list dense
                :class="{'d-none': search === ''}"
        >
            <v-list-item
                    :class="{'d-none': search === ''}"
                    v-for="(item, index) in tags"
                    :key="index"
                    @click="selectTag(item)"
            >
                {{item}}
            </v-list-item>
        </v-list>
    </v-menu>

</template>

<script>
    import axios from "axios"
    import {mapActions} from "vuex";
    import token from '@/mixins/token.mixin'

   // const textSearch = document.getElementById('textSearch')
    export default {
        name: "Searching",
        data: () => ({
            sideNav: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            drawer: false,
            searchClosed: true,
            search: null,
            tags: [],
            offset: true,

        }),
        mixins: [token],
        watch: {
            search: function () {
                if (this.search === '') {
                    this.tags = []
                }
                const getTags = () => {
                    if (this.search !== '') {
                    axios.get(`https://localhost:9001/api/v1/tags/get/${this.search}`).then((data) =>
                        this.tags = data.data
                    )}
                }
                this.getToken(getTags).then(() => {
                    this.setKeyWord(this.search)
                    if (this.search === '') {
                        const resSearch = () => {
                            this.inputPost(
                                {
                                    "searchText": null,
                                    "searchDiscountOption": "All",
                                    "searchAddressCountry": this.$store.state.userLocation.country,
                                    "searchAddressCity": this.$store.state.userLocation.town,
                                    "searchSortFieldOption": "RatingDiscount",
                                    "searchSortOption": "Desc",
                                    "searchPaginationPageNumber": 1,
                                    "searchPaginationCountElementPerPage": 24,
                                    "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                                }
                            );
                        }
                        this.getToken(resSearch)
                    }
                })
            }
        },
        methods: {
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount', "allInputPost"]),
            selectTag(item) {
                this.search = item
            },
            showSearch() {
                this.$store.state.discounts = [];
                this.$store.commit('setDisPage', 1)
                const resSearch = () => {
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": this.$store.state.userLocation.country,
                            "searchAddressCity": this.$store.state.userLocation.town,
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

            //     testing: function(){
            //     axios.all([
            //         axios.post('https://localhost:9001/api/v1/discounts/search', {
            //             "searchText": "Меха",
            //             "searchDiscountOption": "All",
            //             "searchAddressCountry": "Украина",
            //             "searchAddressCity": "Винница",
            //             "searchSortFieldOption": "NameDiscount",
            //             "searchSortOption": "Asc",
            //             "searchPaginationPageNumber": 1,
            //             "searchPaginationCountElementPerPage": 5,
            //             "searchLanguage": "Ru"
            //         }),
            //         axios.post('https://localhost:9001/api/v1/discounts/search', {
            //             "searchText": "Меха",
            //             "searchDiscountOption": "All",
            //             "searchAddressCountry": "Украина",
            //             "searchAddressCity": "Винница",
            //             "searchSortFieldOption": "NameDiscount",
            //             "searchSortOption": "Asc",
            //             "searchPaginationPageNumber": 2,
            //             "searchPaginationCountElementPerPage": 5,
            //             "searchLanguage": "Ru"
            //         })
            //     ])
            //         .then(axios.spread((data1, data2) => {
            //         console.log('data1', data1.data, 'data2', data2.data)
            //     }));
            //
            // },

            // onResize() {
            //     this.searchClosed = document.documentElement.clientWidth < 1080 ? true : false;
            // },
        },
        // created() {
        //     window.addEventListener('resize', this.onResize);
        //     this.onResize();
        // },
        // beforeDestroy() {
        //     window.removeEventListener('resize', this.onResize);
        // },
    }

</script>

<style scoped>

</style>

