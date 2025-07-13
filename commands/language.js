const { SlashCommandBuilder } = require('discord.js');
const langs = {
  en: 'English',
  tr: 'Türkçe',
  // Diğer dilleri ekle...
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Bot yanıt dilini seç')
    .addStringOption(option =>
      option
        .setName('select')
        .setDescription('Dil seç')
        .setRequired(true)
        .addChoices(
          ...Object.entries(langs).map(([code, name]) => ({
            name,
            value: code
          }))
        )
    ),
  async execute(interaction, i18next) {
    const lang = interaction.options.getString('select');
    // DB'ye kaydetme kodunu ekleyebilirsin
    await interaction.reply(`Diliniz ${langs[lang]} olarak ayarlandı.`);
  }
};