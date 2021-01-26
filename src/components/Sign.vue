<template>
    <v-app>

                <DataTable/>


    </v-app>
</template>

<script>
    // import Footer from '@/components/Footer'
    import DataTable from "./DataTable";

    export default {
        name: "Sign",
        components: {
            DataTable,
            // Footer
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
