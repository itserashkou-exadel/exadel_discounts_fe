<template>
    <div id="map">
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
        />
    </div>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap} from "vue-mapbox";

    export default {
        components: {
            MglMap
        },
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA',
                mapStyle: 'mapbox://styles/mapbox/streets-v11',
            };
        },

        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        }
    };
</script>
<style scoped>
    #map {
        width: 100vw;
        height: 90vh;
    }
</style>
