<template>
    <v-container fill-height>
        <router-view/>
        <ToolBar/>
        <v-row>
            <Cards class="d-md-none"></Cards>
        </v-row>
        <v-row class=" d-none d-md-block">
            <v-row justify="center" align="center" v-show="this.$store.state.switch === true" >
                <DataTable/>
            </v-row>
            <v-row v-show="this.$store.state.switch === false" class="justify-center align-center">
                <Cards/>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
    import AuthService from '@/services/auth.service';

    const auth = new AuthService();
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";
    import {mapMutations} from 'vuex'

    export default {
        name: "Table",
        data() {
            return {
                windowInnerWidth: window.innerWidth,
            }
        },
        userClaimsLocalData: [],
        mounted() {
            this.getUser2()
        },
        methods: {
            ...mapMutations(['setUserClaims']),
            async getUser2() {
                const result = await auth.getUser()
                console.log(result)
                this.userClaimsLocalData = result

                this.setUserClaims({
                    name: result.profile.name,
                    surname: result.profile.surname,
                    role: result.profile.role
                })
                console.log('USER_CLAIMS_STORE_DATA: ', this.$store.getters.getUserClaims)
            },
        },
        components: {ToolBar, DataTable, Cards},
    }
</script>

<style scoped>


</style>
