const config = require('../config.json');
const { MessageHandler } = require('../handlers/message');

const messageHandler = new MessageHandler();

/**
 * Update the message on the web server.
 * 
 * @param {*} bot 
 * @param {*} oldMessage 
 * @param {*} newMessage 
 */
module.exports = async (bot, oldMessage, newMessage) => {

    if(oldMessage && newMessage && newMessage.content != oldMessage.content){
        messageHandler.updateMessage(newMessage);
    }
}