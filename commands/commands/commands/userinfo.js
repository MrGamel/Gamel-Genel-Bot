const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Kullanıcı bilgilerini gösterir')
    .addUserOption(opt =>
      opt.setName('user')
         .setDescription('Bilgileri gösterilecek kişi')
         .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}#${user.discriminator}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Kullanıcı ID', value: user.id, inline: true },
        { name: 'Bot mu?', value: user.bot ? 'Evet' : 'Hayır', inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
