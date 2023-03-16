const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes audio playback"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} There are no tracks paused ❌`, ephemeral: true });
            return
        }
        queue.node.setPaused(!queue.node.isPaused())
        await interaction.editReply(`Track resumed ▶️`);
    }
}