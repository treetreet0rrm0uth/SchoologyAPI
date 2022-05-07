const OAuth = require("oauth-1.0a")
const crypto = require("crypto")
const request = require("request")
let oauth
let pooauth
let key
let secret

class SchoologyAPI {
  constructor(key, secret) {
    oauth = OAuth({
      consumer: { key, secret },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64")
      }
    })
  }

  request(path, body = null, method = null ? "POST" : "GET") {
    const url = "https://api.schoology.com/v1" + path
    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        body: body && JSON.stringify(body),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          ...oauth.toHeader(oauth.authorize({ url, method }))
        }
      }, (err, { statusCode }, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  }

  createRequestToken(body = null, method = null ? "POST" : "GET") {
    const url = "https://api.schoology.com/v1/oauth/request_token"
    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        body: body && JSON.stringify(body),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          ...oauth.toHeader(oauth.authorize({ url, method }))
        }
      }, (err, { statusCode }, body) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(body)
        }
      })
    })
  }

  getAccessToken(requestToken, body = null, method = "POST") {
    const url = "https://api.schoology.com/v1/oauth/access_token"
    const oauthKey = requestToken.slice(12, 53)
    const oauthSecret = requestToken.slice(73, 105)
    const token = {
      key: oauthKey,
      secret: oauthSecret,
    }
    pooauth = OAuth({
      consumer: { key, secret },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64")
      }
    })
    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        body: body && JSON.stringify(body),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          ...pooauth.toHeader(pooauth.authorize({ url, method }))
        }
      }, (err, { statusCode }, body) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(body)
        }
      })
    })
  }
}

module.exports = SchoologyAPI

//tree tree t0rr m0uth