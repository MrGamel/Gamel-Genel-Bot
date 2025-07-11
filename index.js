// index.js
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
dotenv.config();

// i18n ayarları
await i18next
  .use(Backend)
  .init({
    lng: 'tr', // default
    fallbackLng: 'en',
    backend: { loadPath: './locales/{{lng}}/translation.json' }
  });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Komutları yükle
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  const { data, execute } = await import(`./commands/${file}`);
  client.commands.set(data.name, { data, execute });
}

client.on('ready', () => {
  console.log(`${client.user.tag} sunucuya giriş yaptı.`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  // Kullanıcının seçtiği dil
  const lang = interaction.locale || 'en';
  await i18next.changeLanguage(lang);
  try {
    await cmd.execute(interaction, i18next);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: i18next.t('error'), ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);