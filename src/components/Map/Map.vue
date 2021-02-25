<template v-slot:activator="{ on, attrs }">
    <div id="map">
           <div class="filter">
               <Modal class="modal"/>
               <DeleteFilter/>
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
                       @click="test"

            >

                <MglPopup>
                    <VCard flat>
                        <v-card-title>
                            <h5>{{marker.name}}</h5>
                        </v-card-title>
                        <v-card-text>
                            <h4>Company:</h4> <span>{{marker.company.name}}</span>
                            <hr>
                            <p>
                                {{marker.company.description}}
                            </p>
                            <p>{{marker.amountOfDiscount}}%</p>
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
    import DeleteFilter from "@/components/Filter/DeleteFilter";

    const auth = new AuthService();


    export default {
        components: {
            DeleteFilter,
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
                dialog: false,
            };
        },
        // watch:{
        //     range: function(){
        //         this.changeFilter({
        //             ...this.$store.getters.getFilterData,
        //             range: [this.range[0], this.range[1]]
        //         })
        //     }
        // },
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
                    "searchLanguage": "Ru",
                    // "searchAdvanced": {
                    //     "companyName": this.$store.state.filtered.vendor,
                    //     "searchDate": {
                    //         "startDate": this.$store.state.filtered.rangeDate[0],
                    //         "endDate": this.$store.state.filtered.rangeDate[1],
                    //     },
                    //     "searchAmountOfDiscount": {
                    //         "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
                    //         "searchAmountOfDiscountMax": this.$store.state.filtered.range[1],
                    //     },
                    //     "searchRatingTotal": {
                    //         "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
                    //         "searchRatingTotalMax": this.$store.state.filtered.starRange[1],
                    //     }
                    // }
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
            test() {
                console.log('CLICK TEST!')
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
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        z-index: 10;
        top: 100px;
        right: 100px;
        height: 40px;
        border-radius: 5px;
    }
</style>
