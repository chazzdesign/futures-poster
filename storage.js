var Sequelize = require('sequelize');

let Tweets;

var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
  storage: '.data/database.sqlite'
});


sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    
   Tweets = sequelize.define('tweets', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
     tweetID: {
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      }
    });
    
     // createDB();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });


const createDB = () => {
  Tweets.sync({ force: true }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
}

const createStorage = () => {
 
  const store = ({ tweetID, message, username }) => {
    return Tweets.create({ tweetID, message, username})
  }
  
  const getTweet = () => {
    return Tweets.findOne({ order: [sequelize.fn('RANDOM')] })
  }
  
  const getTweets = () => {
    return Tweets.findAll()
  }
  
  const returnUser = () => {
    return Tweets
  }
  
  const deleteTweetByID = (id) => {
    return Tweets.destroy({ where: { id },  force: true })
  }
  
  return {
    store,
    getTweet,
    getTweets,
    deleteTweetByID
  }
}

module.exports = createStorage()