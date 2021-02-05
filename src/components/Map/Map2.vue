<template>
    <div id="mapContainer" class="basemap"></div>
</template>

<script>
    import mapboxgl from "mapbox-gl";

    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingClient = mbxGeocoding({accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA'});

    export default {
        name: "BaseMap",
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA',
                fetchedGeoData:[]
            };
        },
        methods: {
            flyToMyPoint() {

            }
        },
        mounted() {
            mapboxgl.accessToken = this.accessToken;

            let map = new mapboxgl.Map({
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [23.8223, 53.6688],
                zoom: 7,
            })

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
                        result
                        // latitude: match.features[0].center[0],
                        // longitude: match.features[0].center[1],
                    })
                    console.log('FETCH_GEO: ', this.fetchedGeoData)
                    return result

                })
                .then(res => {
                    const geoData = res
                    console.log('WORK')
                    map.flyTo({
                        center: geoData,
                        zoom: 12,
                        speed: 0.2,
                    })
                })
        },
    };
</script>

<style scoped>
    .basemap {
        width: 100vw;
        height: 100vh;
    }
</style>
