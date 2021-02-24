<template>
    <div>
        <v-text-field
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                class="expanding-search mt-4"
                filled
                dense
                chips
                color="blue lighten-5"
                multiple
                :class="{'closed' : searchClosed}"
                @focus="searchClosed = false"
                @blur.native="searchClosed = true"
                v-model="search"
                @keydown.enter="showSearch()"
        ></v-text-field>
<!--        <v-btn @click="testing"></v-btn>-->
    </div>
</template>

<script>
    import AuthService from "@/services/auth.service";
    const auth = new AuthService();
    import axios from "axios"
    import {mapActions} from "vuex";
    import token from '@/mixins/token.mixin'

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
            search: null
        }),
        mixins: [token],
        watch: {
            search: function () {
                this.setKeyWord(this.search)
            }
        },
        methods: {
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount', "allInputPost"]),
            showSearch() {
                // console.log(this.search)
                this.$store.state.discounts = [];
                this.$store.commit('setDisPage', 1)
                const resSearch = () => {
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 20,
                            "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"
                        }
                    );
                }
                this.getToken(resSearch)
                console.log(this.$store.state.discounts)
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

            onResize() {
                this.searchClosed = document.documentElement.clientWidth < 1080 ? true : false;
            },
        },
        created() {
            window.addEventListener('resize', this.onResize);
            this.onResize();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
    }

</script>

