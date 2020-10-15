const config = require('../config.json');
const http = require('../utils/http');

class MessageHandler {

    constructor() {
        this.memeChannels = config['memeChannels'];
    }

    /**
     * This function checks if we should send this message to the webserver.
     * 
     * @param {*} message 
     */
    shouldSend(message) {
        if(message.author.bot) return false;
        if(config["blacklistedChannels"].includes(message.channel.id)) return false;

        return true;
    }

    /**
     * Function to check wether a message contains a meme. For now we consider
     * a message to contain a message if it's send in a 'memeChannel' specified in the config
     * and if the message has a link or attachment.
     * 
     * @param {*} message 
     */
    isMeme(message) {

        if(this.memeChannels.includes(message.channel.id)) {

            // if message has attachment
            if(message.attachments.size > 0) {
                return true;
            }

            // if message has link
            if(message.content && message.content.indexOf('https://') != -1 || message.content.indexOf('http://') != -1) {
                return true;
            }

        }

        return false;
    }

    /**
     * Parses a new message object and sends relevant information to the
     * webserver
     * 
     * @param {*} message the message to send
     * @param {*} typingTime the time it took the user to type this message
     */
    newMessage(bot, message) {

        if(!this.shouldSend(message)) return;

        const typingTime = bot.typingUsers.has(message.author.id)
        ? bot.typingUsers.get(message.author.id)[0]
        : 0 

        const payload = {
            id: message.id,
            user: message.author.id,
            channel: message.channel.id,
            guild: message.guild.id,
            content: message.content,
            typingTime: typingTime,
            meme: this.isMeme(message),
            file: message.attachments.size > 0 ? true : false
        }

        http.post('/message', payload).then( () => {
            console.log(`Message sent in guild ${message.guild.name} in channel ${message.channel.name} by user ${message.author.username}.`);
        },
        err => {
            console.log("Error on posting message");
            console.log(err);
        });

    }

    /**
     * Updates a message object on the webserver.
     * 
     * @param {*} message 
     */
    updateMessage(message) {

        if(!this.shouldSend(message)) return;

        const payload = {
            id: message.id,
            content: message.content,
            meme: this.isMeme(message),
            file: message.attachments.size > 0 ? true : false
        }

        http.patch('/message', payload).then( () => {
            console.log(`Message from ${message.author.username} changed in channel ${message.channel.name} in guild ${message.guild.name}.`);
        },
        err => {
            console.log("Error on updating message");
            console.log(err);
        });
    }

    /**
     * Deletes a message object from the webserver.
     * 
     * @param {*} message 
     */
    deleteMessage(message) {

        if(!this.shouldSend(message)) return;

        http.delete('/message/' + message.id).then( () => {
            console.log(`Message from ${message.author.username} in channel ${message.channel.name} in guild ${message.guild.name} has been deleted.`);
        },
        err => {
            console.log("Error on deleting message");
            console.log(err);
        });
    }
}

module.exports = {
    MessageHandler
}