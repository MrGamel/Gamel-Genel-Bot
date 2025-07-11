// commands/avatar.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Kendi veya başka bir kullanıcının avatarını gösterir')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('Hedef kullanıcı')
      .setRequired(false)
  );

export async function execute(interaction, i18next) {
  const user = interaction.options.getUser('user') || interaction.user;
  await interaction.reply({
    content: `${user.username}:\n${user.displayAvatarURL({ dynamic: true })}`,
    ephemeral: false
  });
}