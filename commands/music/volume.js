module.exports = {
    config: {
        name: "volume",
        aliases: ["vol"],
        description: "Adjusts the volume of the currently playing song",
        accessibleby: "Members",
        category: "music",
        usage: "(vol)",
    },
    run: async(bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);

        if(!player)
            return message.channel.send("No song is currently playing");
        if(!args[0])
            return message.channel.send(`Current volume: ${player.volume}`);
        if(Number(args[0]) <= 0 || Number(args[0]) > 100)
            return message.channel.send("You can only set the volume to a number of 1 to 100.");
            
        player.setVolume(Number(args[0]));
        return message.channel.send(`Volume set to: ${args}`)
    }
}