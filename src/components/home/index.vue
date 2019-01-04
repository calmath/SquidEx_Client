<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="isAuthenticated">
      Authenticated
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Welcome!</h1>
      <p>Some copy</p>
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
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus']),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }
    }
  }
</script>
