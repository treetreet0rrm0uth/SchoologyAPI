const OAuth = require("oauth-1.0a")
const crypto = require("crypto")
const request = require("request")
let oauth

class SchoologyAPI {
  constructor(key, secret) {
    oauth = OAuth({
      consumer: {key, secret},
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64")
      }
    })
  }

  request(path, body = null, method = null?"POST":"GET") {
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
      }, (error, {statusCode}, body) => {
        if(error) {
        }else{
          resolve(JSON.parse(body))
        }
      })
    }).then(console.log)
  }
}

module.exports = SchoologyAPI