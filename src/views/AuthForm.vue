<template>

    <v-container class="d-flex align-center wrapper" >
        <v-card width="500" class="mx-auto ">
            <v-card-text >

                <v-list-group eager>
                    <template v-slot:activator>
                        <v-list-item-title>Choose your location</v-list-item-title>
                    </template>

                    <!--            Первая группа            -->
                    <v-list-group no-action sub-group>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Belarus</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item-group v-model="fictionalSelected">
                            <v-list-item v-bind:key="town" v-for="town in belarus" @click="redirectToIS4">
                                <v-list-item-title>{{ town }}</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                    <v-divider></v-divider>
                    <!--            Вторая группа            -->
                    <v-list-group sub-group no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>Ukraine</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item-group v-model="realSelected">
                            <v-list-item v-bind:key="town" v-for="town in ukraine ">
                                <v-list-item-title >{{ town }}</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                </v-list-group>
                <v-container class="d-flex justify-center">
                    <v-btn >Login</v-btn>
                </v-container>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'Test2',
        data: () => ({
            belarus: ['Grodno', 'Minsk', 'Brest'],
            fictionalSelected: null,
            ukraine: ['Kiew'],
            realSelected: null,
        }),
        methods: {
            redirectToIS4(){
                console.log('You was redirected')
                this.$router.push('/identity')
            }
        },
    };
</script>

<style scoped>
    .wrapper {
        height: 100vh;
    }
</style>