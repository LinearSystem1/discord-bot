const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    deleted: false,
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interatction
     */

    callback: async (client, interatction) => {
        const targetUserId = interatction.options.get('target-user').value;
        const reason = interatction.options.get('reason')?.value || "No reason provided";
        
        await interatction.deferReply();

        const targetUser = await interatction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interatction.editReply("That user does not exist in this server.");
            return;
        }

        if (targetUser.id === interatction.guild.ownerId) {
            await interatction.editReply("Can't kick server owner");
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position; // highest role of target user
        const requestUerRolePosition = interatction.member.roles.highest.position; // highest role of requester
        const botRolePosition = interatction.guild.members.me.roles.highest.position; // highest role of bot

        if (targetUserRolePosition >= requestUerRolePosition) {
            await interatction.editReply("You cant kick this user. They are in a higher or same role as you");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interatction.editReply("I cant kick this user. They are in a higher or same role as me");
            return;
        }

        //Kick the target user
        try {
            await targetUser.kick(reason);
            await interatction.editReply(`kicked ${targetUser} for ${reason}`);
        } catch (error) {
            console.log(`There was an error when kicking: ${error}`);
        }
    },

    name: 'kick',
    description: 'Kick a member from the server.',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to kick.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for kicking.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissios: [PermissionFlagsBits.KickMembers],
};