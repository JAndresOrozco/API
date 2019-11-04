<template class="back">
  <div>
    <div id="locationField">
     <input  style="width:300px" ref="autocomplete" 
        placeholder="Enter your Address" 
        class="search-location"
        onfocus="value = ''" 
        type="text" />
    </div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
      
    </template>
  </div>
</template>


 <style>

    .google-map{
        height: 610px;
        width: 1300px;
    }
    </style>

<script>   
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {

  data() {
    return {
      google: null,
      map: null,
      apiKey: "AIzaSyB67nVOFrwFuONhS_4P_fyCpF5JyIw9CcQ",
       location:null,
       gettingLocation: false,
      errorStr:null,
      origin:null,
      destination:null,
      search:null,
      placeSearch:"",
      autocomplete:"",
      autocomplete_textarea:"",
      places:'places',
    componentForm : {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
}
    }
  },
  created() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }
     this.gettingLocation = true;
    
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;
  
      var myLatLng = {
        lat: this.location.coords.latitude,
        lng: this.location.coords.longitude
      }

      this.marker(myLatLng);
      this.drawRoute(myLatLng);
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  },
  async mounted() {
     
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ["places"]
      })
    this.google = googleMapApi
    this.initializeMap()
     this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );
    this.To()
    
  },

  methods: {
     To()
   {
    this.autocomplete.addListener('place_changed', () => {
  let place = this.autocomplete.getPlace();
  let ac = place.address_components;
  let lat = place.geometry.location.lat();
  let lon = place.geometry.location.lng();
  let city = ac[0]["short_name"];
  console.log(`Ciudad ${city} latitud ${lat}, longitud: ${lon}`);
  var myLatLng2 = {
        lat: lat,
         lng: lon
         }
         console.log(myLatLng2)
     this.marker(myLatLng2);
     var myLatLng = {
        lat: this.location.coords.latitude,
         lng: this.location.coords.longitude
         }
     this.drawRoute(myLatLng,myLatLng2)
});
   },
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer,{
          center:{lat:23.6345005, lng: -102.5527878},
          zoom:6
      });
    },
    marker(position){
         var marker = new google.maps.Marker({
         position: position,
         map: this.map,
         title: "Hello World!"
       });
    },
    drawRoute(position,position2){
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(this.map);

      directionsService.route(
      {
        origin: position,
        destination: position2,
        travelMode: 'DRIVING'
      },
      function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });


    },
    Autocomplete()
    {
      // Cree el objeto de autocompletado, restringiendo la búsqueda
    var autocomplete = new google.maps.places.Autocomplete(
     (this.$refs.infowindowc),
      { types: ['geocode'] });
        console.log(this.search);
          
    }
  }
};

</script>