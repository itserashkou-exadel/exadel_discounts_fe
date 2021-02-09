<template>
  <v-app>
    <v-app-bar app
               flat
               dark
               color="#40bfef"
    >
      <HeadermMobile class="hidden-md-and-up"/>
      <Header class="hidden-sm-and-down"/>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer absolute app flat color="#40bfef">
      <Footer/>
    </v-footer>
  </v-app>
</template>
<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import HeadermMobile from "@/components/Header/HeaderMobile";

export default {
  components: {HeadermMobile, Footer, Header},
}
</script>

<style>
html { overflow-y: auto }
</style>
