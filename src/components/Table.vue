<template>
    <div>
        <router-view/>
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
              componentKey:0,
                windowInnerWidth: window.innerWidth,
            }
        },
        components: {ToolBar, DataTable, Cards},
    }
</script>

<style scoped>

</style>
