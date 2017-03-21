'use strict';

let express = require('express');
let server = express(); 
let rp = require('request-promise'); 

// personal token generate via github settings
let personalToken = "";


server.get('/', (req, res) => {
  console.log(req.body)
  res.send('ok');
})

server.post('/receive/github', (req, res) => {

  let payload;

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    console.log(chunk)
      payload += chunk;
    });

  // the end event indicates that the entire body has been received
  req.on('end', () => {
    console.log('end');
    try {
      const data = JSON.parse(payload);
      // write back something interesting to the user:
      console.log(data);
      res.send('ok');

    } catch (er) {
      // uh oh!  bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });

  req.on('finish', () => {
    console.log('finish')
  })

})

server.post('/create/webhook', (req, res) => {
  // `https://api.github.com/repos/:owner/:repo/hooks`
  let uri = "https://api.github.com/repos/way2nnadi/web/hooks";

  // endpoint that receives payload
  let callBackUri = "https://055c16a0.ngrok.io/receive/github";

  let options = {
    uri: uri,
    method: 'POST',
    body: {
      "name": "web",
      "active": true,
      "events": [
        "push",
        "create",
        "pull_request"
      ],
      "config": {
        "url": callBackUri,
        "content_type": "json"
      }
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'token ' + personalToken
    },
    json: true
  }

  // make request to github api endpoint 
  // creates webhook
  rp(options)
    .then(data => {
      console.log(data);
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

server.get('/get/webhook', (req, res) => {
  // `https://api.github.com/repos/:owner/:repo/hooks`
  let uri = "https://api.github.com/repos/way2nnadi/web/hooks";

  let options = {
    uri: uri,
    method: 'GET',
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'token ' + personalToken
    },
    json: true
  }

  // make request to github api endpoint 
  // creates webhook
  rp(options)
    .then(data => {
      console.log(data);
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

server.get('/delete/webhook', (req, res) => {
  // `https://api.github.com/repos/:owner/:repo/hooks`
  let uri = "https://api.github.com/repos/way2nnadi/web/hooks/12751751";

  let options = {
    uri: uri,
    method: 'DELETE',
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'token ' + personalToken
    },
    json: true
  }

  // make request to github api endpoint 
  // creates webhook
  rp(options)
    .then(data => {
      console.log(data);
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})
// HELPER FUNCTIONS

function respondOnAsana(pr) {
  pr.description
  .match(asanaLinkPattern)
  .forEach(notifyAsanaThread)
}

function notifyAsanaThread(asana) {
  author = asana.created_by
  asana.comment("Merged. Back to @" + author.tag)
  asana.assignTo(author)
}

server.listen(4000, () => {
  console.log('Listening on Port:' + 4000);

})