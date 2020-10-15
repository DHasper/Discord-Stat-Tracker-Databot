const config = require('../config.json');

class CommandHandler {
    handle(command, args, message) {
        if(!command){
            message.reply(`this is not a valid command! \n Use \`${config['prefix']} help\` to see the available commands.`);
        }
        console.log("command : " + command);
        console.log("args : " + args);
    }
}

module.exports = {
    CommandHandler
}