const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const moment = require("moment-timezone");
const fs = require('fs');
module.exports = async (client, interaction) => {
    if(!interaction.isButton()) return
    const {guild, member, customId} = interaction;
    let today = moment.tz('Australia/Sydney');
    if(!customId.startsWith('update-')) return

    let ID = customId.split('-')[1]
    let giveawayFile = JSON.parse(fs.readFileSync(`./database/giveaway.json`))
    let oldID = giveawayFile.entries[member.id]
    giveawayFile.entries[member.id] = ID
    giveawayFile.logs.push(`[${giveawayFile.logs.length+1}] [${today.format('DD-MM-YYYY | HH:mm:ss')} AEST] ${member.user.tag} | ${member.id} updated their Player ID [ID: ${oldID} -> ${ID}]`)
    fs.writeFileSync(`./database/giveaway.json`, JSON.stringify(giveawayFile, null, 4))

    interaction.update({
        embeds: [
            new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`✅ Successfully Updated Player ID: **${ID}**`)
        ],
        components: [
            new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId(`updatefdswfsf`)
                    .setLabel(`Updated`)
                    .setEmoji('✅')
                    .setStyle('SECONDARY')
                    .setDisabled(true)
            )
        ],
        ephemeral: true
    })


    await client.channels.cache.get('1101882986498113596').send({
        embeds: [
            new MessageEmbed()
            .setColor('YELLOW')
            .setAuthor({
                name: `${member.user.tag} | ${member.id}`,
                iconURL: member.user.avatarURL()
            })
            .setDescription(`${member} Updated Player ID **[REDACTED]** --> **[REDACTED]**`)
            .setTimestamp()
            .setFooter({
                text: `Entry ID: ${giveawayFile.logs.length}`
            })
        ]
    })
   
}