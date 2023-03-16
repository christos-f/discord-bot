const { useMasterPlayer } = require("discord-player");
const { nowPlayingEmbed } = require("./embeds/nowPlaying");
const { createQueueEmbed } = require("./embeds/queue");
nowPlayingEmbed
const player = useMasterPlayer(); // Get the player instance that we created earlier

player.events.on('playerStart', (queue, track) => {
    // Emitted when the player starts to play a song
    console.log(`-> Started playing: **${track.title}**`);
    queue.metadata.channel.send({ content: `Now playing: 🎶 **${track.title}** 🎶\n Link: ${track.url} `, ephemeral: true });
    queue.metadata.channel.send({ embeds: [nowPlayingEmbed(queue)] });
});

player.events.on('audioTrackAdd', (queue, track) => {
    // Emitted when the player adds a single song to its queue
    console.log(`-> Track **${track.title}** queued`);
    // If there are already tracks in the queue, or a track is already playing
    // Update the channel to inform that a new track is added to the queue
    if (queue.isPlaying()) {
        queue.metadata.channel.send(`Track: **${track.title}** added to the queue ✅`);
        queue.metadata.channel.send({ embeds: [createQueueEmbed(queue)] });
        queue.metadata.channel.send({ embeds: [nowPlayingEmbed(queue)] });
    }
});

player.events.on('audioTracksAdd', (queue, track) => {
    // Emitted when the player adds multiple songs to its queue
    console.log(`-> Multiple Track's queued`);
    queue.metadata.channel.send(`Multiple Track's queued ✅`);
});

player.events.on('playerSkip', (queue, track) => {
    // Emitted when the audio player fails to load the stream for a song
    console.log(`-> Skipping **${track.title}** due to an issue!`);
    queue.metadata.channel.send(`Skipping **${track.title}** due to an issue! ❌`);
});

player.events.on('disconnect', (queue) => {
    // Emitted when the bot leaves the voice channel
    console.log('-> Bot has disconnected from the channel');
    queue.metadata.channel.send('Leaving now, bye! 👋');
});
player.events.on('emptyChannel', (queue) => {
    // Emitted when the voice channel has been empty for the set threshold
    // Bot will automatically leave the voice channel with this event
    console.log(`-> Leaving because no vc activity for the past 5 minutes`);
    queue.metadata.channel.send(`Leaving because no voice chat activity for the past 5 minutes, bye! 👋`);
});
player.events.on('emptyQueue', (queue) => {
    // Emitted when the player queue has finished
    console.log('-> Queue finished!');
    queue.metadata.channel.send('Queue finished! ✅');
});

// Uncomment these to view debug logs

// player.on('debug', async (message) => {
//     // Emitted when the player sends debug info
//     // Useful for seeing what dependencies, extractors, etc are loaded
//     console.log(`General player debug event: ${message}`);
// });

// player.events.on('debug', async (queue, message) => {
//     // Emitted when the player queue sends debug info
//     // Useful for seeing what state the current queue is at
//     console.log(`Player debug event: ${message}`);
// });

player.events.on('error', (queue, error) => {
    // Emitted when the player queue encounters error
    console.log(`-> General player error event: ${error.message}`);
});

player.events.on('playerError', (queue, error) => {
    // Emitted when the audio player errors while streaming audio track
    console.log(`-> Player error event: ${error.message}`);
});