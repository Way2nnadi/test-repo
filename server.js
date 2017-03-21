'use strict';

let express = require('express');
let server = express(); 
let rp = require('request-promise'); 


server.get('/', (req, res) => {
  console.log(req.body)
  res.send('ok');
})

server.post('/receive/github', (req, res) => {
  console.log(req.body)

  let payload = req.body

  if (payload.actions === 'closed') {

    // fire the code the asana code

    // respondOnAsana(pr)

  }
  res.send('ok');
})

server.post('/create/webhook', (req, res) => {
  // `https://api.github.com/repos/:owner/:repo/hooks`
  let uri = "https://api.github.com/repos/way2nnadi/test-repo";

  // endpoint that receives payload
  let callBackUri = "https://055c16a0.ngrok.io/receive/github";

  // personal token generate via github settings
  let personalToken = "552e2e193755f0d0a9986a60600b57698f6a1c2c";

  let options = {
    uri: uri,
    method: 'POST',
    body: {
      "name": "web",
      "active": true,
      "events": [
        "push",
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