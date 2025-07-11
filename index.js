// index.js
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { getUserLang } from './utils/langStorage.js';

dotenv.config();

// i18next dil ayarları
await i18next
  .use(Backend)
  .init({
    lng: 'en', // Varsayılan başlangıç dili
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// Komutları yükle
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const { data, execute } = await import(`./commands/${file}`);
  client.commands.set(data.name, { data, execute });
}

client.once('ready', () => {
  console.log(`${client.user.tag} çalışıyor!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Kullanıcının dili
  const userLang = getUserLang(interaction.user.id) || 'en';
  await i18next.changeLanguage(userLang);

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, i18next);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: i18next.t('error'),
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);