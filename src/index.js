require('dotenv').config();
const { Client, IntentsBitField, messageLink } = require('discord.js');
const list = ["-1 Level", "-3 Levels", "-5 Levels", "-10 Levels", "+1 Level", "+3 Levels", "+5 Levels", "+7 Levels", "Automatic HE Role", "Automatic TETH Role", "Automatic WAW Role", "Choosen Level Reset", "Go to #base-camp (damned for an hour get 3 levels for full sentence)", "Level Reset", "Librarian Role (Must have Colored Fixer, if not default to reroll)", "Double Trouble", "Reroll"];

const client = new Client({
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});


client.on('messageCreate', (message) => {
    console.log(message.author.username,":", message.content);
});


client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hello') {
        message.reply('hi')
    }
    if (message.content === 'funnylist') {
        var random = Math.floor(Math.random() * list.length);
        message.reply(list[random])
    }
    if (message.content === 'is dum gay?') {
        message.reply('yes')
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

});


client.login(process.env.TOKEN);
console.log("meow");
//HELPP HELP ME aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa