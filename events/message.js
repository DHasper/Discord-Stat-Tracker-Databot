const config = require("../config.json")

const handlers = require('../handlers');

const messageHandler = new handlers.MessageHandler.MessageHandler();
const commandHandler = new handlers.CommandHandler.CommandHandler();


/**
 * When a user sends a message in a whitelisted text channel we send it to 
 * the webserver. If the message is a command for this bot execute the command.
 * 
 * @param {*} bot 
 * @param {*} message 
 */
module.exports = async (bot, message) => {

    // only manage whitelisted guilds

    // let the typing event know that the user sent a message
    if(bot.typingUsers.has(message.author.id)){
        bot.typingUsers.get(message.author.id)[1] = true;
    }

    // check if message is a command
    if(message.content.startsWith(config['prefix'])) {

        const contents = message.content.slice(config['prefix'].length).trim().split(' ');

        const command = contents[0];
        const args = contents.slice(1);

        commandHandler.handle(command, args, message);
    }

    messageHandler.newMessage(bot, message);

}