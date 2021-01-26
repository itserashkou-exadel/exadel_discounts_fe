<template>
    <v-app>
        <!--      <v-container>-->
        <!--          <v-row justify="start" >-->
        <!--              <v-col cols="4">-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col cols="4">-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col cols="4" >-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col cols="4" >-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col cols="4" >-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--          </v-row>-->
        <!--          <v-spacer class="my-16"></v-spacer>-->
        <!--          <v-row justify="space-between">-->
        <!--              <v-col col="4">-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col col="4">-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--              <v-col col="4">-->
        <!--                  <Typography />-->
        <!--              </v-col>-->
        <!--          </v-row>-->

        <Cards/>
<!--        :descriptions2="descriptions2"-->





        <v-main>

            <!-- Provides the application the proper gutter -->


            <!-- If using vue-router -->
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
