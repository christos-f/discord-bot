const nowPlayingEmbed = (queue) => {
    const track = queue.currentTrack;

    const timestamp = queue.node.getTimestamp();

    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.node.createProgressBar();


    return {
        color: 0x0099ff,
        url: 'https://discord.js.org',
        author: {
            name: `Now Playing 🔊\n${track.title}`,
            icon_url: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
        },
        description: `Volume **${queue.node.volume}**%\nDuration **${trackDuration}**\nProgress ${progress}\nRequested by ${track.requestedBy}`,
        thumbnail: {
            url: track.thumbnail,
        },
        timestamp: new Date().toISOString(),
    }

}

module.exports = { nowPlayingEmbed }