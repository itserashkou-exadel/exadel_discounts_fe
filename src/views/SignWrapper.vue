<template>
    <div></div>
</template>

<script>
    import {mapActions} from 'vuex'
    import AuthService from '../services/auth.service';
    const auth = new AuthService();
    import token from '@/mixins/token.mixin.js'

    export default {
        name: "SignWrapper",
        mixins: [token],
        methods: {
            ...mapActions(['goForAuth'])
        },
        mounted() {
             this.goForAuth(auth).then(() =>
                 token.methods.setFirstAuth(auth))
        },
    }
</script>

<style scoped>

</style>
