const {
    Utils
} = require("erela.js");
const {
    RichEmbed
} = require("discord.js");

module.exports = {
    config: {
        name: "play",
        description: "Plays the specified youtube/soundcloud link",
        usage: "<link>",
        category: "music",
        accessibleby: "Members",
        aliases: ["p"]
    },
    run: async (bot, message, args) => {
        const {
            voiceChannel
        } = message.member;

        if (!voiceChannel)
            return message.channel.send("You must be in a voice channel.");

        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has("CONNECT"))
            return message.channel.send("I don't have permission to connect to your voice channel.");
        if (!permissions.has("SPEAK"))
            return message.channel.send("I don't have permission to connect to your voice channel");

        if (!args[0])
            return message.channel.send("Provide a link for your song/playlist.");

        const player = bot.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel
        });

        bot.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0])
                    message.channel.send(`Queued \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration,true)}\``);
                    if (!player.playing)
                        player.play()
                    break;

                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5)
                    const embed = new RichEmbed()
                        .setAuthor("Song selection:", message.author.displayAvatarURL)
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setFooter("Closes in 30 seconds. Type 'cancel' to cancel")
                    await message.channel.send(embed);

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5|cancel])$`, "i").test(m.content)

                    }, {
                        time: 30000,
                        max: 1
                    });

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content))
                            return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        message.channel.send(`Queued \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``);
                        if (!player.playing)
                            player.play()
                    });

                    collector.on("end", (_, reason) => {
                        if (["time", "cancelled"].includes(reason))
                            return message.channel.send("Selection cancelled")
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({
                        duration: acc.duration + cur.duration
                    })).duration, true)
                    message.channel.send(`Queued \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                    if (!player.playing)
                        player.play()
                    break;
            }
        }).catch(err => message.channel.send(err.message))
    }
}