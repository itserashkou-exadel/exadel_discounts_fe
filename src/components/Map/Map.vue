<template>
    <div>
        <div id="mapContainer" class="basemap"></div>
    </div>

</template>

<script>
    import mapboxgl from "mapbox-gl";

    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingClient = mbxGeocoding({accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA'});


    export default {
        marker: null,
        name: "BaseMap",
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA',
                fetchedGeoData: [],
                fakeDataPoints: [
                    {
                        id: 1,
                        name: '',
                        description: '',
                        coordinates: [27.554179, 53.906461]
                    },
                    {
                        id: 2,
                        name: '',
                        description: '',
                        coordinates: [27.496666, 53.912810]
                    },
                    {
                        id: 3,
                        name: '',
                        description: '',
                        coordinates: [27.594500, 53.927107]
                    },
                    {
                        id: 4,
                        name: '',
                        description: '',
                        coordinates: [27.509685, 53.929633]
                    },
                    {
                        id: 5,
                        name: '',
                        description: '',
                        coordinates: [27.588133, 53.933288]
                    },
                ]
            };
        },
        mounted() {
            mapboxgl.accessToken = this.accessToken;

            //Map init
            let map = new mapboxgl.Map({
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [27.544592, 53.898477],
                zoom: 11,
            })

            this.fakeDataPoints.forEach((point) => {
                new mapboxgl.Marker({
                    color: 'red'
                })
                    .setLngLat(point.coordinates)
                    .addTo(map)
            })

            //ForwardGeoCodding logic
            // geocodingClient
            //     .forwardGeocode({
            //         query: 'Belarus, Homel',
            //     })
            //     .send()
            //     .then(response => {
            //         const match = response.body;
            //         console.log('match: ', match)
            //         let result = match.features[0].center
            //
            //         let latitude = match.features[0].center[0]
            //         console.log(latitude)
            //
            //         let longitude = match.features[0].center[1]
            //         console.log(longitude)
            //         console.log('Coordinates from query', result)
            //
            //         this.fetchedGeoData.push({
            //             //result
            //             latitude,
            //             longitude,
            //         })
            //         console.log('Fetched Geo Data: ', this.fetchedGeoData)
            //         return result
            //     })
            //     .then(res => {
            //         const geoData = res
            //         console.log('response: ', res)
            //         console.log('FlyTo new Point!')
            //         map.flyTo({
            //             center: geoData,
            //             zoom: 12,
            //             speed: 0.5,
            //         })
            //         return geoData
            //     })
            //     .then(res => {
            //         let newMarker = res
            //         console.log('Set marker from local state')
            //
            //         //Draw marker
            //         this.marker = new mapboxgl.Marker({
            //             color: "yellow",
            //             draggable: true
            //         })
            //             .setLngLat(newMarker)
            //             .addTo(map);
            //         console.log('Marker coordinates: ', this.marker._lngLat)
            //         console.log('Marker coordinates: ', this.marker)
            //         this.marker.on('dragend', () => {
            //             let lngLat = this.marker.getLngLat();
            //             console.log('New marker coordinates', lngLat)
            //
            //         })
            //         return this.marker
            //
            //     })
        },
        methods: {
            // newMarkerPoint(){
            //     let lngLat = this.marker.getLngLat();
            //     console.log(lngLat)
            // }
        },
        watch: {}
        // fetchedGeoData(){
        //     let lngLat = marker.getLngLat();
        // //
        // }

    };

</script>

<style scoped>
    .basemap {
        width: 100vw;
        height: 100vh;
    }

    .coordinates {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 10px;
        padding: 5px 10px;
        margin: 0;
        font-size: 11px;
        line-height: 18px;
        border-radius: 3px;
        display: none;
    }
</style>
