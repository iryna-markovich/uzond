# uzond
Telegram bot to check dates in Pomorskim Urzędzie Wojewódzkim w Gdańsku

### Deployto th e heroku

1. Create the [Heroku account](https://heroku.com) and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).
2. Login to your Heroku account using `heroku login`.
3. Go to the app's folder using `cd ~/bot`
4. Run `heroku create` to prepare the Heroku environment.
5. Run `heroku config:set TOKEN=your_token CHAT_ID=your_chat_id` and `heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)` to configure environment variables on the server.
6. Run `git add -A && git commit -m "Ready to run on heroku" && git push heroku master` to deploy your bot to the Heroku server.
