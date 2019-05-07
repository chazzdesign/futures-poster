require('dotenv').config()

const express = require('express')
const app = express()
const cmd = require('node-cmd')
const crypto = require('crypto')
const bodyParser = require('body-parser')

const Storage = require('./storage')
const Twitter = require('./twitter')

const SECRET = process.env.SECRET

const fetchTweets = (request, response) => {
  if (request.query.secret !== SECRET) {
    return
  }

  try {
    Twitter.getTweets()
    response.json({ ok: true })
  } catch (error) {
    throw new Error(error)
  }
}

const getRandomTweet = (request, response) => {
  Storage.getTweet().then((tweet) => {
    response.json(tweet)
  }).catch((error) => {
    throw new Error(error)
  })
}

const getAllTweets = (request, response) => {
  Storage.getTweets().then((tweets) => {
    response.json(tweets)
  }).catch((error) => {
    throw new Error(error)
  })
}

const hideTweet = (request, response) => {
  if (request.query.secret !== SECRET) {
    return
  }

  let id = +request.params.id

  Storage.hideTweetByID(id).then((tweet) => {
    response.json(tweet)
  }).catch((error) => {
    throw new Error(error)
  })
}

const deleteTweet = (request, response) => {
  if (request.query.secret !== SECRET) {
    return
  }

  let id = +request.params.id

  Storage.deleteTweetByID(id).then((tweet) => {
    response.json(tweet)
  }).catch((error) => {
    throw new Error(error)
  })
}

const showHome = (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
}

const onWebhook = (req, res) => {

  let hmac = crypto.createHmac('sha1', process.env.HOOK_SECRET)
  let sig  = `sha1=${hmac.update(JSON.stringify(req.body)).digest('hex')}`

  if (req.headers['x-github-event'] == 'push' && sig == req.headers['x-hub-signature']) {
    cmd.run('chmod 777 ./git.sh') 

    cmd.get('./git.sh', (err, data) => {
      if (data) {
        console.log(data)
      }

      if (err) {
        console.log(err)
      }
    })

    cmd.run('refresh')
  }

  return res.sendStatus(200)
}

app.use(express.static('public'))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', showHome)
app.get('/api/fetch', fetchTweets)
app.get('/api/future', getRandomTweet)
app.get('/api/futures', getAllTweets)
app.get('/api/delete/future/:id', deleteTweet)
app.get('/api/hide/future/:id', hideTweet)
app.post('/git', onWebhook)

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
