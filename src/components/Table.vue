<template>
    <div>
        <router-view/>
        <ToolBar/>
        <div v-if="$store.state.notFound === false">
            <v-row>
                <Cards class="d-md-none"></Cards>
            </v-row>
            <v-row class=" d-none d-md-block">
                <DataTable
                        v-show="this.$store.state.switch === true"
                />
                <Cards
                        v-show="this.$store.state.switch === false"
                />
            </v-row>
        </div>
        <div class="d-flex flex-column justify-center align-center not_found" v-else>
            <h2>No services found, please, try another word!</h2>
        </div>
    </div>
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
    .not_found{
        height: 100%;
    }
</style>
