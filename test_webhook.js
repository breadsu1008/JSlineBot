'use strict'
const line = require('./index')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

// init with auth
line.init({
  accessToken: 'XkspzccnpZrgal6P74uqgX4m8NiD09wH+HCpgWslhp0QmwWnH7ZhpXxULqQufSBBLpVYMPGAKhnS0cgb+JSLwh+L3jrWhXRid4TRLxId9QCcqRQPbC3Xt3CDRqfHDXxfOGdwlF+mzjPJDD7yfPFzeAdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'e93f969b88ab56e1cd3b7fd4f5629461'
})

/**
 * response example (https://devdocs.line.me/ja/#webhook):
 * {
 *   "events": [
 *     {
 *       "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
 *       "type": "message",
 *       "timestamp": 1462629479859,
 *       "source": {
 *         "type": "user",
 *         "userId": "u206d25c2ea6bd87c17655609a1c37cb8"
 *       },
 *       "message": {
 *         "id": "325708",
 *         "type": "text",
 *         "text": "Hello, world"
 *       }
 *     }
 *   ]
 * }
 */

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: event.message.text
          }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test/',function (req,res,next) {
  console.log('in test')

          var msg = req.body.text

          console.log(msg)
          return line.client.pushMessage({
            to:'C4fc5423f8ec14ffd1fd006790a37f614', 
            messages:[{
              type: 'text',
              text: msg
            }]
          })
           .then(()=>{
        res.json({success:true})
      })
           .catch((err)=>{
            res.json({success:false})
           });
})
app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})
