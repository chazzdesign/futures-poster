The Future Is
=================

Digital poster for the Madrid Speculative Futures meetup. The poster grabs tweets containing the string 'The future is' and show them to you.

[future.chazzdesign.com](http://future.chazzdesign.com)  

### How to update this project

- This project contains a Github webhook that is triggered every time a `git
push` is made on your local computer. 
- Whenever you push some code, the weebhook will ping the Glitch
server updating the code and refreshing the app.
- This means that **you don't need to update the project on the Glitch editor, just develop locally, commit your code and do a `git push`.**
- If you edit the code in Glitch and the update the code in Github, the code in Glitch will be lost.

### How to install the project locally

#### The first time:

1. `git clone https://github.com/chazzdesign/futures-poster`
2. Execute `yarn` (or `npm install`)
3. Create an `.env` file with the credentials (see `env.sample`)
4. Run the project with `ENVIRONMENT=development node server.js`
5. The terminal will show the port you need to use (eg: `Your app is listening on port 49922`)
6. Open `http://localhost:PORT` in a browser 
7. The first time, fetch some tweets with `http://localhost:PORT/api/fetch?secret=SECRET`

#### The following times:

1. Edit the project locally
2. Add your changes to git with `git add .`
3. Commit the changes with a nice message `git commit -m 'Code updated 🐬'`
4. Push the changes `git push`

### Endpoints

#### FETCH & DELETE
- future.chazzdesign.com/api/fetch?secret=SECRET
- future.chazzdesign.com/api/delete/future/ID?secret=SECRET

#### GET
- [future.chazzdesign.com/api/future](http://future.chazzdesign.com/api/future): show one random tweet
- [future.chazzdesign.com/api/futures](http://future.chazzdesign.com/api/futures): show all the tweets


### Updating

This project is autoupdated every 10 minutes using [cron-job.org](https://cron-job.org).
