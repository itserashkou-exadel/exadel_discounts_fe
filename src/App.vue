<template>
    <v-app>
        <div id="app">
            <router-view/>
        </div>
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

        }
    }
</script>

<style>

</style>