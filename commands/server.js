const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Sunucu bilgilerini gösterir'),
  async execute(interaction) {
    await interaction.reply(
      `Sunucu: ${interaction.guild.name}\nÜye sayısı: ${interaction.guild.memberCount}`
    );
  }
};