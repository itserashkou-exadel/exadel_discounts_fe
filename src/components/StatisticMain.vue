<template>
    <v-container fill-height class="ml-10 mr-10">
        <router-view/>
        <ToolBar/>
<!--        <v-row>-->
<!--            <Cards class="d-md-none"></Cards>-->
<!--        </v-row>-->
        <v-row>
            <v-row justify="center" align="center" v-show="this.$store.state.switch === true" >
                <DataTable/>
            </v-row>
            <v-row v-show="this.$store.state.switch === false" class="justify-center align-center">
                <StatisticTotal/>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
    import AuthService from '@/services/auth.service';
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";
    import StatisticTotal from "@/views/StatisticTotal";

    const auth = new AuthService();

    export default {
        name: "Table",
        data() {
            return {
                windowInnerWidth: window.innerWidth,
            }
        },
        components: {ToolBar, DataTable, Cards, StatisticTotal},
    }
</script>

<style scoped>


</style>
