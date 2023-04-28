module.exports = {
    config: {
        name: "skip",
        aliases: ["s"],
        description: "Skips the playing song",
        accessibleby: "Members",
        category: "music",
    },
    run: async(bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);

        if(!player)
            return message.channel.send("No songs are playing");
        
        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You have to be in a voice channel");

        player.stop();
        return message.channel.send("Skipped the current song.");
    }
}