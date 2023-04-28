const { Attachment } = require("discord.js");
const {
    prefix
} = require("../../botconfig.json");

module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.content == "furry" || message.content == "furries")
        message.channel.sendMessage("You fuck with the wrong furries and you'll have an army of the most toxic, bullying furries hunting you 24/7. Also, its just childish. Furries are a fandom of self expression, we raise money for charity, we help the economy, we spark change and reform for both animals and humans. And we're supported by 5 finger death punch. So grow the fuck up. Leave furries alone And go back to your sad, pathetic, worthless lives mastubating to anime characters that will never love or care for you.");

    if (message.content == "anime" || message.content == "weeb" || message.content == "w**b")
        message.channel.sendMessage("To be fair, if you get enterained and mentally stimulated by anime, you aren't a fully developed human being. That shit is overwhelmingly juvinile and full of plot holes, and boring predictable sequences, and literal filler. Why would you torture yourself so? Trust me when I say I want to like anime, because the concept of adult oriented animation appeals to me. But adult oriented anime is not. Its for people who who dont know about reality yet.")

    if (message.content == "jucam lol" || message.content == "jucam lol?" || message.content == "lol?" || message.content == "hai la lol")
        message.channel.sendMessage("Just don't. I could write a book on reasons why not to but I will write only this: If you play League a lot, take a 20 day break and see if things change for you. See yourself when you play this game, see the person you are and then look into yourself who has not played for 20 days. Compare the two and say, whether it's absolutely worth playing this game?")

    if (message.content == "redditor" || message.content == "rodditor")
        message.channel.send("You heard me. I'm a karma whore. I make fake posts and comments just for those sweet internet points, and you're an idiot for giving them to me. I'm not stopping. Not because of feelings of superiority, even though I am truly superior, but because I've decided to dedicate my thoughts, mind, body, and soul to gaining more upvotes in a day than you, a pitiful mortal, will gain in your life.  Imagine a schoolgirl getting bukkake in the middle of the college bathroom from 13 different guys. Thats me. Im that schoolgirl. Except that cum is those delicious orange arrows. Im not saying Im better than you. Im simply implying it, and if you have a problem with that, compare your karma to mine, and then well talk it out. I apologize for your inferiority, ok? Nobody wanted you to turn out this way, and Im sure that you feel even more disappointed in the sight of me. I have the audacity to admit that Im a slutty whore for karma, and Im still superior, you beta twig. Karma is my cocaine. Its my heroin. Its my intense, orgasmic dopamine hit that will forever separate me from the mortals that surround me.  I, and I completely, am a karma whore. But Id rather be a whore than a trashbag, like you. Peace out plebs :)");


    if (!message.content.startsWith(prefix))
        return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile)
        commandfile.run(bot, message, args)
}