const createQueueEmbed = (queue) => {

    const tracks = queue.tracks.toArray().map(track => {
        return { title: track.title, url: track.url }
    })

    const allTracks = [{ title: queue.currentTrack.title, url: queue.currentTrack.url }, ...tracks]

    const fields = allTracks.map((track, index) => {
        if (track.title === queue.currentTrack.title) {
            return {
                name: `Now playing: 🎶 **${track.title}** 🎶 `, value: track.url
            }
        }

        return {
            name: `${index}. **${track.title}** 🎵 `, value: track.url
        }
    })

    return {
        color: 0x0099ff,
        author: {
            name: 'Current Queue',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
            url: 'https://discord.js.org',
        },
        fields: fields,

        timestamp: new Date().toISOString(),
    };
}

module.exports = { createQueueEmbed }