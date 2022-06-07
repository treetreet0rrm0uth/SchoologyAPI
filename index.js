const axios = require("axios")
const request = require("request")

class SchoologyAPI {
  constructor(key, secret) {
    this.key = key
    this.secret = secret
  }

  request(path) {
    const key = this.key
    const secret = this.secret
    const url = "https://api.schoology.com/v1" + path
    return new Promise((resolve, reject) => {
      request.get(url, {
        oauth: {
          consumer_key: key,
          consumer_secret: secret
        }
      }, function (err, res, body) {
        resolve(body)
      })
    })
  }

  createRequestToken(body = null, method = "GET") {
    const key = this.key
    const secret = this.secret
    const url = "https://api.schoology.com/v1/oauth/request_token"
    return new Promise((resolve, reject) => {
      request.get(url, {
        oauth: {
          consumer_key: key,
          consumer_secret: secret,
        }
      }, function (err, res, body) {
        resolve(body)
      })
    })
  }

  getAccessToken(requestToken) {
    const key = this.key
    const secret = this.secret
    const url = "https://api.schoology.com/v1/oauth/access_token"
    const parsedRequestToken = this.parseRequestToken(requestToken)
    return new Promise((resolve, reject) => {
      request.get(url, {
        oauth: {
          consumer_key: key,
          consumer_secret: secret,
          token: parsedRequestToken.finalKey,
          token_secret: parsedRequestToken.finalSecret
        }
      }, function (err, res, body) {
        resolve(body)
      })
    })
  }

  parseRequestToken(input) {
    const finalKey = input.slice(12, 53)
    const finalSecret = input.slice(73, 105)
    return { finalKey, finalSecret }
  }

  clientRequest(path, token) {
    const key = this.key
    const secret = this.secret
    const url = "https://api.schoology.com/v1" + path
    const clientToken = this.parseRequestToken(token)
    return new Promise((resolve, reject) => {
      request.get(url, {
        oauth: {
          consumer_key: key,
          consumer_secret: secret,
          token: clientToken.finalKey,
          token_secret: clientToken.finalSecret
        }
      }, function (err, res, body) {
        resolve(body)
      })
    })
  }
}

module.exports = SchoologyAPI

//tree tree t0rr m0uth