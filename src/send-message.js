require('dotenv').config();
const { Client, IntentsBitField, messageLink, EmbedBuilder, channelLink, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');


const client = new Client({
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


const roles = [
    {
        id: '1168330515590414517',
        label: 'goober'
    },
    {
        id: '1168330569092976751',
        label: 'yellow'
    },
]


client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1165359409111777280');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Claim or remove a role below.',
            components: [row],
        });
        process.exit();
    } catch (error) {
        console.log(error)
    }
});

client.login(process.env.TOKEN);