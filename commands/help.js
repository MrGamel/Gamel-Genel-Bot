const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Mevcut komutları listeler'),
  async execute(interaction) {
    const commands = interaction.client.commands.map(cmd => cmd.data.name).join(', ');
    const embed = new EmbedBuilder()
      .setTitle('Komut Listesi')
      .setDescription(commands);
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};