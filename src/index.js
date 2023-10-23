const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.login("MTE2NTM1ODc4NzA4ODA5NzQ5MA.GSel28.B-txUQWykmDyp45Wv2yE2KLGn4NZPNZV38YBd4")



var hello = 0
console.log(hello);
console.log("meow");

//HELPP HELP ME