<template>

    <v-col cols="2" xl="1" lg="2" md="1" class="d-flex justify-md-end ml-lg-n16 justify-sm-center">
        <v-icon
                large
                class="pointer"
                color="blue"
                :disabled="!this.$store.state.filterIcon"
                @click="showSearch"
        >mdi-filter-off-outline
        </v-icon>
    </v-col>
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
                this.$store.state.filterRequest = false;
                this.$store.state.discounts = [];
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
                this.$store.commit('setDisPage', 1)
                console.log(this.$store.state.discounts)
            },

        }
    }
</script>

<style scoped>

</style>
