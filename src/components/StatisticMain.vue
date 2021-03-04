<template>
    <div>
        <router-view/>
        <ToolBar class="padding"/>
            <DataTable
                    v-show="this.$store.state.switch === true"
            />
            <StatisticTotal
                    v-show="this.$store.state.switch === false"
            />
    </div>
</template>

<script>
    import AuthService from '@/services/auth.service';
    import ToolBar from "@/views/ToolBar";
    import Cards from "@/views/Cards";
    import DataTable from "@/components/DataTable";
    import StatisticTotal from "@/views/StatisticTotal";



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
