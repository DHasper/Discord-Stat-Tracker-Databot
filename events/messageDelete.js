const { MessageHandler } = require('../handlers/message');

const messageHandler = new MessageHandler();

/**
 * When a messages gets deleted we delete it from the web server aswell.
 * 
 * @param {*} bot 
 * @param {*} message 
 */
module.exports = async (bot, message) => {
    messageHandler.deleteMessage(message);
}