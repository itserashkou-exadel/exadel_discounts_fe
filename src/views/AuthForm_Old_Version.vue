<template>
    <v-container  class="d-flex align-center wrapper">
        <v-card width="33%" class="mx-auto mt-15 " color="blue-grey lighten-4" hover >
            <v-card-title>Welcome to CrazyPrice App</v-card-title>
            <v-card-text>
                <v-form>
                    <v-autocomplete label="Choose your country" :items="location.countries"></v-autocomplete>
                    <v-autocomplete label="Choose your country" :items="location.towns"></v-autocomplete>
                    <v-card-actions class="d-flex justify-center" >
                        <v-btn color="success" width="150">Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "AuthForm",
        data() {
            return {
                location: {
                    countries: ['Belarus --------', 'Grodno', 'Minsk',  'Ukraine', 'USA',],
                    towns: ['Grodno', 'Minsk', 'Brest',],
                },
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100vh;
    }
</style>