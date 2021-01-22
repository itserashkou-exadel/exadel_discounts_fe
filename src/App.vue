<template>
    <v-app>
        <div id="app" :style="myStyle" >
            <router-view/>
        </div>
    </v-app>
</template>

<script>
    // import Sign from '@/components/Sign'
    export default {
        data() {
            return {
                showPassword: false,
                myStyle: {
                    backgroundColor:"#0091EA"
                }
            }
        },
        components: {

        }
    }
</script>

<style>

</style>