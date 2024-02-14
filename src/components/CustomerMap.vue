<template>
    <div id="mapContainer" ref="mapContainer" style="height: 100vh; width: 100%;"></div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

export default {
    props: {
        postcodes: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            mapContainer: null,
            map: null,
            markers: []
        };
    },
    mounted() {
        this.initMap();
    },
    watch: {
        postcodes: {
            handler(newValue) {
                this.initMap();
            },
            immediate: true,
        },
    },
    methods: {
        initMap() {
            this.mapContainer = document.getElementById('mapContainer');

            const loader = new Loader({
                apiKey: 'AIzaSyDh1oWT7_2PxaQ84Ke5egogLerQBDBVMbA',
                version: 'weekly',
            });

            loader.load().then(() => {
                // (1) Set default focus to London
                this.map = new google.maps.Map(this.mapContainer, {
                    center: { lat: 51.5074, lng: -0.1278 },
                    zoom: 8,
                });

                // (2) Add marker for each postcode
                this.postcodes.forEach(postcode => {
                    this.geocodeAddress(postcode);
                });
            });
        },
        geocodeAddress(address) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results[0].geometry && results[0].geometry.location) {
                    const marker = new google.maps.Marker({
                        map: this.map,
                        position: results[0].geometry.location,
                        title: address,
                    });

                    this.markers.push(marker);
                } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`);
                }
            });
        },
        clearMarkers() {
            if (this.markers) {
                this.markers.forEach(marker => {
                    marker.setMap(null);
                });
                this.markers = [];
            }
        },
    },
};
</script>
  