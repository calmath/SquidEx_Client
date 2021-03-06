import squidexModels from 'utils/squidexModels'

// const bcrypt = require('bcrypt')
const crypto = require('crypto')
var config = require('../../settings.json')
// const saltRounds = 10

const squidexApi = {
  url: 'https://cloud.squidex.io',
  appName: config.appName,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  authToken: {}
}

squidexApi.getAccessToken = () => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/identity-server/connect/token'
  var data = 'grant_type=client_credentials&client_id=' + squidexApi.clientId + '&client_secret=' + squidexApi.clientSecret + '&scope=squidex-api'
  setTimeout(() => {
    try {
      var request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            resolve(JSON.parse(request.response))
          }
        }
      }
      request.open('POST', url)
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      request.send(data)
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.createMember = (member) => new Promise((resolve, reject) => {
  squidexApi.authToken = member.token
  const hash = crypto.createHash('sha256')
  hash.update(member.password)
  member.password = hash.digest('hex')
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members?publish=true'
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'POST', data: '{ name: { iv: \'' + member.name + '\' }, username: { iv: \'' + member.username + '\' }, password: { iv: \'' + member.password + '\' }}'}).then((value) => {
        alert(value)
        resolve({ id: value.id, username: value.data.username.iv, name: value.data.name.iv })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.updateMember = (member) => new Promise((resolve, reject) => {
  squidexApi.authToken = member.token
  const hash = crypto.createHash('sha256')
  hash.update(member.password)
  member.password = hash.digest('hex')
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members/' + member.id
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'PATCH', data: '{ name: { iv: \'' + member.name + '\' }, username: { iv: \'' + member.username + '\' }, password: { iv: \'' + member.password + '\' }}'}).then((value) => {
        value = JSON.parse(value)
        resolve({ id: member.id, name: value.name.iv, username: value.username.iv })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.updateMemberLocation = (member) => new Promise((resolve, reject) => {
  squidexApi.authToken = member.token
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members/' + member.id
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'PATCH', data: '{ location: { iv: { latitude: ' + member.location.lat + ', longitude: ' + member.location.lng + ' }}}'}).then((value) => {
        value = JSON.parse(value)
        resolve({ id: member.id })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.authenticateMember = (member) => new Promise((resolve, reject) => {
  squidexApi.authToken = member.token
  const hash = crypto.createHash('sha256')
  hash.update(member.password)
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members?$filter=data/username/iv eq \'' + member.username + '\''
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'GET'}).then((value) => {
        var members = JSON.parse(value)
        if (members.total === 1 && hash.digest('hex') === members.items[0].data.password.iv) {
          resolve({ id: members.items[0].id, username: members.items[0].data.username.iv, name: members.items[0].data.name.iv })
        } else {
          reject(new Error('User details incorrect'))
        }
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.getMember = (member) => new Promise((resolve, reject) => {
  squidexApi.authToken = member.token
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members/' + member.id
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'GET'}).then((value) => {
        var member = JSON.parse(value)
        if (member) {
          resolve({ id: member.id, username: member.data.username.iv, name: member.data.name.iv })
        } else {
          reject(new Error('User details incorrect'))
        }
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.getLocations = (token) => new Promise((resolve, reject) => {
  squidexApi.authToken = token
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/members'
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'GET'}).then((value) => {
        var members = JSON.parse(value)
        resolve({ total: members.total, locations: squidexModels.transformMembers(members.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

squidexApi.getFeeds = (token) => new Promise((resolve, reject) => {
  squidexApi.authToken = token
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/feeds'
  setTimeout(() => {
    try {
      makeXMLHTTPRequest({url: url, method: 'GET'}).then((value) => {
        var feeds = JSON.parse(value)
        resolve({ total: feeds.total, feeds: squidexModels.transformFeeds(feeds.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

const makeXMLHTTPRequest = ({url, method, ...args}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      var request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 || request.status === 201) {
            resolve(request.response)
          }
        }
      }
      request.open(method, url)
      request.setRequestHeader('Content-Type', 'application/json')
      request.setRequestHeader('Accept', 'application/json')
      request.setRequestHeader('Authorization', 'Bearer ' + squidexApi.authToken.access_token)
      if (args.data) {
        request.send(args.data)
      } else {
        request.send()
      }
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default squidexApi
