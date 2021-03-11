<template>
    <v-app>
        <div id="app">
            <router-view/>
        </div>
    </v-app>
</template>
<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'App',
    });
</script>
<style>
    .deletedItem {
        background-color: lightpink;
    }
    .zero{
        margin: 0 !important;
        max-height: 95% !important;
    }
    .slider-margin{
        margin: 0 16px !important;
    }
</style>
