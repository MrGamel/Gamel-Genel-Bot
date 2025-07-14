const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Kullanıcının avatarını gösterir')
    .addUserOption(opt =>
      opt.setName('user')
         .setDescription('Avatarı gösterilecek kişi')
         .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(user.displayAvatarURL({ dynamic: true }));
  }
};
