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
            />
        </nav>
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                @load="onMapLoaded"
                :center="setUserLoc()"
                :zoom=11
        >
            <MglMarker :coordinates="[marker.address.location.longitude, marker.address.location.latitude]"
                       v-for="marker in discountsFromStore"
            >
                <MglPopup>
                    <v-card
                            flat
                    >
                        <v-card-title class="cardTitleBorder"><h5>{{marker.name}}</h5></v-card-title>
                        <v-img :src="pictureCheck(marker.pictureUrl)"/>
                        <v-card-text>
                            <h4>Company:{{marker.company.name}}</h4>
                            <hr>
                            <p>{{marker.description}}</p>
                            <p>{{marker.amountOfDiscount}}%</p>
                            <v-btn
                                    class="ml-8 mb-3 primary"
                                    @click="$router.push({name:'detail',params:{_id:marker.id}})"
                            >Подробно
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </MglPopup>
            </MglMarker>
        </MglMap>
    </div>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker, MglPopup} from "vue-mapbox";
    import LeftSideBar from "@/components/Map/LeftSideBar/LeftSideBar";
    import Modal from "@/components/Filter/Modal";
    import token from '@/mixins/token.mixin'
    import DeleteFilter from "@/components/Filter/DeleteFilter";

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
                coordinates: null,
                dialog: false,
                discountsFromStore: [],
                result: [],
                markerID: null
            };
        },
        mixins: [token],
      async created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        },
        computed: {
            filterData: function () {
                if (this.$store.state.discounts.length > 0) {
                    this.discountsFromStore = this.$store.state.discounts;
                }
            },
        },
        methods: {
            onMapLoaded(event) {
                this.map = event.map;
            },
            jumpToMarker(coordinates, id) {
                this.discountsFromStore.find((i) => {
                    if (i.id === id) {
                        this.map.flyTo({
                            center: coordinates,
                            zoom: 16,
                            speed: 2
                        })
                    }
                })
            },
            pictureCheck(url) {
                return url ? url : "../../public/cat_404.jpg"
            },
            setUserLoc() {
                const userTown = this.$store.getters.getUserLocation.town
                switch (userTown) {
                    case 'Минск' || 'Minsk':
                        return this.coordinates = [27.556265080371784, 53.900853106872894]
                    case 'Гродно' || 'Grodno':
                        return this.coordinates = [23.821290940502898, 53.67018624655573]
                    case 'Брест' || 'Brest':
                        return this.coordinates = [23.713864391355475, 52.106804702096255]
                    case 'Гомель' || 'Gomel':
                        return this.coordinates = [30.985821597248332, 52.437059977979644]
                    case 'Витебск' || 'Vitebsk':
                        return this.coordinates = [30.202789083737947, 55.183766663654396]
                    case 'Вильнюс' || 'Vilnius':
                        return this.coordinates = [25.261185109081957, 54.667765625184714]
                    case 'Клайпеда' || 'Klaipeda':
                        return this.coordinates = [21.155826546179373, 55.705647243214884]
                    case 'Беласток' || 'Bialystock':
                        return this.coordinates = [23.159497627634497, 53.13872756721303]
                    case 'Варшава' || 'Warsaw':
                        return this.coordinates = [21.05020133968254, 52.23621882731236]
                    case 'Щецин' || 'Szczecin':
                        return this.coordinates = [14.543855316369838, 53.432944135462435]
                    case 'Познань' || 'Poznan':
                        return this.coordinates = [16.91290904438683, 52.40306045752039]
                    case 'Ташкент' || 'Tashkent':
                        return this.coordinates = [69.26410055783313, 41.29545885172744]
                    case 'Винница' || 'Vynnytsia':
                        return this.coordinates = [28.47994460571252, 49.23016918857903]
                    case 'Львов' || 'Lviv':
                        return this.coordinates = [24.026310082753604, 49.83820380047078]
                    case 'Одесса' || 'Odesa':
                        return this.coordinates = [30.729353117526045, 46.458077445054215]
                    case 'Харьков' || 'Kharkiv':
                        return this.coordinates = [36.271398424596036, 49.98258686896893]
                    case 'Киев' || 'Kyiv':
                        return this.coordinates = [30.54916399444433, 50.445697829160686]
                    case 'Дрезден' || 'Dresden':
                        return this.coordinates = [13.734378796098722, 51.04838431086731]
                    case 'Челябинск' || 'Chelyabinsk':
                        return this.coordinates = [61.39951117616081, 55.16016712388462]
                    case 'Екатеринбург' || 'Yekaterinburg':
                        return this.coordinates = [60.61451771229935, 56.83157715872755]
                    case 'Walnut Creek' || 'Walnut Creek':
                        return this.coordinates = [-122.05648884499455, 37.90218934298263]
                    case 'Boulder' || 'Boulder':
                        return this.coordinates = [-105.2552595074929, 40.01641836015882]
                    default:
                    //alert('Location Error')
                }
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

    .cardTitleBorder {
        border: 1px solid dodgerblue;
        border-radius: 3px;
        margin-bottom: 3px;
    }

    .mapNavPanel {
        margin-bottom: 25px;
    }

    .filter {
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        z-index: 10;
        bottom: 100px;
        right: 100px;
        height: 40px;
        border-radius: 5px;
    }

    @media screen and (max-width: 375px) {
        #map {
            display: flex;
            flex-direction: column;
        }

        MglMap {
            width: 375px;
            height: 500px;
            order: 1;
        }

        .mapNavPanel {
            order: 2;
            overflow: scroll;
        }

        .filter {
            width: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            z-index: 10;
            top: 20px;
            right: 40px;
            height: 20px;
            border-radius: 5px;
        }
    }
</style>
