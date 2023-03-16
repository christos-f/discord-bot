const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the current track and clears the queue"),
    async execute(interaction) {
        await interaction.deferReply()
        const queue = useQueue(interaction.guild.id)
        if (!queue) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} There are no tracks to stop ❌`, ephemeral: true });
            return
        }
        queue.tracks.clear()
        queue.node.skip()
        await interaction.editReply({ content: `Hey, ${interaction.member} I cleared the queue for you! ❌🫗`, ephemeral: true });
    }
}