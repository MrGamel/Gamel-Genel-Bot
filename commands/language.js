// commands/language.js
import { SlashCommandBuilder } from 'discord.js';
import { setUserLang } from '../utils/langStorage.js';
import { languages } from '../utils/languages.js';

export const data = new SlashCommandBuilder()
  .setName('language')
  .setDescription('Change your language')
  .addStringOption(opt => {
    opt.setName('lang')
       .setDescription('Select a language')
       .setRequired(true);
    for (const lang of languages) {
      opt.addChoices({ name: lang.name, value: lang.value });
    }
    return opt;
  });

export async function execute(interaction, i18next) {
  const chosen = interaction.options.getString('lang');
  setUserLang(interaction.user.id, chosen);
  await i18next.changeLanguage(chosen);
  await interaction.reply({ content: i18next.t('lang_changed'), ephemeral: true });
}