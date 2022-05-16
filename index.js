import OAuth from "oauth-1.0a"
import crypto from "crypto"
import axios from "axios"

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

  request(path, body = null, method = "GET") {
    const url = "https://api.schoology.com/v1" + path
    return new Promise((resolve, reject) => {
      axios.get(url, {
        responseType: "json",
        body: body && JSON.stringify(body),
        headers: { ...oauth.toHeader(oauth.authorize({ url, method })) },
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          const requestJSON = JSON.parse(JSON.stringify(error))
          console.error(requestJSON.code)
        })
    })
  }

  createRequestToken(body = null, method = "GET") {
    const url = "https://api.schoology.com/v1/oauth/request_token"
    return new Promise((resolve, reject) => {
      axios.get(url, {
        responseType: "json",
        body: body && JSON.stringify(body),
        headers: { ...oauth.toHeader(oauth.authorize({ url, method })) },
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          const requestJSON = JSON.parse(JSON.stringify(error))
          console.error(requestJSON.code)
        })
    })
  }

  //getAccessToken(requestToken, body = null, method = "GET") {
  //  const url = "https://api.schoology.com/v1/oauth/access_token"
  //  const parsedRequestToken = this.parseRequestToken(requestToken)
  //  pooauth = OAuth({
  //    consumer: { key, secret },
  //    signature_method: "HMAC-SHA1",
  //    hash_function(base_string, key) {
  //      return crypto
  //        .createHmac("sha1", key)
  //        .update(base_string)
  //        .digest("base64")
  //    }
  //  })
  //  return new Promise((resolve, reject) => {
  //    axios.get(url, {
  //      responseType: "json",
  //      body: body && JSON.stringify(body),
  //      headers: { ...pooauth.toHeader(pooauth.authorize({ url, method })) },
  //    })
  //      .then(response => {
  //        resolve(response.data)
  //      })
  //      .catch(error => {
  //        const requestJSON = JSON.parse(JSON.stringify(error))
  //        console.error(requestJSON.code)
  //      })
  //  })
  //}

  parseRequestToken(input) {
    const finalKey = input.slice(12, 53)
    const finalSecret = input.slice(73, 105)
    return { finalKey, finalSecret }
  }
}

export default SchoologyAPI

//tree tree t0rr m0uth