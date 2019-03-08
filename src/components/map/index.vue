<template>
  <div>
    <div id="mapid"></div>
  </div>
</template>

<style>
  #mapid {
    position: absolute;
    top: 38px;
    left: 0;
    height: calc(100% - 68px);
    width: 100%;
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
        map: null
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
      this.map = L.map('mapid')
      navigator.geolocation.getCurrentPosition(position => {
        var myPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        this.map.setView([myPosition.lat, myPosition.lng], 16)
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoibWFya2FtZXMiLCJhIjoiY2pzeng0bmVyMGVqMTQzdGh4ZWhsMzhpNSJ9.9ooXU5HPk5yffjhnZT0HJw'
        }).addTo(this.map)
        var marker = L.marker([myPosition.lat, myPosition.lng]).addTo(this.map)
        marker.bindPopup('My location')
      })
    },
    created () {
      this.setRefresh()
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
            for (let location of resp.locations) {
              var marker = L.marker(location.position).addTo(this.map)
              marker.bindPopup(location.infoText)
            }
          })
          .catch(resp => {
            alert(resp)
          })
      },
    }
  }
</script>