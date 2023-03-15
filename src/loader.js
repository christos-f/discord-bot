const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

const fs = require("node:fs")
const path = require("node:path")

client.commands = new Collection()
const CommandsArray = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log("Loading commands...\n")
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        CommandsArray.push(command.data.toJSON())
        console.log(`-> [Loaded command] - ${command.data.name} ✅`)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

console.log("\nLoading events...\n")
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`-> [Loaded event] - ${event.name} ✅`)
}

client.on('ready', (client) => {
    client.application.commands.set(CommandsArray)
})