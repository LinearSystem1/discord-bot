module.exports = {
    deleted: false,
    name: 'ping',
    description: 'Replies with bot ping!',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],

    callback: async (client, interatction) => {
        await interatction.deferReply();

        const reply = await interatction.fetchReply();

        const ping = reply.createdTimestamp - interatction.createdTimestamp;

        interatction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    },
};
