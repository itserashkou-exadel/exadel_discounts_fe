<template>
    <v-container fill-height>
        <router-view/>
        <ToolBar/>
        <v-row v-show="this.$store.state.switch === true" class="justify-center align-center">
            <DataTable/>
        </v-row>
        <v-row v-show="this.$store.state.switch === false" class="justify-center align-center">
            <Cards/>
        </v-row>
    </v-container>
</template>

<script>
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";
    export default {
        name: "Table",
        components: { ToolBar, DataTable, Cards},
    }
</script>

<style scoped>


</style>