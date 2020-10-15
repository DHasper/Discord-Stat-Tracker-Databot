const http = require('./utils/http');
const config = require("./config.json")

function initLog(bot) {

    // clear user database
    http.get('/reset').then( res => {
        if(res.status != 200) return;

        // log all existing users
        bot.users.cache.forEach( user => {

            if(!user.bot){
                const payloadUser = {
                    id: user.id,
                    username: user.username,
                    active: true
                }
    
                http.post('/user', payloadUser).then( () => {},
                err => {
                    console.log("error on posting user");
                    console.log(err);
                });
            }
            
        });

        // log all existing guilds
        bot.guilds.cache.forEach( guild => {

            // log guild id and name
            const payloadGuild = {
                id: guild.id,
                name: guild.name,
                icon: guild.iconURL()
            }

            http.post('/guild', payloadGuild).then( () => {

                // log channels
                guild.channels.cache.forEach( channel => {

                    const payloadChannel = {
                        id: channel.id,
                        guild: guild.id,
                        name: channel.name,
                        type: channel.type
                    }

                    http.post('/guild/channel', payloadChannel).then( () => {},
                    err => {
                        console.log("Error on posting guild channel");
                        console.log(err);
                    });
                });

                // log users in guild and their nicknames
                guild.members.cache.forEach( member => {

                    if(!member.user.bot){

                        const payloadGuildUser = {
                            user: member.id,
                            guild: member.guild.id,
                            nickname: member.nickname == null
                                ? member.user.username
                                : member.nickname
                        }
        
                        http.post('/guild/user', payloadGuildUser).then( () => {},
                        err => {
                            console.log("error on posting guild user");
                            console.log(err);
                        });
                    }
    
                });

            },
            err => {
                console.log("error on posting guild");
                console.log(err);
            });

        });

    });

    startActivityLogging(bot);
}

async function startActivityLogging(bot) {

    let keepLogging = true;

    while(keepLogging){
        await new Promise( resolve => {

            setTimeout( () => {
                
                // log voice activty
                // TODO: log geen afk channelss

                bot.channels.cache.forEach( channel => {
                    if(channel.type == 'voice' && !config["blacklistedChannels"].includes(channel.id)){
                        channel.members.forEach( member => {

                            if(!member.user.bot){
                                const payload = {
                                    user: member.user.id,
                                    channel: channel.id,
                                    guild: member.guild.id,
                                    interval: config['activityLogInterval']
                                }
    
                                http.post('/activity/voice', payload).then( () => {},
                                err => {
                                    console.log("Error on posting voice activity");
                                    console.log(err);
                                });
                            }

                        });
                    }
                });

                // log presence activity

                bot.users.cache.forEach( user => {             
                    user.presence.activities.forEach( activity => {

                        if(activity.type != "CUSTOM_STATUS" && !user.bot){
                            const payload = {
                                user: user.id,
                                interval: config['activityLogInterval'],
                                type: activity.type,
                                name: activity.name,
                                details: activity.details 
                            }
    
                            http.post('/activity/presence', payload).then( () => {},
                            err => {
                                console.log("Error on posting presence");
                                console.log(err);
                            });
                        }
                    });

                });

                // console.log(usersPresence);

                resolve();
            }, config['activityLogInterval'] * 1000);

        }).catch( err => {
            console.log(err);
            keepLogging = false;
        });
    }
}

/**
 * Function to check if the web server is available
 */
function checkConnection() {

    return new Promise( (resolve, reject) => {
        http.get('').then( () => {
            resolve(true);
        }).catch( () => {
            reject(false);
        });
    }).catch( () => {
        console.log("Could not establish connection with the web server!");
    });  
}

module.exports = {
    initLog,
    checkConnection
}