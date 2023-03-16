const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");
const { useQueue } = require("discord-player");
const { createQueueEmbed } = require("../embeds/queue");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows the current queue"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        await interaction.editReply({ embeds: [createQueueEmbed(queue)] });
    }
}