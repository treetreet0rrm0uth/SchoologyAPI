const OAuth = require('oauth-1.0a')
const crypto = require('crypto')
const request = require('request')

const base = "https://api.schoology.com/v1"
const key = "31d4034b0ff433c448cb5d4615e1f81f0623d1211"
const secret = "c459f83102c46712714e8e758ae1c9ed"

const oauth = OAuth({
    consumer: {key, secret},
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
        return crypto
            .createHmac("sha1", key)
            .update(base_string)
            .digest('base64')
    }
})

function SchoologyAPI (path, body = null, method = null?'POST':'GET') {
    const url = base + path
    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        body: body && JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...oauth.toHeader(oauth.authorize({ url, method }))
        }
      }, (err, { statusCode }, body) => {
        if(err) {
        }else{
          resolve(JSON.parse(body))
        }
      })
    })
    .then(console.log)
}
SchoologyAPI("/messages/inbox")
module.exports = SchoologyAPI