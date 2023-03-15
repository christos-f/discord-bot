const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays audio from youtube")
        .addStringOption((option) =>
            option.setName("query")
                .setDescription("query to play")
                .setRequired(true)),
    async execute(interaction) {
        const player = useMasterPlayer(); // Get the player instance that we created earlier
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('Ysou are not connected to a voice channel!'); // make sure we have a voice channel
        const query = interaction.options.getString('query', true); // we need input/query to play

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        const searchResult = await player.search(query, { requestedBy: interaction.user });

        if (!searchResult.hasTracks()) {
            // If player didn't find any songs for this query
            await interaction.editReply(`We found no tracks for ${query}!`);
            return;
        } else {
            try {
                await player.play(channel, searchResult, {
                    nodeOptions: {
                        metadata: interaction// we can access this metadata object using queue.metadata later on
                    }
                });
                await interaction.editReply(`Loading your track`);
            } catch (e) {
                // let's return error if something failed
                return interaction.followUp(`Something went wrong: ${e}`);
            }
        }
    }
}