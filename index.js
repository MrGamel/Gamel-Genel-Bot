require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next.use(Backend).init({
  lng: 'en',
  fallbackLng: 'en',
  backend: { loadPath: './locales/{{lng}}.json' }
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of fs.readdirSync('./commands')) {
  if (file.endsWith('.js')) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.data.name, cmd);
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  await cmd.execute(interaction, i18next);
});

client.login(process.env.DISCORD_TOKEN);