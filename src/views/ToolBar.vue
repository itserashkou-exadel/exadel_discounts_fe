<template>
    <v-row class="d-flex align-center justify-end mr-13">
        <v-col cols="2" lg="1" md="2">
            <Modal/>
        </v-col>
        <v-col cols="4" lg="1" md="2" sm="3" >
            <SwitchButton></SwitchButton>
        </v-col>
        <v-col cols="4" lg="2" md="2" sm="2">
            <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    offset-x
                    min-width="auto"
            >
               <template v-slot:activator="{on}">
                    <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-on="on"
                    >
                        {{$t('dtNewItem')}}
                    </v-btn>
                </template>
             <v-container>
                            <v-card
                                    color="#385F73"
                                    dark
                            >
                                <v-card-actions>
                                    <v-btn text
                                    @click="goToPageInRus()"
                                    >
                                        Russian
                                    </v-btn>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-btn text
                                    @click="goToPageInEn()"
                                    >
                                        English
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                </v-container>

            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
    import SwitchButton from "./SwitchButton";
    import Modal from "../components/Filter/Modal";
    import {mapGetters} from "vuex"

    export default {
        name: "ToolBar",
        components: {
            SwitchButton,
            Modal
        },
        computed: {
            is_screen_small() {
                return this.$vuetify.breakpoint.smOnly
            },
            ...mapGetters(['language'])
        },
        methods: {
            goToPageInRus() {
                this.$router.push({name:'add_discount', params: {placeOfCall: 'newDiscount', lang: 'Ru'}})
            },
            goToPageInEn() {
                this.$router.push({name:'add_discount', params: {placeOfCall: 'newDiscount', lang: 'En'}})
            }
        }
    }
</script>

<style scoped>

</style>
