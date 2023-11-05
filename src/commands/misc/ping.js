module.exports = {
    name: 'ping',
    description: 'Pong!',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],
    //deleted: Boolean,

    callback: (client, interatction) => {
        interatction.reply(`Pong! ${client.ws.ping}ms`);
    },
};