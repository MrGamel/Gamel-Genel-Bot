// commands/avatar.js
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Show your or another user’s avatar')
  .addUserOption(opt =>
    opt.setName('user')
       .setDescription('Target user')
       .setRequired(false)
  );

export async function execute(interaction) {
  const user = interaction.options.getUser('user') || interaction.user;
  await interaction.reply({
    content: `${user.tag}'s avatar:\n${user.displayAvatarURL({ dynamic: true, size: 1024 })}`
  });
}