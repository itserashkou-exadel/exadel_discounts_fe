<template>
    <div id="app">
   <Sign/>
    <router-view/>
    </div>
</template>

<script>
    import Sign from '@/components/Sign'
    export default {
        data() {
            return {
                showPassword: false
            }
        },
        components: {
            Sign
        }
    }
</script>

<style>

</style>
