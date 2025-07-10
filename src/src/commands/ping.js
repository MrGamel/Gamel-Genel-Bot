const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const replies = {
  en: 'Bot latency is:',
  tr: 'Botun tepki süresi:',
  he: 'זמן התגובה של הבוט הוא:',
  es: 'La latencia del bot es:',
  fr: 'La latence du bot est de:',
  zh: '机器延迟是:',
  hi: 'बॉट की प्रतिक्रिया समय:',
  ar: 'زمن استجابة البوت هو:',
  ru: 'Задержка бота:',
  pt: 'A latência do bot é:',
  ur: 'بوٹ لیٹنسی ہے:',
  bn: 'বটের ল্যাটেন্সি:',
  ja: 'ボットの応答速度は',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun tepki süresini ölçer'),

  async execute(interaction) {
    const filePath = path.join(__dirname, '../../language.json');
    let userLang = 'en';

    if (fs.existsSync(filePath)) {
      const langData = JSON.parse(fs.readFileSync(filePath));
      userLang = langData[interaction.user.id] || 'en';
    }

    const sent = await interaction.reply({ content: '⏳', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const message = `${replies[userLang] || replies['en']} ${latency}ms`;

    await interaction.editReply(message);
  },
};