const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");
const { useQueue } = require("discord-player");
const { createQueueEmbed } = require("../embeds/queue");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displayes the current queue"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} The Queue is currently empty 🫗❌`, ephemeral: true });
            return
        }
        if (queue.isEmpty()) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} The Queue is currently empty 🫗❌`, ephemeral: true });
            return
        }
        await interaction.editReply({ embeds: [createQueueEmbed(queue)] });
    }
}