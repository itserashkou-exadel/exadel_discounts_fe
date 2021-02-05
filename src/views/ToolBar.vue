<template>
    <v-row class="d-flex align-center justify-lg-end justify-md-end justify-sm-center justify-center shrink">
        <v-col cols="2" lg="1" md="2" class="d-flex justify-end">
            <Modal/>
        </v-col>
        <v-col cols="4" lg="2" md="2" sm="3" class="d-flex justify-center">
            <SwitchButton></SwitchButton>
        </v-col>
        <v-col cols="4" lg="2" md="2" sm="2">
            <v-btn  @click="$router.push({name:'add_discount', params: {placeOfCall: 'newDiscount'}})"
                    color="primary"
                    dark
                    class="mb-2"
            >
                {{$t('dtNewItem')}}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import SwitchButton from "./SwitchButton";
    import Modal from "../components/Filter/Modal";
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
        }
    }
</script>

<style scoped>

</style>
