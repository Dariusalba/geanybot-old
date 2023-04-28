const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const superagent = require("superagent")


module.exports = {
     config: {
          name: "ban",
          description: "Bans a user.",
          usage: "(user)",
          category: "owner",
          accessibleby: "Administrators",
          aliases: ["b"]
     },
     run: async (bot, message, args) => {

          if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
               return message.channel.send("You do not have permission to use this command!")

          let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
          if (!banMember)
               return message.channel.send("Please provide a user to ban!")

          let reason = args.slice(1).join(" ");
          if (!reason) reason = "No reason given!"

          if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
               return message.channel.send("I don't have permission to use this command")

          banMember.send(`You have been banned from ${message.guild.name} for: ${reason}`).then(() =>
               message.guild.ban(banMember, { days: 1, reason: reason })).catch(err => console.log(err))

          message.channel.send(`**${banMember.user.tag}** has been banned`)
     }

}