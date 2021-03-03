<template>
    <v-row class="d-flex align-center justify-end">
        <v-col md="1" sm="2" xs="2"
               class="d-none"
               :class="{'d-block': $route.name !== 'statistic' ||
               ($route.name === 'statistic'&& this.$store.getters.switcher)}">
            <Modal/>
        </v-col>
        <v-col md="1" sm="2" xs="2">
        <DeleteFilter/>
        </v-col>
        <v-col md="2" sm="2" xs="2"
               :class="{'d-none d-md-block': $route.name !== 'statistic'}">
            <SwitchButton></SwitchButton>
        </v-col>
        <v-col md="2" sm="3" xs="3"
                v-if="this.$store.state.userClaimsStoreData.role !=='Employee'">
            <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="goToPageAd()"            >
                {{$t('dtNewItem')}}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import SwitchButton from "./SwitchButton";
    import Modal from "../components/Filter/Modal";
    import {mapActions, mapGetters} from "vuex"
    import AuthService from "@/services/auth.service";
    import token from '@/mixins/token.mixin'
    import DeleteFilter from "@/components/Filter/DeleteFilter";

    const auth = new AuthService();
    export default {
        name: "ToolBar",
        data() {
            return {
                windowInnerWidth: window.innerWidth,
            }
        },
        components: {
            DeleteFilter,
            SwitchButton,
            Modal
        },
        mixins: [token],
        computed: {
            is_screen_small() {
                return this.$vuetify.breakpoint.smOnly
            },
            ...mapGetters(['language'])
        },
        methods: {
            ...mapActions(['inputPost', 'setKeyWord', 'nextDiscount', "allInputPost", "setFilterIcon"]),
            goToPageAd() {
                this.$router.push({name: 'add_discount', params: {placeOfCall: 'newDiscount'}})
            },
            showSearch() {
                this.$store.state.filterRequest = false;
                this.$store.state.discounts = [];
                const resSearch = () => {
                    this.inputPost(
                        {
                            "searchText": this.$store.state.keyWord,
                            "searchDiscountOption": "All",
                            "searchAddressCountry": "Украина",
                            "searchAddressCity": "Винница",
                            "searchSortFieldOption": "RatingDiscount",
                            "searchSortOption": "Desc",
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 20,
                            "searchLanguage": "Ru"
                        }
                    );
                }
                this.getToken(resSearch)
                this.setFilterIcon(false);
                this.$store.commit('setDisPage', 1)
                //  console.log(this.$store.state.discounts)
            },

        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }

</style>
