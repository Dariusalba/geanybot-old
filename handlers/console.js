module.exports = (bot) => {
    let y = process.openStdin()
    y.addListener("data", res => {
        x = res.toString().trim().split(/ +/g);
        bot.channels.get("653505302578200596").send(x.join(" "));
    });
}