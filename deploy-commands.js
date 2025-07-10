// deploy-commands.js
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Komut verilerini topla
const commands = [];
const commandsPath = path.join(__dirname, 'src/commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data && typeof command.data.toJSON === 'function') {
      commands.push(command.data.toJSON());
    }
  }
}

// REST istemcisini oluştur
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Komutları yükle
(async () => {
  try {
    console.log(`🔄 Komutlar güncelleniyor: ${commands.length} adet`);

    if (process.env.GUILD_ID) {
      // Belirli bir sunucuya yükle (daha hızlı yansır)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log('✅ Sunucu komutları başarıyla güncellendi.');
    } else {
      // Global komutlar (yansıması biraz zaman alır)
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log('✅ Global komutlar başarıyla güncellendi.');
    }
  } catch (error) {
    console.error('❌ Komut güncelleme hatası:', error);
  }
})();