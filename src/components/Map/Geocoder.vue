<template>
    <div>
        {{geocoder}}
    </div>
</template>

<script>
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    export default {
        name: "Geocoder"
    }
</script>

<style scoped>

</style>
