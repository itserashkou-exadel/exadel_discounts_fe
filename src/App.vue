<template>
    <v-app>
        <Cards/>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>


<script>
    import Cards from './views/Cards.vue'
    // import Card from './components/Card.vue'

    export default {
        name: 'App',

        components: {
            Cards
        },

        data: () => ({


        }),
    };
</script>
