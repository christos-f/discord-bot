const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { createQueueEmbed } = require("../embeds/queue");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the queue, but does not stop current playback"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);

        const tracks = queue.tracks.toArray()

        tracks.forEach((track) => {
            queue.removeTrack(track)
        })

        await interaction.editReply({ embeds: [createQueueEmbed(queue)] });
        await interaction.followUp(`Queue cleared ❌`);
    }
}