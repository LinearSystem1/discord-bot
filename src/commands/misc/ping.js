module.exports = {
    name: 'ping',
    description: 'Replies with bot ping!',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],
    //deleted: Boolean,

    callback: async (client, interatction) => {
        await interatction.deferReply();

        const reply = await interatction.fetchReply();

        const ping = reply.createdTimestamp - interatction.createdTimestamp;

        interatction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    },
};