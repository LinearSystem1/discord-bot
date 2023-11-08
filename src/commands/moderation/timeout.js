const { Client, Interation, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports  = {
    deleted: false,
    /**
     * 
     * @param {Client} client 
     * @param {Interation} interatction 
     */

    callback: async (client, interatction) => {
        const mentionable = interatction.options.get('target-user').value;
        const duration = interatction.options.get('duration').value; // for example 1s 1m 1h 1d
        const reason = interatction.options.get('reason')?.value || "No reason provided";

        await interatction.deferReply();

        const targetUser = await interatction.guild.members.fetch(mentionable);
        if(!targetUser) {
            await interatction.editReply("That user does not exist in this server.");
            return;
        }

        if(targetUser.user.bot) {
            await interatction.editReply("Can't timeout a bot.");
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interatction.editReply("Invalid duration");
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interatction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days.");
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position; // highest role of target user
        const requestUerRolePosition = interatction.member.roles.highest.position; // highest role of requester
        const botRolePosition = interatction.guild.members.me.roles.highest.position; // highest role of bot

        if (targetUserRolePosition >= requestUerRolePosition) {
            await interatction.editReply("You cant timeout this user. They are in a higher or same role as you");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interatction.editReply("I cant timeout this user. They are in a higher or same role as me");
            return;
        }
        
        //timeout the user
        try {
            const { default: prettyMs } = await import('pretty-ms');
            if(targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interatction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, {verbose: true})}.\nReason: ${reason}`);
                return;
            }
            
            await targetUser.timeout(msDuration, reason);
            await interatction.editReply(`${targetUser} has been timed out for ${prettyMs(msDuration, {verbose: true})}.\nReason: ${reason}`);
        } catch (error) {
           console.log(`There was an error while timing out the user: ${error}`); 
        }
    },


    name: 'timeout',
    description: 'Timeout a user',
    options: [
        {
            name: 'target-user',
            description: 'The user to timeout',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'Timeout duration',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the timeout',
            type: ApplicationCommandOptionType.String,
        }
    ],
    
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

}