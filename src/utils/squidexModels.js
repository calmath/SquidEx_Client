const squidexModels = {
}

squidexModels.transformMembers = function (squidexMembers) {
  var locations = []
  for (var i = 0, len = squidexMembers.length; i < len; i++) {
    locations.push(new Location(squidexMembers[i]))
  }
  return locations
}

squidexModels.transformFeeds = function (squidexFeeds) {
  var feeds = []
  for (var i = 0, len = squidexFeeds.length; i < len; i++) {
    feeds.push(new Feed(squidexFeeds[i]))
  }
  return feeds
}

function Location (squidexMembers) {
  this.id = squidexMembers.id
  this.infoText = squidexMembers.data.name.iv
  this.position = { lat: squidexMembers.data.location.iv.latitude, lng: squidexMembers.data.location.iv.longitude }
}

function Feed (squidexFeed) {
  this.id = squidexFeed.id
  this.name = squidexFeed.data.name.iv
  this.content = squidexFeed.data.content.iv
}

export default squidexModels
