// commands/language.js
import { SlashCommandBuilder } from 'discord.js';
import { setUserLang } from '../utils/langStorage.js';

export const data = new SlashCommandBuilder()
  .setName('language')
  .setDescription('Kendi dil ayarını değiştir')
  .addStringOption(option =>
    option
      .setName('lang')
      .setDescription('Yeni dil seç')
      .setRequired(true)
      .addChoices(
        { name: 'Türkçe', value: 'tr' },
        { name: 'English', value: 'en' }
      )
  );

export async function execute(interaction, i18next) {
  const selectedLang = interaction.options.getString('lang');
  setUserLang(interaction.user.id, selectedLang);
  await i18next.changeLanguage(selectedLang);

  await interaction.reply({
    content: i18next.t('lang_changed'),
    ephemeral: true
  });
}