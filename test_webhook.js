'use strict'
const line = require('./index')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//let PORT = process.env.PORT||'5000';



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

app.get('/gettest/',function(req,res,next){
    res.send('GET request to homepage');
})


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
  line.init({
  accessToken: 'XkspzccnpZrgal6P74uqgX4m8NiD09wH+HCpgWslhp0QmwWnH7ZhpXxULqQufSBBLpVYMPGAKhnS0cgb+JSLwh+L3jrWhXRid4TRLxId9QCcqRQPbC3Xt3CDRqfHDXxfOGdwlF+mzjPJDD7yfPFzeAdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'e93f969b88ab56e1cd3b7fd4f5629461'
})

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
var http = require('http');
var server = http.createServer(app);

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number,()=>{
  
  console.log('Express server listening on port  in mode')
});



app.post('/test2/',function(req,res,next){
  console.log('in test2');
  line.init({
    accessToken:'A89SLD2SDnS8887JMNkvjKCcQJahdohlPJITolq06Ci6GmhEabzKS9ce2Mmd2wpCbU8FvIhkcqlO8VwgPSV2/DjmgqmrKvTUW00UZrT8DFnmCM7nY0tudx2UyzvxywYO+Jf1dkOZOflvF5t/7KKaIwdB04t89/1O/w1cDnyilFU=',

    channelSecret:'6abf01d14c90b819c5950c59b10f243f'
  });
 
      var msg = req.body.text

          console.log(msg)
          return line.client.pushMessage({
            to:'C2ef7b7fc64cedf4d0e2c8be95823f8e6', 
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
/*
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port in mode')
})
*/