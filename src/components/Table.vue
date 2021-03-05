<template>
    <div>
        <router-view/>
        <div v-if="$store.state.notFound === false">
            <ToolBar/>
            <v-row>
                <Cards class="d-md-none"></Cards>
            </v-row>
            <v-row class=" d-none d-md-block">
                <DataTable
                        v-show="this.$store.state.switch === true"
                />
                <Cards  :key="this.$store.state.switch"
                        v-show="this.$store.state.switch === false"

                />
            </v-row>
        </div>
        <div class="d-flex flex-column justify-center align-center not_found" v-else-if="this.$store.state.filterRequest === true">
        <DeleteFilter></DeleteFilter>
            <h2>No services found! Try to change filtered settings.</h2>
        </div>
        <div class="d-flex flex-column justify-center align-center not_found" v-else>
            <h2>No services found!</h2>
        </div>
    </div>
</template>

<script>
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";
    import DeleteFilter from "@/components/Filter/DeleteFilter";

    export default {
        name: "Table",
        data() {
            return {
              componentKey:0,
                windowInnerWidth: window.innerWidth,
            }
        },
        components: {ToolBar, DataTable, Cards, DeleteFilter},
    }
</script>

<style scoped>
    .not_found{
        height: 100%;
    }
</style>
