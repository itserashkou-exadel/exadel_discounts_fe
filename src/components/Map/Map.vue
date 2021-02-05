<template class="pt-15">
    <div id="map">
        <MglMap
                container="map"
                :accessToken="accessToken"
                :mapStyle.sync="mapStyle"
                :center="[27.5666700, 53.9000000]"
                :zoom="9"
        />
    </div>
</template>

<script>
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import mapboxgl from "mapbox-gl";
    import {MglMap, MglMarker, MglPopup} from "vue-mapbox";


    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingClient = mbxGeocoding({accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA'});


    export default {
        components: {
            MglMap,
            MglMarker,
            MglPopup,

        },
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA', // your access token. Needed if you using mapboxgl maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
                fetchedGeoData: []
            };
        },
        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = mapboxgl;

        },
        mounted() {
            geocodingClient
                .forwardGeocode({
                    query: 'Belarus, Homel',
                })
                .send()
                .then(response => {

                    const match = response.body;
                    let result = match.features[0].center
                    console.log(result)

                    this.fetchedGeoData.push({
                        geoData: result
                        // latitude: match.features[0].center[0],
                        // longitude: match.features[0].center[1],
                    })
                    console.log('FETCH_GEO: ', this.fetchedGeoData)
                    return result

                })
                .then(res => {
                    console.log('WORK')
                    mapboxgl.flyTo({
                        center: [45, 45],
                        zoom: 9,
                        speed: 0.2,
                        curve: 1,
                        easing(t) {
                            return t;
                        }
                    })
                })
        },
        methods: {
            async onMapLoaded(event) {
                // Here we cathing 'load' map event
                const asyncActions = event.component.actions

                const newParams = await asyncActions.flyTo({
                    //longitude, latitude
                    center: [35, 26],
                    zoom: 12,
                    speed: 1
                })
                console.log(newParams)
            },
            flyToPoint() {
                map.flyTo({
                    center: [35, 26],
                })
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
