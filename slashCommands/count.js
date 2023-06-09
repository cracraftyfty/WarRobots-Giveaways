const ee = require(`../botconfig/embed.json`);
const unix = require("unix-timestamp");
const settings = require('../database/settings.json');
let emote = settings.emotes;
const Discord = require('discord.js');
module.exports = {
    name: "test",
    description: "Shows the number of time you have counted",
    cooldown: 5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: ["344915148487786498"],
    options: [],
    run: async (client, interaction) => {
        const {guild, member} = interaction;

        interaction.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('War Robots | Giveaway #3')
                .setURL('https://cdn.discordapp.com/attachments/695634651074527252/1101874325860126801/detail_picture_en-76d961c02a7fd8e9f2fc400e1fce408b.png')
                .setImage('https://cdn.discordapp.com/attachments/695634651074527252/1101874325860126801/detail_picture_en-76d961c02a7fd8e9f2fc400e1fce408b.png')
                .setDescription(`Welcome to the **SUPER SECRET GIVEAWAY** of War Robots\nThe weapons being given away are as follows:\n\n> **1x Needle**\n> **1x Spike**\n> **1x Stake**\n\nThere will be **20 winners**. All winners will get 1 of each weapon.\n\nSimply press the button below and fill out the form to enter the giveaway.\n\n**NOTE**: This giveaway is only for people with <@&858717403114504212> Role.\n\n**Giveaway Ends**: <t:${Math.round(unix.now()+259200)}:R> | <t:${Math.round(unix.now()+259200)}:F>`)
                .setThumbnail(guild.iconURL())
                .setURL(ee.footericon)
                .setColor('BLUE')
                .setTimestamp()
                .setFooter({text: ee.footertext, iconURL: ee.footericon})
            ], 
            components: [new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('join2')
                        .setLabel('Join Giveaway')
                        .setEmoji('🎉')
                        .setStyle('PRIMARY'),
                    new Discord.MessageButton()
                        .setLabel('Where to find Player ID')
                        .setURL("https://discord.com/channels/692379063716937790/1101868924649361459/1101894718088020078")
                        .setStyle('LINK'),
                )
            ]},
        )

        /* interaction.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Giveaway Ends <t:${Math.round(unix.now()+259200)}:R> | <t:${Math.round(unix.now()+259200)}:F>`)
            ]
        }) */
    }
}