const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips current track"),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} There are no tracks to skip ❌`, ephemeral: true });
            return
        }
        const currentTrack = queue.currentTrack.title
        queue.node.skip()
        queue.node.setPaused(false)
        await interaction.editReply(`Track skipped **${currentTrack}** ⏭️`);
    }
}