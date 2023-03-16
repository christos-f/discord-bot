const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips track in queue"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        const currentTrack = queue.currentTrack.title
        queue.node.skip()
        queue.node.setPaused(false)
        await interaction.editReply(`Track skipped **${currentTrack}** ⏭️`);
    }
}