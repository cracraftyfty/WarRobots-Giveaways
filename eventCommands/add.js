const { Modal, TextInputComponent, showModal } = require("discord-modals");
const discordModals = require('discord-modals');
module.exports = async (client, interaction) => {
    if(!interaction.isButton()) return
    const {guild, member, customId} = interaction;
    if(!['join'].includes(customId)) return;    

    let comps = [
        new TextInputComponent()
            .setCustomId("id")
            .setLabel("Player ID")
            .setStyle("SHORT")
            .setMinLength(3)
            .setMaxLength(10)
            .setPlaceholder("What is your Player ID?")
            .setRequired(true)
    ]

    discordModals(client);
    const modal = new Modal() 
    .setCustomId(`giveaway`)
    .setTitle("War Robots | Giveaways")
    .addComponents(comps);
    await showModal(modal, {
        client: client,
        interaction: interaction
    }).catch(e => {
        console.log(e.message ? e.message : e);
    })
}