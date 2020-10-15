const http = require('../utils/http');

/**
 * When a channel name gets changed send it to the webserver.
 * 
 * @param {*} bot 
 * @param {*} oldChannel 
 * @param {*} newChannel 
 */
module.exports = async (bot, oldChannel, newChannel) => {

    if(newChannel.type != 'text' && newChannel.type != 'voice' && newChannel.type != 'category') return;

    if(oldChannel.name != newChannel.name){

        const payload = {
            id: oldChannel.id,
            name: newChannel.name
        }

        http.patch('/guild/channel', payload).then( () => {
            console.log(`channel ${oldChannel.name} changed to ${newChannel.name} in ${newChannel.guild.name}.`);
        },
        err => {
            console.log("Error on updating channel name");
            console.log(err);
        });

    }
}