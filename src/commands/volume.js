const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { nowPlayingEmbed } = require("../embeds/nowPlaying");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Sets the playback volume")
        .addIntegerOption((option) =>
            option.setName("volume")
                .setDescription("0-100")
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        let volume = interaction.options.getInteger('volume', true)
        if (volume > 100) {
            volume = 100
        }

        if (volume <= 33) {
            volumeIcon = "🔈"
        }

        else if (volume <= 66) {
            volumeIcon = "🔉"
        }

        else {
            volumeIcon = "🔊"
        }

        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            await interaction.editReply({ content: `Sorry, ${interaction.member} There are no tracks playing ❌`, ephemeral: true });
            return
        }
        queue.node.setVolume(volume); //Pass the value for the volume here
        await interaction.editReply(`Volume set to **${volume}%** ${volumeIcon}`);
        await interaction.followUp({ embeds: [nowPlayingEmbed(queue)] });

    }
}