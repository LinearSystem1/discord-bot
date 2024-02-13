//yummy requires for the bot
require('dotenv').config();
const { Client, IntentsBitField, messageLink, EmbedBuilder, embedLength, ActivityType} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

// bot permissions
const client = new Client({
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ],
});

// bot status in discord
let status = [
    {
        name: 'lovely day - Bill Withers',
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=bEeaS6fuUoA"
    },
    {
        name: 'you... :]',
        type: ActivityType.Watching,
    }, 
    {
        name: 'to commands',
        type: ActivityType.Listening,
    },
];

//starting the bot yippee
(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Connected to DB.")

        eventHandler(client);

        client.login(process.env.TOKEN);        
    } catch (error) {
        console.log(`Error ${error}`)
    }
})();

client.on('ready', (c) => {

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000);
});

//logging
client.on('messageCreate', (message) => {
    console.log(message.author.username,":", message.content);
});

//using some non command commands
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hello') {
        message.channel.send('hi')

    }
    if (message.content === 'how to fix world hunger') {
        message.reply('take out the people in need of food\n just kidding :)')

    }

    if (message.content === 'funnylist') {
        var random = Math.floor(Math.random() * list.length);
        message.reply(list[random])
    }
    if (message.content === 'is dum gay?') {
        message.reply('yes')
    }
});

//using some commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

    
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`The sum is ${num1 + num2}`); 
    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("Embed title")
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields({
                name: 'Field title', 
                value: 'Some random value', 
                inline: true, 
            }, {
                name: '2nd Field title', 
                value: 'yippeee', 
                inline: true, 
            });

        interaction.reply({embeds: [embed] });
    }

});


//role buttons
client.on('interactionCreate', async (interaction) => {
    try {
        if (!interaction.isButton()) return;
                    await interaction.deferReply({ephemeral: true});
            
            const role = interaction.guild.roles.cache.get(interaction.customId);
            if (!role) {
                interaction.reply({
                    content: "I couldn't find that role",
                })
                return;
            }
    
            const hasRole = interaction.member.roles.cache.has(role.id);
    
            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.editReply(`The role ${role} has been removed.`);
                return;
            }
            await interaction.member.roles.add(role);
            await interaction.editReply(`The role ${role} has been added.`);
    } catch (error) {
        console.log(error)
    }

});




console.log("meow :3");
//HELPP HELP ME aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa