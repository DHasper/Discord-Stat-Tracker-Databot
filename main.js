const discord = require('discord.js');
const config = require("./config.json")
const { checkConnection } = require('./functions');

const bot = new discord.Client();

bot.typingUsers = new Map();
bot.commands = new Map();

require('./handlers/event')(bot);

// checkConnection().then( res => {
//     if (res) bot.login(config["botToken"]);
//     else process.exit(22);
// });

bot.login(config["botToken"]);