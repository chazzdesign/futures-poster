const express = require('express')
const app = express()

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

const deleteTweet = (request, response) => {
  if (request.query.secret !== SECRET) {
    return
  }
  
  let id = +request.params.id
  
  Storage.deleteTweetByID(id).then((tweet) => {
    console.log(tweet)
    response.json(tweet)
  }).catch((error) => {
    throw new Error(error)
  })
}

const showHome = (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
}

app.use(express.static('public'))

app.get('/', showHome)
app.get('/api/fetch', fetchTweets)
app.get('/api/future', getRandomTweet)
app.get('/api/futures', getAllTweets)
app.get('/api/delete/future/:id', deleteTweet)

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})