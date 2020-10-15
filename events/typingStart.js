
/**
 * When a user starts typing we keep track of how long the user has been typing
 * in the typingUsers map.
 * When the user stops typing remove the entry for typingUsers but only
 * after 60 seconds.
 * 
 * This doesn't work perfect because of the discord API limitations.
 * 
 * @param {*} bot 
 * @param {*} channel 
 * @param {*} user 
 */

module.exports = async (bot, channel, user) => {

    // only manage whitelisted guilds

    if(!bot.typingUsers.has(user.id) || bot.typingUsers.get(user.id)[1]) {
        bot.typingUsers.set(user.id, [0, false, true]);
    }

    // keep track of typing duration
    while(channel._typing.has(user.id) && bot.typingUsers.get(user.id) != null && !bot.typingUsers.get(user.id)[1]) {

        let typingFor = bot.typingUsers.get(user.id)[0];  

        await new Promise( resolve => {
            setTimeout( () => {
                typingFor += 0.1;

                if(bot.typingUsers.has(user.id) && !bot.typingUsers.get(user.id)[1]){
                    bot.typingUsers.get(user.id)[0] = typingFor;
                    bot.typingUsers.get(user.id)[2] = true;
                }
                
                resolve();
            }, 100);
        });

    }

    if(bot.typingUsers.has(user.id)){
        bot.typingUsers.get(user.id)[2] = false;

        // if the user sent the message we can reset the timer
        if(bot.typingUsers.get(user.id)[1]){
            bot.typingUsers.delete(user.id);
        }

        // otherwise reset the timer if the user doesn't start typing again in
        // 30 seconds
        else {
            let timeout = 30;
            let timeoutCount = 0;
            for(let i = 0; i < timeout; i++){
                await new Promise( resolve => {
                    setTimeout( () => {

                        if(bot.typingUsers.has(user.id) && !bot.typingUsers.get(user.id)[2]){
                            timeoutCount++;
                        }

                        resolve();

                    }, 1000);
                });
            }
        
            if(timeoutCount === timeout){
                bot.typingUsers.delete(user.id);
            }
        }
    }
}