# Discord Stat Tracker Databot

This is a discord bot for my stat tracking website. As of right now it is still a work in progress. When it's done users should be able to invite the bot to their discord server. The purpose of the bot is to collect all data it has access to, and send it to a web API. In the future it will also have some commands that allows server admins to easily configure the bot for their server.

## Check out the other repositories for this project:

The backend for the stat tracker website: [![Discord-Stat-Tracker-Webserver](https://img.shields.io/static/v1?label=&message=Discord-Stat-Tracker-Webserver&color=000605&logo=github&logoColor=white&labelColor=000605)](https://github.com/DHasper/Discord-Stat-Tracker-Webserver)

The frontend for the stat tracker website: [![Discord-Stat-Tracker-Website](https://img.shields.io/static/v1?label=&message=Discord-Stat-Tracker-Website&color=000605&logo=github&logoColor=white&labelColor=000605)](https://github.com/DHasper/Discord-Stat-Tracker-Website)

## Stats tracked

### Messages

The bot will collect every message that it has access to see. If the message gets deleted or edited, the bot will also process that. Deleted or edited messages will also be deleted or edited on the web API. 

For every message the bot will collect the following data:
- content
- server
- channel
- author
- date
- typing time
- has a file

### Voice chat activity

The bot keeps track of when users are in voice channels. This data can be used to get insight on the voice channel behaviour of users within a server. The interval at which the bot does this is configurable in the config file. 

### Presence

The bot collects all discord presences it sees in a server every set interval. This interval is configurable in the config file. This can be used to see 