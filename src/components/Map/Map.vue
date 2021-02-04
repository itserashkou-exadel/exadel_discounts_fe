<template>
    <MglMap
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            id="map"
            :center="[27.5666700, 53.9000000]"
            :zoom="9"
    />
</template>

<script>
    import Mapbox from "mapbox-gl";
    import { MglMap } from "vue-mapbox";

    export default {
        components: {
            MglMap
        },
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA', // your access token. Needed if you using Mapbox maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11' // your map style
            };
        },

        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        }
    };
</script>

<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
