<template>
    <v-app>
        <v-app-bar app dark color="#40BFEF">

            <v-row>
                <v-col cols="12" md="2" class="pl-10 pt-5">
                    <v-toolbar-title><h1>Logo</h1></v-toolbar-title>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field class="pt-7" label="Search" append-icon="mdi-magnify"></v-text-field>
                </v-col>

            </v-row>
            <v-row justify="end">
                <v-col cols="12" md="1">
                    <v-avatar
                            color="primary"
                            size="56"
                    ></v-avatar>
                </v-col>
            </v-row>
        </v-app-bar>
        <Cards/>
        <Footer/>
    </v-app>

</template>

<script>
    import Footer from '@/components/Footer'
    import Cards from '@/components/Cards'
    export default {
        name: "Home",
        components: {Footer,Cards},
        data: () => ({
            loading: false,
            selection: 1,
        }),

        methods: {
            reserve() {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
        },

        products: [
            {
                id: 1,
                title: "Cafe Croissant",
                discount: '-20%',
                stars: 4,
                location: 'Lviv',
                info: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
                duration: 'Until 21.01 - 19:00'
            },

            {
                id: 2,
                title: "Cafe Julmepe",
                discount: '-23%',
                stars: 5,
                location: 'Kyiv',
                info: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
                duration: 'Until 21.01 - 19:00'
            }
        ]
    }
</script>

<style scoped>
    span {
        color: red;
        margin-left: 10px;
    }

    .sidebar {
        background-color: aliceblue;
    }
</style>