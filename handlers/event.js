const fs = require('fs');

module.exports = bot => {
    const events = fs.readdirSync('./events').filter( file => file.endsWith('.js'));

    events.forEach( file => {
        const event = require(`../events/${file}`);
        
        // add event listener
        bot.on(file.split(".")[0], event.bind(null, bot));
    });
}