<template>
    <v-content >
        <v-card class="elevation-0 d-flex align-center justify-space-around flex-column">
            <v-card width="500px"  class="mt-9" >
                <v-card-title class="d-flex justify-center">Welcome to CrazyPrice App</v-card-title>
                <v-card-text>
                    <v-autocomplete label="Выберите страну" :items="countries"></v-autocomplete>
                    <v-autocomplete label="Выберите город" :items="towns"></v-autocomplete>
                </v-card-text>

                <v-card-actions>
                    <v-btn dark color="success" class="mx-auto">
                        <router-link to="/mainpage">Login</router-link>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

    </v-content>
</template>

<script>
    export default {
        name: "AuthForm",
        data: () => ({
            countries: ['Belarus', 'Ukraine', 'USA',],
            towns: ['Grodno', 'Minsk', 'Brest',]
        })
    }
</script>

<style scoped>

</style>