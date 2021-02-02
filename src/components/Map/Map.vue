<template class="pt-15">
    <div id="map">
        <MglMap
                :accessToken="accessToken"
                :mapStyle.sync="mapStyle"
                :center="[27.5666700, 53.9000000]"
                :zoom="9"
        >
            <div>
                !
            </div>
            <MglMarker :coordinates="coordinates1" color="blue">
                <MglPopup :coordinates="coordinates1" anchor="top">
                    <VCard>
                        <v-card-text>Marker 1</v-card-text>
                    </VCard>
                </MglPopup>

                <MglMarker :coordinates="coordinates2" color="blue">
                    <MglPopup :coordinates="coordinates2" anchor="top">
                        <VCard>
                            <v-card-text>Marker 2</v-card-text>
                        </VCard>
                    </MglPopup>
                </MglMarker>

                <MglMarker :coordinates="coordinates3" color="blue"/>
                <MglPopup :coordinates="coordinates3" anchor="top">
                    <VCard>
                        <v-card-text>Marker 3</v-card-text>
                    </VCard>
                </MglPopup>
            </MglMarker>

            <!--            <Footer/>-->
        </MglMap>
    </div>


</template>

<script>
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker, MglPopup} from "vue-mapbox";
    import Footer from "@/components/Footer";

    export default {
        components: {
            Footer,
            MglMap,
            MglMarker,
            MglPopup
        },
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA', // your access token. Needed if you using Mapbox maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
                coordinates1: [27.579803466796875, 53.921324836434714],
                coordinates2: [27.605552673339844, 53.88430926904454],
                coordinates3: [27.47920989990234, 53.88572576837868]
            };
        },
        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        },
        methods: {
            showPopUp() {

            }
        }
    }
</script>
<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
