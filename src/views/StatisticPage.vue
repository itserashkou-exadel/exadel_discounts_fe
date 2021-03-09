<template>
    <v-content class="ml-10 mr-10">
        <StatisticMain/>
    </v-content>
</template>

<script>
    import StatisticMain from "../components/StatisticMain";

    export default {
        name: "StatisticPage",
        mounted() {
        },
        components: {
            StatisticMain
        },
      watch: {
        $route: {
          immediate: true,
          handler(to, from) {
            document.title = to.meta.title || 'Statistic';
          }
        },
      }
    }
</script>


