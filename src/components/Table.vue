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
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";

    const auth = new AuthService();

    export default {
        name: "Table",
        data() {
            return {
                windowInnerWidth: window.innerWidth,
            }
        },
        components: {ToolBar, DataTable, Cards},
    }
</script>

<style scoped>


</style>
