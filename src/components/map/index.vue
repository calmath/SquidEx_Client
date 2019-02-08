<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="!isTokenLoaded">
      Loading
    </div>
    <div v-if="isTokenLoaded">
      <h1>Welcome!</h1>
      <GmapMap
        :center="center"
        :zoom="12"
        ref="mmm"
        map-type-id="terrain"
        style="width: 800px; height: 550px"
      >
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
          {{infoContent}}
        </gmap-info-window>
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false" @click="toggleInfoWindow(m,index)"/>
      </GmapMap>
    </div>
  </div>
</template>

<style>
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

<script>
  import squidexApi from 'utils/squidexApi'
  import { mapGetters, mapState } from 'vuex'

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

    },
    created () {
      navigator.geolocation.getCurrentPosition(position => {
        var myPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        this.$refs.mmm.panTo(myPosition)
        this.markers.push({position: myPosition, infoText: 'My location'})
      })
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
            this.markers = []
            this.markers.push(...resp.locations)
          })
          .catch(resp => {
            alert(resp)
          })
      },
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position
        this.infoContent = marker.infoText
        // check if its the same marker that was selected if yes toggle
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen
        } else {
          this.infoWinOpen = true
          this.currentMidx = idx
        }
      }
    }
  }
</script>
