const { MessageEmbed } = require("discord.js");
const settings = require('../database/settings.json');
const fs = require('fs');
module.exports = {
    name: "check",
    description: "Check if you won the giveaway or not",
    cooldown: 5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [],
    run: async (client, interaction) => {
        const {guild, member} = interaction;

        let giveaway_file = JSON.parse(fs.readFileSync(`./database/winners.json`))
        
        if(giveaway_file.winners.hasOwnProperty(member.id)){
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🎉 Congratulations! Your Player ID [**${giveaway_file.winners[member.id]}**] has won the giveaway.\n Your rewards(1x Spike, 1x Needle and 1x Stake) will arrive in your hangar within 4-5 days!`)
                ],
                ephemeral: true
            })
        }else{
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`:x: Unfortunately you did not win the giveaway with this discord account`)
                ],
                ephemeral: true
            })
        }

        client.channels.cache.get('1102924704576180344').send({
            embeds: [
                new MessageEmbed()
                .setDescription(`Winner list checked by ${member} [${member.user.tag} | ${member.id}]`)
            ],
            ephemeral: true
        })
    }
}