const { initLog } = require('../functions');
const config = require("../config.json")

/**
 * When bot is ready start the initial data log. Also set the activity.
 * 
 * @param {*} bot 
 */
module.exports = async bot => {
    console.log("Bot is ready");

    bot.user.setActivity(config['presence'], { type: config['presenceType'] })

    initLog(bot);
}