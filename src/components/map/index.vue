<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="!isTokenLoaded">
      Loading
    </div>
    <div>
      <h1>Welcome!!</h1>
      <div id="mapid"></div>
    </div>
  </div>
</template>

<style>
  #mapid { 
    height: 500px;
    width: 500px;
  }
</style>

<script>
  import squidexApi from 'utils/squidexApi'
  import { mapGetters, mapState } from 'vuex'
  import L from 'leaflet'

  export default {
    name: 'map',
    data () {
      return {
        intervalId: '',
        markers: [],
        center: { lat: 0, lng: 0 },
        locations: { total: 0, locations: [] },
        infoContent: '',
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      }
    },
    computed: {
      ...mapGetters(['getSquidexToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.squidexToken
      }),
      loading: function () {
        return !this.isTokenLoaded
      }
    },
    mounted () {
      var map = L.map('mapid')
      map.setView([51.505, -0.09], 13)
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFya2FtZXMiLCJhIjoiY2pzeng0bmVyMGVqMTQzdGh4ZWhsMzhpNSJ9.9ooXU5HPk5yffjhnZT0HJw'
      }).addTo(map)
    },
    created () {
      navigator.geolocation.getCurrentPosition(position => {
        // var myPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        // this.$refs.mmm.panTo(myPosition)
        // this.markers.push({position: myPosition, infoText: 'My location'})
      })
      // this.setRefresh()
    },
    beforeDestroy () {
      clearInterval(this.intervalId)
    },
    methods: {
      setRefresh () {
        var v = this
        this.intervalId = setInterval(function () {
          v.updateData()
          console.log('updating')
        }, 3000)
      },
      updateData () {
        const { token } = this

        squidexApi.getLocations(token)
          .then(resp => {
            this.locations = resp
            // this.markers = []
            // this.markers.push(...resp.locations)
          })
          .catch(resp => {
            alert(resp)
          })
      },
      /* toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position
        this.infoContent = marker.infoText
        // check if its the same marker that was selected if yes toggle
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
          this.infoWinOpen = true
          this.currentMidx = idx
        }
      } */
    }
  }
</script>