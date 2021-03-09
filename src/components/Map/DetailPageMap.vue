<template>
    <div id="map">
        <MglMap
                :accessToken="accessToken"
                :mapStyle.sync="mapStyle"
                @load="onMapLoaded"
        >
            <MglMarker :coordinates="[this.dataInfo.longitude, this.dataInfo.latitude]" color="yellow">
<!--                <MglPopup>-->
<!--                    <v-card-->
<!--                            flat-->
<!--                    >-->
<!--                        <v-card-title class="cardTitleBorder"><h5>{{marker.name}}</h5></v-card-title>-->
<!--                        <v-img :src="pictureCheck(marker.pictureUrl)"/>-->
<!--                        <v-card-text>-->
<!--                            <h4>Company:{{marker.company.name}}</h4>-->
<!--                            <hr>-->
<!--                            <p>{{marker.amountOfDiscount}}%</p>-->
<!--                            <p>{{marker.id}}</p>-->
<!--                            <p>{{marker.address.location.longitude}}</p>-->
<!--                            <p>{{marker.address.location.latitude}}</p>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </MglPopup>-->
            </MglMarker>
        </MglMap>
    </div>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglMarker} from "vue-mapbox";

    export default {
        components: {
            MglMap,
            MglMarker
        },
        props: ['info'],
        data() {
            return {
                accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA',
                mapStyle: 'mapbox://styles/mapbox/streets-v11',
                dataInfo: [],
            };
        },
        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        },
        mounted() {
            this.getProps()
        },
        methods: {
            async onMapLoaded(event) {
                // in component
                this.map = event.map;
                // or just to store if you want have access from other components
                this.$store.map = event.map;

                // Here we cathing 'load' map event
                const asyncActions = event.component.actions
                const newParams = await asyncActions.flyTo({
                    center: [this.dataInfo.longitude, this.dataInfo.latitude],
                    //center: [this.dataInfo.latitude, this.dataInfo.longitude],
                    zoom: 20,
                    speed: 1
                })
                // console.log(newParams)
            },
            getProps(){
                let self = this;
                //console.log(self.info);
                this.dataInfo = self.info.address.location
                // console.log('Data Info: ', this.dataInfo)
            },
        }
    };
</script>
<style scoped>
    #map {
        width: 100vw;
        height: 80vh;
    }
</style>
