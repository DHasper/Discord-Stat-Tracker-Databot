const http = require('../utils/http');

/**
 * When a guild member changes we check if the user's nickname has changed.
 * If so we send the new nickname to the webserver.
 * 
 * @param {*} bot 
 * @param {*} oldMember 
 * @param {*} newMember 
 */

module.exports = async (bot, oldMember, newMember) => {
    // only manage whitelisted guilds
    if(newMember.user.bot) return;

    // check if nickname changed
    if(newMember && oldMember && oldMember.nickname != newMember.nickname){

        // if user doesn't have a nickname use the username
        if(oldMember.nickname == null){
            oldMember.nickname = oldMember.user.username;
        }
        if(newMember.nickname == null){
            newMember.nickname = newMember.user.username;
        }

        const payload = {
            user: newMember.id,
            guild: newMember.guild.id,
            nickname: newMember.nickname
        }

        http.patch('/guild/user', payload).then( () => {
            console.log(`User ${oldMember.user.username} changed their nickname from ${oldMember.nickname} to ${newMember.nickname} in ${newMember.guild.name}.`);
        },
        err => {
            console.log("error on updating user nickname");
            console.log(err);
        });

    }
}