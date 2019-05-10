const natural = require('natural')
const Twit = require('twit')

const Storage = require('./storage')

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token:  process.env.ACCESS_TOKEN, 
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const CONFIG = {
  QUERY: 'the future is',
  DEFAULT_LANGUAGE: 'en',
  TWEET_COUNT: 100,
  TWEET_MODE: 'extended'
}

const Tokenizer = new natural.SentenceTokenizer({ language: CONFIG.DEFAULT_LANGUAGE })
const REGEXP = new RegExp(`^(?!RT)(.*?)${CONFIG.QUERY} (.*?)$`, 'gi')

const createTwitter = () => {

  const getTweets = () => {

    let q = `"${CONFIG.QUERY}"`
    let count = CONFIG.TWEET_COUNT
    let tweet_mode = CONFIG.TWEET_MODE

    T.get('search/tweets', { count, tweet_mode, q }, onGetTweets)
  }

  const onGetTweets = (err, data, response) => {

    if (err) {
      throw(err)
    } 

    data.statuses.forEach(analyzeStatus)
  }

  const analyzeStatus = (status) => {

    let result = REGEXP.exec(status.full_text || status.text)

    if (result && result[2]) {
      try { 

        let tweet = result[2]

        let sentences = Tokenizer.tokenize(tweet)

        let tweetID = status.id
        let username = status.user.screen_name
        let publishedAt = status.created_at
        let message = sentences[0].trim()

        if (status.possibly_sensitive || message.includes('http')) {
          return
        }

        let removeUsernamesReg = new RegExp('/(\s+|^)@\S+/', 'g')
        message = message.replace(removeUsernamesReg, '')

        let removeHashtags = new RegExp('/(\s+|^)#\S+/', 'g')
        message = message.replace(removeHashtags, '')

        if (message && message.length < 200) {
          Storage.store({ tweetID, message, username, publishedAt })
            .catch((e) => {
              // console.log(e)
            })
        }
      } catch (e) {
        console.log(result[2])
        console.log('Error', e)
      }
    }
  }

  const updateTweets = () => {
    return Storage.getTweets().then((tweets) => {
      tweets.forEach((tweet) => {
      console.log(tweet)
        updateTweet(tweet)
      })
    })
  }


  return {
    updateTweets,
    getTweets
  }
}

module.exports = createTwitter()
