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
                :center="setUserLoc()"
                :zoom=9
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
                //coordinates: [27.544592, 53.898477],
                coordinates: null,
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
            //console.log(this.discountsFromStore)
            console.log(this.$store.getters.getUserLocation.town)
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
            setUserLoc() {
                if (this.$store.getters.getUserLocation.town === 'Минск' || 'Minsk') {
                    this.coordinates = [27.556265080371784, 53.900853106872894]
                } else if (this.$store.getters.getUserLocation.town === 'Гродно' || 'Grodno') {
                    this.coordinates = [23.821290940502898, 53.67018624655573]
                }else if (this.$store.getters.getUserLocation.town === 'Брест'  || 'Brest') {
                    this.coordinates = [23.713864391355475, 52.106804702096255]
                }else if (this.$store.getters.getUserLocation.town === 'Гомель' || 'Gomel') {
                    this.coordinates = [30.985821597248332, 52.437059977979644]
                }else if (this.$store.getters.getUserLocation.town === 'Вильнюс' || 'Vilnius') {
                    this.coordinates = [25.261185109081957, 54.667765625184714]
                }else if (this.$store.getters.getUserLocation.town === 'Клайпеда' || 'Klaipeda') {
                    this.coordinates = [21.155826546179373, 55.705647243214884]
                }else if (this.$store.getters.getUserLocation.town === 'Беласток' || 'Bialystock') {
                    this.coordinates = [23.158810835791517, 53.13399030244814]
                }else if (this.$store.getters.getUserLocation.town === 'Варшава' || 'Warsaw') {
                    this.coordinates = [21.05020133968254, 52.23621882731236]
                }else if (this.$store.getters.getUserLocation.town === 'Щецин' || 'Szczecin') {
                    this.coordinates = [14.543855316369838, 53.432944135462435]
                }else if (this.$store.getters.getUserLocation.town === 'Познань' || 'Poznan') {
                    this.coordinates = [16.91290904438683, 52.40306045752039]
                }else if (this.$store.getters.getUserLocation.town === 'Ташкент' || 'Tashkent') {
                    this.coordinates = [69.26410055783313, 41.29545885172744]
                }else if (this.$store.getters.getUserLocation.town === 'Винница' || 'Vynnytsia') {
                    this.coordinates = [28.47994460571252, 49.23016918857903]
                }else if (this.$store.getters.getUserLocation.town === 'Львов' || 'Lviv') {
                    this.coordinates = [24.026310082753604, 49.83820380047078]
                }else if (this.$store.getters.getUserLocation.town === 'Одесса' || 'Odesa') {
                    this.coordinates = [30.729353117526045, 46.458077445054215]
                }else if (this.$store.getters.getUserLocation.town === 'Харьков' || 'Kharkiv') {
                    this.coordinates = [36.271398424596036, 49.98258686896893]
                }else if (this.$store.getters.getUserLocation.town === 'Киев' || 'Kyiv') {
                    this.coordinates = [30.54916399444433, 50.445697829160686]
                }else if (this.$store.getters.getUserLocation.town === 'Дрезден' || 'Dresden') {
                    this.coordinates = [13.734378796098722, 51.04838431086731]
                }else if (this.$store.getters.getUserLocation.town === 'Челябинск' || 'Chelyabinsk') {
                    this.coordinates = [61.39951117616081, 55.16016712388462]
                }else if (this.$store.getters.getUserLocation.town === 'Екатеринбург' || 'Yekaterinburg') {
                    this.coordinates = [60.61451771229935, 56.83157715872755]
                }else if (this.$store.getters.getUserLocation.town === 'Walnut Creek' || 'Walnut Creek') {
                    this.coordinates = [-122.05648884499455, 37.90218934298263]
                }else if (this.$store.getters.getUserLocation.town === 'Boulder' || 'Boulder') {
                    this.coordinates = [-105.2552595074929, 40.01641836015882]
                }
                return this.coordinates
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
