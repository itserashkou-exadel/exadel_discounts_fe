<template>
    <div id="map">
        <div class="filter">
            <Modal class="modal"/>
        </div>

        <nav class="mapNavPanel">
            <LeftSideBar
                    v-bind:markersData="markersData"
                    v-bind:jumpToMarker="jumpToMarker"
            >

            </LeftSideBar>
        </nav>
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                @load="onMapLoaded"
                :center="coordinates"
                :zoom=11
        >
            <MglMarker :coordinates="[marker.address.location.latitude, marker.address.location.longitude]"
                       v-for="marker in markersData"

            >
                <MglPopup>
                    <VCard flat>
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
    import Modal from "@/components/Filter/Modal";

    import AuthService from "@/services/auth.service";
    import token from '@/mixins/token.mixin'

    const auth = new AuthService();


    export default {
        components: {
            Modal,
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
            };
        },
        mixins: [token],

        async mounted() {
                const getData = () => {
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
                }

                await this.getToken(getData)
        },
        async created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
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
            },
        }
    };
</script>

<style scoped>
    #map {
        width: 100vw;
        height: 90vh;
        display: flex;
    }

    .mapNavPanel {
        position: fixed;
        z-index: 1;
        margin-bottom: 25px;
    }

    .testBtn {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
    }

    .filter {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 10;
        top: 100px;
        right: 100px;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background: royalblue;
    }
</style>
