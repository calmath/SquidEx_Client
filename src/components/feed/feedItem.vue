<template>
  <div class="feed-item">
    <h1 v-text="feed.name"></h1>
    <p v-html="feed.content"></p>
  </div>
</template>

<style scoped>
  .feed-item {
    padding: 1em;
    width: 350px;
  }
</style>
<script>
  export default {
    name: 'feedItem',
    props: {feed: Object},
  }
</script>
