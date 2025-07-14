const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Botun ne zamandır çalıştığını gösterir'),
  async execute(interaction) {
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    await interaction.reply(`🕒 Uptime: ${hours} saat, ${minutes} dakika, ${seconds} saniye`);
  }
};
