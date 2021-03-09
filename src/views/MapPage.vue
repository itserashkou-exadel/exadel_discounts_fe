<template>
    <Map/>
</template>

<script>
    import Map from "@/components/Map/Map";
    import Footer from "@/components/Footer";
    import token from '@/mixins/token.mixin'

    export default {
        name: "MapPage",
        mixins: [token],
        components: {Footer, Map},
      watch: {
        $route: {
          immediate: true,
          handler(to, from) {
            document.title = to.meta.title || 'Map';
          }
        },
      }
    }
</script>

<style>
    /*.container {*/
    /*    padding: 0px;*/
    /*}*/
</style>
