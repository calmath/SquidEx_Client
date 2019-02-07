<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="isAuthenticated">
      Authenticated
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Welcome!</h1>
      <p>Some copy</p>
      <GmapMap
        :center="{lat:0, lng:0}"
        :zoom="16"
        ref="mmm"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
        @click="clicked"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        markers: [
         // { position: localStorage.getItem('position') }
        ]
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus']),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }
    },
    created () {
      navigator.geolocation.getCurrentPosition(position => {
        var myPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        this.$refs.mmm.panTo(myPosition)
        this.markers.push({position: myPosition})
      })
    },
    methods: {
      clicked (e) {
        this.markers.push({ position: e.latLng })
      }
    }
  }
</script>
