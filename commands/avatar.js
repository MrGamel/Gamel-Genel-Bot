const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Avatarını gösterir'),
  async execute(interaction) {
    await interaction.reply(interaction.user.displayAvatarURL());
  }
};