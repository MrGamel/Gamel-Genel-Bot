// commands/help.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Mevcut komutların listesini gösterir');

export async function execute(interaction, i18next) {
  const commands = [
    '`/ping` – ' + i18next.t('desc_ping'),
    '`/help` – ' + i18next.t('desc_help'),
    '`/language` – ' + i18next.t('desc_language')
  ];

  const reply = i18next.t('help_header') + '\n' + commands.join('\n');
  await interaction.reply({ content: reply, ephemeral: true });
}