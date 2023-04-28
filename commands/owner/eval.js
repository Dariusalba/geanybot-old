const { RichEmbed } = require ("discord.js");
const beautify = require ("beautify");

module.exports = {
    config: {
        name:"eval",
        category: "owner",
        accessibleby: "Owner",
        aliases: ["e"],
    },
    run: async(bot, message, args) => {
        if(message.author.id !== "225548050196725760")
        {
            return message.channel.send("Only the bot owner can use this command")
                .then(m => m.delete(15000));
        }

        if(!args[0])
        {
            message.channel.send("Type a command block")
                .then(m => m.delete(15000));
        }

        try
        {
            if(args.join(" ").toLowerCase().includes("token"))
            {
                return message.channel.send("I don't think so :).");
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            let embed = new RichEmbed()
                .setColor("#ce9797")
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), {format: "js"})}\n\`\`\``)
                .addField("Evaluated: ", evaluated)
                .addField("Type of: ", typeof(evaluated))

            message.channel.send(embed);
        } catch(e){
            let embed = new RichEmbed()
                .setColor("#ff0000")
                .setTitle("\:x: Error!")
                .setDescription(e)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)

            message.channel.send(embed);
        }
    }
}