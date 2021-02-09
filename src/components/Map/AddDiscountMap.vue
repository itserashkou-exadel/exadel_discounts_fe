<template class="pt-15">
  <div id="addDiscountMap">
    <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="coordinates"
        :zoom="15"
    >
      <div>
        !
      </div>
      <MglMarker :coordinates="coordinates" color="red"
                 :draggable="true"/>
    </MglMap>
  </div>
</template>

<script>

import Mapbox from "mapbox-gl";
import axios from 'axios'
import {
  MglMap, MglMarker, MglGeolocateControl
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
      accessToken: 'pk.eyJ1IjoibGliZXJhdmVtIiwiYSI6ImNra3NieXZiZzBkYncycXBiYjNnc2FlN2YifQ.JnPErwA0TD5kk43WGMobLg', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      coordinates: [27.579803466796875, 53.921324836434714],
      fetchedGeoData: [],
    };
  },
  props: ['address'],
  watch: {
    address: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.findLocation(newValue);
      }
    }
  },
  methods: {
    findLocation(addr) {
      if (addr.country && addr.city && addr.line) {
        console.log(JSON.stringify(addr));
        let fullAddress = [addr.country, addr.city, addr.line].join(' ');
        this.callGeocoderApi(fullAddress);
      }
    },
    callGeocoderApi(address) {
      let params = {
        access_token: 'pk.eyJ1IjoibGliZXJhdmVtIiwiYSI6ImNra3NieXZiZzBkYncycXBiYjNnc2FlN2YifQ.JnPErwA0TD5kk43WGMobLg'
      }
      const updateCoordinates = (coords) => {
        this.coordinates = coords;
      }
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${params.access_token}&limit=1`)
          .then(function (response) {
            console.log(response)
            response.data.features.forEach(f => console.log(`${f.center}-${f.place_name}`))
            if (response.data.features) {
              updateCoordinates(response.data.features[0].center);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    created() {
      this.mapbox = Mapbox;
    }
  }
};
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
