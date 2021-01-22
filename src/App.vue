<template>
    <v-app id="app">

    <router-view/>
    </v-app>
</template>

<script>
    // import Sign from '@/components/Sign'
    export default {
        data() {
            return {
                showPassword: false
            }
        },
        components: {
            // Sign
        }
    }
</script>

<style>

</style>