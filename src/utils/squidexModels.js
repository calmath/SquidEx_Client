const squidexModels = {
}

squidexModels.transformFeeds = function (squidexFeeds) {
  var feeds = []
  for (var i = 0, len = squidexFeeds.length; i < len; i++) {
    feeds.push(new Feed(squidexFeeds[i]))
  }
  return feeds
}

function Feed (squidexFeed) {
  this.id = squidexFeed.id
  this.name = squidexFeed.data.name.iv
  this.content = squidexFeed.data.content.iv
}

export default squidexModels
