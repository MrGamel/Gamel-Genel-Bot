// commands/help.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Lists all available commands');

export async function execute(interaction, i18next) {
  const list = Array.from(interaction.client.commands.values())
    .map(cmd => `\`/${cmd.data.name}\` – ${i18next.t(`desc_${cmd.data.name}`)}`)
    .join('\n');

  const header = i18next.t('help_header');
  await interaction.reply({ content: `${header}\n${list}`, ephemeral: true });
}