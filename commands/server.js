// commands/server.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Show server information');

export async function execute(interaction, i18next) {
  const guild = interaction.guild;
  const owner = await guild.fetchOwner();
  const info = [
    `${i18next.t('server_name')}: ${guild.name}`,
    `${i18next.t('server_id')}: ${guild.id}`,
    `${i18next.t('server_owner')}: ${owner.user.tag}`,
    `${i18next.t('server_member_count')}: ${guild.memberCount}`
  ];
  await interaction.reply({ content: info.join('\n') });
}