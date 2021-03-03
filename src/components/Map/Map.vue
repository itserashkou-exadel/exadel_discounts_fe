<template v-slot:activator="{ on, attrs }">
    <div id="map">
        <div class="filter">
            <Modal class="modal"/>
            <DeleteFilter/>
        </div>
        <nav class="mapNavPanel">
            <LeftSideBar
                    v-bind:discountsFromStore="discountsFromStore"
                    v-bind:jumpToMarker="jumpToMarker"
                    :filterData="filterData"
            >

            </LeftSideBar>
        </nav>
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                @load="onMapLoaded"
                :center="coordinates"
                :zoom=3
        >
            <MglMarker :coordinates="[marker.address.location.longitude, marker.address.location.latitude]"
                       v-for="marker in discountsFromStore"
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
                            <v-img :src="pictureCheck(marker.pictureUrl)"></v-img>
                            <p>
                                {{marker.description}}
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
                dialog: false,
                discountsFromStore: [],
                result: [],
            };
        },
        mixins: [token],

        async mounted() {
            // const getData = () => {
            //     axios.post('https://localhost:9001/api/v1/discounts/search', {
            //         "searchText": "Меха",
            //         "searchDiscountOption": "All",
            //         "searchAddressCountry": "Беларусь",
            //         "searchAddressCity": "Минск",
            //         "searchSortFieldOption": "NameDiscount",
            //         "searchSortOption": "Asc",
            //         "searchPaginationPageNumber": 1,
            //         "searchPaginationCountElementPerPage": 20,
            //         "searchLanguage": "Ru",
            //         // "searchAdvanced": {
            //         //     "companyName": this.$store.state.filtered.vendor,
            //         //     "searchDate": {
            //         //         "startDate": this.$store.state.filtered.rangeDate[0],
            //         //         "endDate": this.$store.state.filtered.rangeDate[1],
            //         //     },
            //         //     "searchAmountOfDiscount": {
            //         //         "searchAmountOfDiscountMin": this.$store.state.filtered.range[0],
            //         //         "searchAmountOfDiscountMax": this.$store.state.filtered.range[1],
            //         //     },
            //         //     "searchRatingTotal": {
            //         //         "searchRatingTotalMin": this.$store.state.filtered.starRange[0],
            //         //         "searchRatingTotalMax": this.$store.state.filtered.starRange[1],
            //         //     }
            //         // }
            //     })
            //         .then((response) => {
            //             this.markersData = response.data;
            //             console.log(this.markersData)
            //         })
            //         .catch((error) => {
            //             alert(error);
            //         });
            // }
            //
            // await this.getToken(getData)
            console.log(this.discountsFromStore)
        },
        async created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        },
        computed: {
            filterData: function () {
                if (this.$store.state.discounts.length > 0) {
                    const arr = [];
                    this.discountsFromStore = this.$store.state.discounts;
                    console.log('DISCOUNTS FETCHED FROM STORE: ', this.discountsFromStore)
                    // this.discountsFromStore.map((item) => {
                    //     arr.push(
                    //         {
                    //             id: item.id,
                    //             service: item.name,
                    //             vendor: item.company.name,
                    //             amountOfDiscount: item.amountOfDiscount,
                    //             //startDate: moment(item.startDate).format('DD-MM-YYYY'),
                    //             //endDate: moment(item.endDate).format('DD-MM-YYYY'),
                    //             rating: item.ratingTotal,
                    //             description: item.description,
                    //             location: item.address.location
                    //         }
                    //     )
                    // })
                    // this.result = arr;
                    // console.log(this.result);
                    // return this.result;
                }
            },
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
            },
            pictureCheck(url) {
                return url ? url : "../../public/cat_404.jpg"
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
