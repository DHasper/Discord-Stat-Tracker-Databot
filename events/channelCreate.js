const http = require('../utils/http');

/**
 * When a new channel gets created send it to the webserver.
 * 
 * @param {*} bot 
 * @param {*} channel 
 */
module.exports = async (bot, channel) => {

    if(channel.type != 'text' && channel.type != 'voice' && channel.type != 'category') return;

    const payload = {
        id: channel.id,
        guild: channel.guild.id,
        name: channel.name,
        type: channel.type
    }

    http.post('/guild/channel', payload).then( () => {
        console.log(`New channel added in ${channel.guild.name} with name ${channel.name}.`);
    },
    err => {
        console.log("Error on posting guild channel");
        console.log(err);
    });
}