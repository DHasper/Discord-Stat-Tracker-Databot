
module.exports = async (bot, channel) => {

    if(channel.type != 'text' && channel.type != 'voice' && channel.type != 'category') return;

    console.log(`Channel ${channel.name} deleted in ${channel.guild.name}.`);
}