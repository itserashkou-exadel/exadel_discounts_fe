<template>
    <div
           class="d-none"
           :class="{'d-flex': $route.name !== 'statistic' || ($route.name === 'statistic'&& -this.$store.getters.switcher)}"
    >
        <v-icon
                large
                class="pointer"
                color="blue"
                :disabled="!this.$store.state.filterIcon"
                @click="showSearch"
        >mdi-filter-off-outline
        </v-icon>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"
    import AuthService from "@/services/auth.service";
    import token from '@/mixins/token.mixin'
    const auth = new AuthService();
    export default {
        name: "DeleteFilter",
        components: {

        },
        mixins: [token],
        computed: {
            ...mapGetters(['language'])
        },
        methods: {
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount', "allInputPost", "setFilterIcon"]),
            showSearch() {
                // this.$store.state.sortOption.sortOrder[5] = false;
                // this.$store.state.sortOption.sortIndex = 5;
                this.$store.state.filterRequest = false;
                this.$store.state.discounts = [];
                this.$store.state.sortOption.sortName = "RatingDiscount";
                this.$store.state.sortOption.sortOrder = [false,false,true,true,true,false];
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
                this.setFilterIcon(false);
                this.$store.commit('setDisPage', 1);
                this.$store.commit('setNoFound', false)
            },

        }
    }
</script>

<style scoped>

</style>
