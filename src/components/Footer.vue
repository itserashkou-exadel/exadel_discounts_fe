<template>
    <v-footer color="#40BFEF" padless>
        <v-col
                class="text-center"
                cols="12"
        >
            <strong >Copyright &copy;</strong>{{ new Date().getFullYear() }}. <strong>All rights reserved.</strong>
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>