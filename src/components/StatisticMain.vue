<template>
    <div>
        <v-row>
        <ToolBar/>
        </v-row>
        <v-row>
            <v-col>
        <DataTable
                v-show="this.$store.state.switch === true"
        />
        <StatisticTotal
                v-show="this.$store.state.switch === false"
        />
            </v-col>
        </v-row>
    </div>
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
.padding {
    padding: 64px 0 12px;
}
</style>
