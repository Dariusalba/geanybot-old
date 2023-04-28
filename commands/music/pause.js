module.exports = {
    config: {
        name: "pause",
        aliases: ["resume"],
        description: "Pause/resume the song that's already playing.",
        accessibleby: "Members",
        category: "music",
    },
    run: async(bot, message, args) => {
        const { voiceChannel } = message.member;
        const player = bot.music.players.get(message.guild.id);


        if(voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You need to be in a voice channel.");
        if(!player)
            return message.channel.send("No song is currently playing.");

        player.pause(player.playing);
        return message.channel.send(`Song is now ${player.playing ? "resumed" : "paused"}.`)
    }
}