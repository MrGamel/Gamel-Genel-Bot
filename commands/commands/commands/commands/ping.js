const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikme süresini gösterir'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Ping ölçülüyor...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`🏓 Pong! Gecikme: ${latency}ms`);
  }
};
