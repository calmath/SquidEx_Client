<template>
  <div>
    <loading v-if="loading"/>
    <div v-if="isAuthenticated">
      <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"/>
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Welcome to Calmath !</h1>
      <p>Some copy</p>
      <login/>
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
  import fakeFeed from './fakeFeed'
  import FeedItem from './feedItem.vue'
  import { mapGetters, mapState } from 'vuex'
  import Login from 'components/auth'

  export default {
    components: {
      Login,
      FeedItem
    },
    name: 'home',
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'getSquidexToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.squidexToken,
      }),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }
    },
    data () {
      return ({ fakeFeed })
    },
  }
</script>
