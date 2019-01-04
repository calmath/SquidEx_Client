<template>
  <div>
    <div>
      <feed-item v-for="(feed, index) in feeds.feeds" :key="index" :feed="feed"/>
    </div>
  </div>
</template>

<style>
  .feed {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

<script>
  import FeedItem from './feedItem.vue'
// import {FEEDS_REQUEST} from 'actions/feeds'
  import squidexApi from 'utils/squidexApi'
  import { mapGetters, mapState } from 'vuex'

  export default {
    components: {
      FeedItem
    },
    name: 'feed',
    data () {
      return {
        feeds: { total: 0, feeds: [] }
      }
    },
    created () {
      const { token } = this
      squidexApi.getFeeds(token)
        .then(resp => {
          this.feeds = resp
        })
        .catch(resp => {
          alert(resp)
        })
    },
    computed: {
      ...mapGetters(['getSquidexToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.squidexToken
      }),
    },
  }
</script>
