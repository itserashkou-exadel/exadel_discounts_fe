<template>
    <div class="mapWrapper">
        <div class="mapNavigation" >
            <div class="objectWrapper" v-for="point in fakeDataPoints">
                <h2>{{point.name}}</h2>
                <p>{{point.description}}</p>
                <p>{{point.address}}</p>
                <button class="primary mapAddButton" >Добавить</button>
            </div>
        </div>
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
                        name: 'Burger King 1',
                        description: 'Отличное место, чтио бы быстро покушать',
                        address: 'Сурганова 5',
                        coordinates: [27.554179, 53.906461]
                    },
                    {
                        id: 2,
                        name: 'Burger King 2',
                        description: 'Здесь лучшие бургеры',
                        address: 'Маяковского 15/2',
                        coordinates: [27.496666, 53.912810]
                    },
                    {
                        id: 3,
                        name: 'Burger King 3',
                        description: 'Ууууу луковые колечки',
                        address: 'Победы 34',
                        coordinates: [27.594500, 53.927107]
                    },
                    {
                        id: 4,
                        name: 'Burger King 4',
                        description: 'Комбо за 30 рублей на двоих',
                        address: 'Дзержинского 5',
                        coordinates: [27.509685, 53.929633]
                    },
                    {
                        id: 5,
                        name: 'Burger King 5',
                        description: 'Лучшее место что бы попить колы',
                        address: 'Брикеля 8',
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
            showPopUp(){

            }
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
        width: 80%;
        height: 100vh;
    }
    .objectWrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid royalblue;
        border-radius: 8px;
        margin: 10px;
        padding: 8px;
    }
    .mapAddButton{
        border-radius: 5px;
        padding: 5px;
    }
    .mapWrapper{
        display: flex;
    }
    .mapNavigation{
        width: 20%;
        background: lightgray;
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
