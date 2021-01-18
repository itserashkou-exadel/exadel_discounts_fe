<template>
    <v-app>
        <v-app-bar app dark color="#40BFEF">
            <v-toolbar-title class="pa-10"><h1>Logo</h1></v-toolbar-title>
        </v-app-bar>
        <v-content>

            <v-card height="80%" class="elevation-0 d-flex align-center justify-space-around flex-column ">
                <v-card width="500" class="mt-9">
                    <v-card-title class="d-flex justify-center">Sign In</v-card-title>
                    <v-card-text class="text-center">
                        <v-text-field
                                label="Username"
                                prepend-icon="mdi-account-circle"></v-text-field>
                        <v-text-field
                                label="Password"
                                :type="showPassword ? 'text' : 'password'"
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword">
                        </v-text-field>
                    </v-card-text>

                    <v-divider>

                    </v-divider>
                    <v-card-actions>
                        <v-btn dark color="#40BFEF" class="mx-auto">
                            <router-link to="/home">Sign In</router-link>
                        </v-btn>
                    </v-card-actions>
                    <!--                    <router-view/>-->
                </v-card>
            </v-card>

        </v-content>

        <Footer/>

    </v-app>
</template>

<script>
    import Footer from '@/components/Footer'

    export default {
        name: "Sign",
        components: {
            Footer
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>