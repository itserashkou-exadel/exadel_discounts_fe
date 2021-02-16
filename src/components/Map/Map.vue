<template>
    <div id="map">
        <nav class="mapNavPanel">
            <LeftSideBar
                    v-bind:markersData="markersData"
                    v-bind:jumpToMarker="jumpToMarker"
            />
        </nav>
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                @load="onMapLoaded"
                :center="coordinates"
                :zoom=11
        >
            <MglMarker :coordinates="[marker.address.location.latitude, marker.address.location.longitude]"
                       v-for="marker in markersData">
                <MglPopup>
                    <VCard outlined>
                        <v-card-title>
                            <div>{{marker.name}}</div>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                <span>
                                    Company: {{marker.company.name}}
                                </span>
                            </p>
                            <p>
                                {{marker.company.description}}
                            </p>
                        </v-card-text>
                    </VCard>
                </MglPopup>
            </MglMarker>

        </MglMap>
    </div>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker, MglPopup} from "vue-mapbox";
    import LeftSideBar from "@/components/Map/LeftSideBar/LeftSideBar";
    import axios from "axios";

    import AuthService from "@/services/auth.service";

    const auth = new AuthService();


    export default {
        components: {
            LeftSideBar,
            MglMarker,
            MglPopup,
            MglMap
        },
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA', // your access token. Needed if you using Mapbox maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
                coordinates: [27.544592, 53.898477],
                markersData: [],
                // fakeTestData: [
                //     {
                //         id: '1',
                //         name: 'Burger King 1',
                //         description: 'Отличное место, чтио бы быстро покушать',
                //         address: 'Сурганова 5',
                //         coordinates: [27.554179, 53.906461]
                //     },
                //     {
                //         id: 2,
                //         name: 'Burger King 2',
                //         description: 'Здесь лучшие бургеры',
                //         address: 'Маяковского 15/2',
                //         coordinates: [27.496666, 53.912810]
                //     },
                //     {
                //         id: 3,
                //         name: 'Burger King 3',
                //         description: 'Ууууу луковые колечки',
                //         address: 'Победы 34',
                //         coordinates: [27.594500, 53.927107]
                //     },
                //     {
                //         id: 4,
                //         name: 'Burger King 4',
                //         description: 'Комбо за 30 рублей на двоих',
                //         address: 'Дзержинского 5',
                //         coordinates: [27.509685, 53.929633]
                //     },
                //     {
                //         id: 5,
                //         name: 'Burger King 5',
                //         description: 'Лучшее место что бы попить колы',
                //         address: 'Брикеля 8',
                //         coordinates: [27.588133, 53.933288]
                //     },
                // ]

            };
        },
        async mounted() {
            const authorizationHeader = 'Authorization';
            auth.getAccessToken().then((userToken) => {
                axios.defaults.headers.common[authorizationHeader] = `Bearer ${userToken}`;
                axios.post('https://localhost:9001/api/v1/discounts/search', {
                    "searchText": "Меха",
                    "searchDiscountOption": "All",
                    "searchAddressCountry": "Беларусь",
                    "searchAddressCity": "Минск",
                    "searchSortFieldOption": "NameDiscount",
                    "searchSortOption": "Asc",
                    "searchPaginationPageNumber": 1,
                    "searchPaginationCountElementPerPage": 20,
                    "searchLanguage": "Ru"
                })
                    .then((response) => {
                        this.markersData = response.data;
                        console.log(this.markersData)
                    })
                    .catch((error) => {
                        alert(error);
                    });

            });
            this.fillingFields();

            // fetch('http://localhost:3000/fakeDataPoints')
            //     .then(response => response.json())
            //     .then(data => {
            //         this.fakeData = data
            //         console.log(this.fakeData)
            //     })
            // .then(res => {
            //     this.fakeData = res.data
            //     console.log(this.fakeData)
            // })
            // axios.post('https://localhost:9001/api/v1/discounts/search', {
            //     "searchText": "Меха",
            //     "searchDiscountOption": "All",
            //     "searchAddressCountry": "Беларусь",
            //     "searchAddressCity": "Минск",
            //     "searchSortFieldOption": "NameDiscount",
            //     "searchSortOption": "Asc",
            //     "searchPaginationPageNumber": 1,
            //     "searchPaginationCountElementPerPage": 20,
            //     "searchLanguage": "Ru"
            // })
            //     .then(res => {
            //         this.markersData = res.data
            //         console.log(res)
            //     })

        },
        async created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
            // try {
            //     this.fakeData = await axios.get('http://localhost:3000/fakeDataPoints')
            //     console.log('ES7', this.fakeData)
            // } catch (e) {
            //     console.error(e)
            // }

            // try {
            //     this.markersData = await axios.post('https://localhost:9001/api/v1/discounts/search', {
            //         "searchText": "Меха",
            //         "searchDiscountOption": "All",
            //         "searchAddressCountry": "Беларусь",
            //         "searchAddressCity": "Минск",
            //         "searchSortFieldOption": "NameDiscount",
            //         "searchSortOption": "Asc",
            //         "searchPaginationPageNumber": 1,
            //         "searchPaginationCountElementPerPage": 20,
            //         "searchLanguage": "Ru"
            //     })
            //     console.log(this.markersData)
            // } catch (e) {
            //     console.error(e)
            // }
        },
        methods: {
            onMapLoaded(event) {
                // in component
                this.map = event.map;
                // or just to store if you want have access from other components
                //this.$store.map = event.map;
            },
            jumpToMarker(coordinates) {
                this.map.flyTo({
                    center: coordinates,
                    zoom: 16,
                    speed: 2
                })
                console.log('WORK', coordinates)
            }
        }
    };
</script>

<style scoped>
    #map {
        width: 100vw;
        height: 90vh;
        display: flex;
    }
    .mapNavPanel{
        margin-bottom: 25px;
    }
</style>
