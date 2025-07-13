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

// Komut dosyalarını yükle
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath)) {
  if (file.endsWith('.js')) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  await cmd.execute(interaction, i18next);
});

client.login(process.env.DISCORD_TOKEN);