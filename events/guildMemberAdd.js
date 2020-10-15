const http = require('../utils/http');

/**
 * Log when a new user joins the server.
 * 
 * @param {*} bot 
 * @param {*} guildMember 
 */
module.exports = async (bot, guildMember) => {
    // only manage whitelisted guilds and non bots
    if(guildMember.user.bot) return;

    const payloadUser = {
        id: guildMember.id,
        username: guildMember.user.username,
        active: true
    }

    const payloadGuildUser = {
        user: guildMember.id,
        guild: guildMember.guild.id,
        nickname: guildMember.nickname == null
            ? guildMember.user.username
            : guildMember.nickname
    }

    http.post('/user', payloadUser).then( () => {
        http.post('/guild/user', payloadGuildUser).then( () => {
            console.log(`${guildMember.user.username} joined ${guildMember.guild.name}.`);
        },
        err => {
            console.log("error on posting new guilduser");
            console.log(err);
        });
    },
    err => {
        console.log("error on posting new user");
        console.log(err);
    });

}