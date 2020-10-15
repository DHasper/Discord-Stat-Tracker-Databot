const config = require("../config.json");
const http = require("../utils/http");

module.exports = async (bot, oldGuild, newGuild) => {

    if(!oldGuild && newGuild) return;
    
    // update guild name on webserver
    if(oldGuild.name != newGuild.name){

        const payload = {
            id: oldGuild.id,
            name: newGuild.name
        }

        await http.patch("/guild", payload).then( () => {
            console.log(`Guild ${oldGuild.name} changed its name to ${newGuild.name}.`);
        },
        err => {
            console.log("Error on updating guildname");
            console.log(err);
        });
       
    }

    // update guild icon on webserver
    if(oldGuild.iconURL() != newGuild.iconURL()){

        const payload = {
            id: oldGuild.id,
            icon: newGuild.iconURL()
        }

        await http.patch("/guild", payload).then( () => {
            console.log(`Guild ${oldGuild.name} changed its icon.`);
        },
        err => {
            console.log("Error on updating guild icon");
            console.log(err);
        });

    }
}