// utils/langStorage.js
import fs from 'fs';

const LANG_FILE = './userLangs.json';

export function getUserLang(userId) {
  try {
    const data = fs.readFileSync(LANG_FILE, 'utf-8');
    const langs = JSON.parse(data);
    return langs[userId];
  } catch (error) {
    console.error('Dil verisi okunamadı:', error);
    return null;
  }
}

export function setUserLang(userId, lang) {
  try {
    let langs = {};
    if (fs.existsSync(LANG_FILE)) {
      const data = fs.readFileSync(LANG_FILE, 'utf-8');
      langs = JSON.parse(data);
    }
    langs[userId] = lang;
    fs.writeFileSync(LANG_FILE, JSON.stringify(langs, null, 2));
  } catch (error) {
    console.error('Dil verisi kaydedilemedi:', error);
  }
}