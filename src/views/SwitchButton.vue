<template>
            <div>
                <v-switch
                        @click="change"
                        color="accent"
                        :label="`${direction}`"
                ></v-switch>
            </div>
</template>

<script>

    export default {
        name: "SwitchButton",
        methods: {
            change(){
                this.$store.commit('changeSwitcher')
            },
        },

        computed: {
            direction: function (){
                return this.$store.getters.switcher === true ? this.$t('tbTable') : this.$t('tbCards');
            },
        }
    }
</script>

<style scoped>

</style>
