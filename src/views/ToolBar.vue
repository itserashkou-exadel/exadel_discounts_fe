<template>
    <v-row class="d-flex align-center justify-lg-end justify-md-end justify-sm-center justify-center shrink">
        <v-col cols="3" xl="1" lg="2" md="1"  class="d-flex justify-end  mr-lg-n5">
            <Modal/>
        </v-col>
        <v-col cols="2" xl="1" lg="2" md="1" class="d-flex justify-end ml-lg-n16">
            <v-icon
                    large
                    class="pointer"
                    color="blue"
                    :disabled="!this.$store.state.filterIcon"
                    @click="showSearch"
                   >mdi-filter-off-outline
            </v-icon>
        </v-col>

        <v-col cols="4" lg="2" md="2" sm="3" class="d-flex justify-center">
            <SwitchButton></SwitchButton>
        </v-col>
        <v-col cols="3" lg="2" md="2" sm="2">
                    <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            @click="goToPageAd()"
                    >
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
    const auth = new AuthService();
    export default {
        name: "ToolBar",
        components: {
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
                this.$router.push({name:'add_discount', params: {placeOfCall: 'newDiscount'}})
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
                            "searchSortFieldOption": "NameDiscount",
                            "searchSortOption": "Asc",
                            "searchPaginationPageNumber": 1,
                            "searchPaginationCountElementPerPage": 15,
                            "searchLanguage": "Ru"
                        }
                    );
                }
                this.getToken(resSearch)
                this.setFilterIcon(false);
                console.log(this.$store.state.discounts)
            },

        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
