const OAuth = require("oauth-1.0a")
const crypto = require("crypto")
const request = require("request")
let oauth

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

  getAccessToken(body = null, method = null ? "POST" : "GET") {
    const url = "https://api.schoology.com/v1/oauth/access_token"
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
}

module.exports = SchoologyAPI

//tree tree t0rr m0uth