const createQueueEmbed = (queue) => {

    const tracks = queue.tracks.toArray().map(track => {
        return { title: track.title, url: track.url }
    })


    const fields = tracks.map((track, index) => {
        return {
            name: `${index + 1}. **${track.title}** 🎵 `, value: track.url
        }
    })

    return {
        color: 0x0099ff,
        author: {
            name: '\t\t\tCurrent Queue',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
            url: 'https://discord.js.org',
        },
        fields: fields,

        timestamp: new Date().toISOString(),
    };
}

module.exports = { createQueueEmbed }