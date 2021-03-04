<template>
    <v-container>
        <v-btn
                color="primary"
                dark
                @click="drawer = !drawer"
                class="showMenuBtn ml-13 mt-2"
                v-bind:class="{'showMenuBtn': drawer}"
        >
            Show menu
        </v-btn>

        <v-navigation-drawer
                fixed
                v-model="drawer"
                class="navDrawer mt-10"
        >
            <v-btn
                    color="primary"
                    dark
                    class="mapMenuToggleBtn mt-8 mb-2"
                    @click="drawer = !drawer"
            >
                Hide menu
            </v-btn>
            <v-divider></v-divider>

            <v-expansion-panels :key="myKey">
                <v-expansion-panel
                        v-for="(item,i) in discountsFromStore"
                        :key="i"
                        @click="jumpToMarker([item.address.location.longitude, item.address.location.latitude])"
                >
                    <v-expansion-panel-header class="bold">{{item.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>{{item.company.name}}</v-expansion-panel-content>
                    <v-expansion-panel-content>{{item.description}}</v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <v-img :src="pictureCheck(item.pictureUrl)"></v-img>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>{{item.address.street}}</v-expansion-panel-content>
                    <v-expansion-panel-content><p>{{item.amountOfDiscount}}%</p></v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-navigation-drawer>
    </v-container>

</template>

<script>
    export default {
        name: "LeftSideBar",
        props: ['discountsFromStore', 'jumpToMarker'],
        data() {
            return {
                drawer: false,
                myKey: 0,
            }
        },
        methods: {
            test() {
                console.log('TEST!')
            },
            pictureCheck(url) {
                return url ? url : "../../public/cat_404.jpg"
            },
        },
        mounted() {
            console.log('PROPS navBar:', this.props)
        },
        computed: {
            propsFromMap: function () {
                return this.discountsFromStore
            }
        },
        watch: {
            discountsFromStore(){
                console.log('WATCH')
                this.myKey+=1
            }
        },
    }
</script>

<style scoped>
    .mapMenuToggleBtn {
        margin-left: 60px;
    }

    .showMenuBtn {
        /*visibility: hidden;*/
    }

    .navDrawer {
        border-radius: 3px;
        /*z-index: 5;*/
    }
</style>
