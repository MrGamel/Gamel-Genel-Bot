// utils/langStorage.js
import fs from 'fs';
const FILE = './userLangs.json';

export function getUserLang(id) {
  if (!fs.existsSync(FILE)) return null;
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  return data[id];
}

export function setUserLang(id, lang) {
  let data = {};
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  }
  data[id] = lang;
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}