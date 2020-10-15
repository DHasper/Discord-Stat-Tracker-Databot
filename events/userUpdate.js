const http = require('../utils/http');

/**
 * When a user changes we check if the user's username has changed.
 * If so we send the new username to the webserver.
 * 
 * @param {*} bot 
 * @param {*} oldUser 
 * @param {*} newUser 
 */
module.exports = async (bot, oldUser, newUser) => {

    // don't manage bots
    if(newUser.bot) return;

    // check if username changed
    if(oldUser && newUser && oldUser.username != newUser.username){

        const payload = {
            user: newUser.id,
            username: newUser.username
        }

        http.patch('/user', payload).then( () => {
            console.log(`User ${oldUser.username} changed their username to ${newUser.username}.`);
        },
        err => {
            console.log("error on updating username");
            console.log(err);
        });

    }
}