const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const langs = {
  en: 'English',
  tr: 'Türkçe',
  he: 'עברית',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  ru: 'Русский',
  pt: 'Português',
  ur: 'اُردُو',
  bn: 'বাংলা',
  ja: '日本語',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Bot yanıt dilini seç')
    .addStringOption(option =>
      option
        .setName('select')
        .setDescription('Bir dil seçin')
        .setRequired(true)
        .addChoices(
          ...Object.entries(langs).map(([code, name]) => ({
            name: name,
            value: code,
          }))
        )
    ),

  async execute(interaction) {
    const selected = interaction.options.getString('select');
    const filePath = path.join(__dirname, '../../language.json');

    let data = {};
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath));
    }

    data[interaction.user.id] = selected;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    await interaction.reply(`✅ Dil tercihiniz **${langs[selected]}** olarak ayarlandı.`);
  },
};