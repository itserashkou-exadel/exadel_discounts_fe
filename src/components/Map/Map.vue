<template class="pt-15">
  <div id="map">
    <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="[27.5666700, 53.9000000]"
        :zoom="9"
    >
      <div>
        !
      </div>
      <MglMarker :coordinates="coordinates1" color="blue"/>
      <MglMarker :coordinates="coordinates2" color="blue"/>
      <MglMarker :coordinates="coordinates3" color="blue"/>
      <MglGeocoderControl
          :accessToken="accessToken"
          @results="handleSearch"
      />

    </MglMap>
  </div>


</template>

<script>

import Mapbox from "mapbox-gl";
import axios from 'axios'
import {
  MglMap, MglMarker,
} from "vue-mapbox";
import MglGeocoderControl from 'vue-mapbox-geocoder'

export default {
  components: {
    MglMap,
    MglMarker,
    MglGeocoderControl
  },
  data() {
    return {
      accessToken: 'pk.eyJ1Ijoic3RpZ21hYnkiLCJhIjoiY2traWJpcGc5MHduNjJwcXRnYXlyM2p2ayJ9.oQtdhez6948Aq30pQWBGiA', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
      coordinates1: [27.579803466796875, 53.921324836434714],
      coordinates2: [27.605552673339844, 53.88430926904454],
      coordinates3: [27.47920989990234, 53.88572576837868],

    };
  },
  methods: {
    handleSearch(event) {
      console.log( "GEOCODER" + event);
    },
    created() {

      this.mapbox = Mapbox;
    },


  }

}
</script>
<style>
#map {
  width: 100vw;
  height: 100vh;
}
.container {
  padding: 0px;
}

</style>
