const http = require('../utils/http');

/**
 * Log when a user leaves the server.
 * 
 * @param {*} bot 
 * @param {*} guildMember 
 */
module.exports = async (bot, guildMember) => {

    // only manage whitelisted guilds and non bots
    if(guildMember.user.bot) return;

    http.delete('/guild/user/' + guildMember.id + "/" + guildMember.guild.id).then( () => {
        console.log(`${guildMember.user.username} left ${guildMember.guild.name}.`);
    },
    err => {
        console.log("error on deleting leaving user");
        console.log(err);
    });

}