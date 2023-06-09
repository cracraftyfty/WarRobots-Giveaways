//Import Modules
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const fs = require('fs');
const moment = require('moment-timezone');
module.exports = async (client, interaction) => {
    const {guild, member, customId} = interaction;
    let today = moment.tz('Australia/Sydney');
    if (interaction.type !== 'MODAL_SUBMIT') return;
    if([`giveaway`].includes(customId)){
        let ID = interaction.fields.getTextInputValue('id');
        ID = ID.toUpperCase()

        if(ID.split(' ').length > 1) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription(`:x: **${ID}** is not a valid **Player ID**, Please try again`)
            ],
            ephemeral: true
        })


        let giveawayFile = JSON.parse(fs.readFileSync(`./database/giveaway.json`))
        
        //Check if user already registered via player ID
        if(giveawayFile.entries.hasOwnProperty(member.id)) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription(`:x: You have already registered in the giveaway with **Player ID**: **${giveawayFile.entries[member.id]}**\n\nYou can update your Player ID by pressing the button below`)
            ], 
            components: [new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId(`update-${ID}`)
                        .setLabel(`Update ID | ${giveawayFile.entries[member.id].toUpperCase()} --> ${ID.toUpperCase()}`)
                        .setEmoji('📜')
                        .setStyle('PRIMARY')
                )
            ],
            ephemeral: true
        })

        let passthru = true
        for(let keys in giveawayFile.entries){
            if(giveawayFile.entries[keys].toUpperCase() === ID.toUpperCase()){
                passthru = false
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`:x: **Player ID**: **${giveawayFile.entries[keys]}** is already entered in the giveaway`)
                    ],
                    ephemeral: true
                })
            }
        }

        if(!passthru) return


        giveawayFile.entries[member.id] = ID
        giveawayFile.logs.push(`[${giveawayFile.logs.length+1}] [${today.format('DD-MM-YYYY | HH:mm:ss')} AEST] ${member.user.tag} | ${member.id} entered giveaway [ID: ${ID}]`)
        fs.writeFileSync(`./database/giveaway.json`, JSON.stringify(giveawayFile, null, 4))

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`✅ Successfully entered giveaway with Player ID: **${ID}**`)
            ],
            ephemeral: true
        })

        await client.channels.cache.get('1101882986498113596').send({
            embeds: [
                new MessageEmbed()
                .setColor('GREEN').setAuthor({
                    name: `${member.user.tag} | ${member.id}`,
                    iconURL: member.user.avatarURL()
                })
                .setDescription(`${member} Entered giveaway with Player ID: **[REDACTED]**`)
                .setTimestamp()
                .setFooter({
                    text: `Entry ID: ${giveawayFile.logs.length}`
                })
            ]
        })
    }
}