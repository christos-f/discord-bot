// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require("../config.json");

// Create a new client instance
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
});

const { Player } = require('discord-player');

// this is the entrypoint for discord-player based application
const player = Player.singleton(client);


require('./loader');
require("./playerEvents")

// Log in to Discord with your client's token
client.login(token);