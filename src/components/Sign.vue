<template>
    <v-app>
        <v-app-bar app dark color="#40BFEF">
            <v-toolbar-title class="pa-10"><h1>Logo</h1></v-toolbar-title>
        </v-app-bar>


    <Table/>




    </v-app>
</template>

<script>


    import Table from "./Table";
    export default {
        name: "Sign",
        components: {
            Table

        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>