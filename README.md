The Future Is
=================

[future.chazzdesign.com](http://future.chazzdesign.com)  


### How to update project

- This project contains a Github webhook that is triggered every time a `git
push` is made on your local computer. 
- Whenever a new push is made, the weebhook will ping the Glitch
server both updating the code and refreshing the app. 
- This means that **you don't need to update the project on the Glitch editor, just develop locally, commit your code and do a `git push`.**


### How to install the project locally

#### The first time:

1. `git clone https://github.com/chazzdesign/futures-poster`
2. Execute `yarn install`
3. Create a `.env` file with the credentials (see `env.sample`)
4. Run the project with `ENV=development node server.js`

#### The following times:

1. Edit the project locally
2. git add .
3. git commit -m 'Code updated'
4. git push 


### Endpoints

#### FETCH & DELETE
- future.chazzdesign.com/api/fetch?secret=SECRET
- future.chazzdesign.com/api/delete/future/ID?secret=SECRET

#### GET
- [future.chazzdesign.com/api/future](http://future.chazzdesign.com/api/future): show one random tweet
- [future.chazzdesign.com/api/futures](http://future.chazzdesign.com/api/futures): show all the tweets


## Next steps:

- Use cron-job.org to ping the secret fetch URL every X minutes.
