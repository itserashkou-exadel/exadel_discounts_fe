<template>
    <v-content>
        <Table/>
    </v-content>
</template>

<script>

    import Table from "@/components/Table";

    export default {
        name: "HomePage",
        mounted() {
            console.group('STATE')
            console.log(this.$store.getters.getUserLocation)
            console.groupEnd()
        },
        components: {
            Table
        }
    }
</script>


