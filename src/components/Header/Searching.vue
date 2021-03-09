<template>
    <v-menu
            :offset-x="false"
            :offset-y="true"
    >
        <template v-slot:activator="{ on, attrs }">
            <div class="d-flex">
                <v-text-field
                              :placeholder="$t('search')"
                              class="mt-4"
                              color="blue lighten-5"
                              v-model="search"
                              full-width
                              @keydown.enter="showSearch"
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
                    axios.get(`${process.env.VUE_APP_URL_SWAGGER}/api/v1/tags/get/${this.search}`).then((data) =>
                        this.tags = data.data
                    )}
                }
                this.getToken(getTags).then(() => {
                    this.setKeyWord(this.search)
                    if (this.search === '') {
                        this.$store.state.filterRequest = false;
                        this.setFilterIcon(false);
                        this.$store.commit('setNoFound', false);
                        this.$store.commit('setDisPage', 1)
                        this.$store.state.sortOption.sortName = "RatingDiscount";
                        this.$store.state.sortOption.sortOrder = [false,false,true,true,true,false];
                        this.$store.state.sortOption.sortOrder[5] = false;
                        this.$store.state.sortOption.sortIndex = 5;
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
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount', "allInputPost", 'setFilterIcon']),
            selectTag(item) {
                this.search = item
            },
            showSearch() {
                this.$store.state.discounts = [];
                this.$store.state.filterRequest = false;
                this.setFilterIcon(false);
                this.$store.commit('setNoFound', false)
                this.$store.commit('setDisPage', 1)
                this.$store.state.sortOption.sortName = "RatingDiscount";
                this.$store.state.sortOption.sortOrder = [false,false,true,true,true,false];
                this.$store.state.sortOption.sortOrder[5] = false;
                this.$store.state.sortOption.sortIndex = 5;
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
        },

    }

</script>

<style scoped>

</style>

