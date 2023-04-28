const {
    Client,
    Collection
} = require("discord.js");
const {
    token,
    osu_key,
    mongoPath
} = require("./botconfig.json");
const bot = new Client();
const Levels = require("discord-xp");
const mongoose = require("mongoose");

Levels.setURL(mongoPath);

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on("message", async (message) => {
    if (!message.guild)
        return;
    if (message.author.bot)
        return;

    const randomXpAmount = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXpAmount);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, you leveled up to level **${user.level}**!`);
    }
})

bot.login(token);