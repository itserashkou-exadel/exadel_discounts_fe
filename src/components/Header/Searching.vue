<template>
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
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount']),
            showSearch() {
                console.log(this.search)
                this.$store.state.discounts = [];
                const resSearch = () => {
                    this.inputPost(
                        {
                            "searchText": "Меха",
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 5,
                            "searchLanguage": "Ru"
                        }
                    );
                    setTimeout(this.nextDiscount(
                        {
                            "searchText": this.search,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 2,
                            "searchPaginationCountElementPerPage": 5,
                            "searchLanguage": "Ru"
                        }
                    ), 1000);
                    setTimeout(this.nextDiscount(
                        {
                            "searchText": this.search,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 3,
                            "searchPaginationCountElementPerPage": 5,
                            "searchLanguage": "Ru"
                        }
                    ), 1000);

                }
                this.getToken(resSearch)

                console.log(this.$store.state.discounts)
            },
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

