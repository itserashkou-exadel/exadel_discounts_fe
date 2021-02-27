<template>
    
</template>

<script>
    import AuthService from '../services/auth.service';
    const auth = new AuthService();

    export default {
        name: "SignWrapper",
        created() {
            auth.login()
        },
    }
</script>

<style scoped>

</style>
