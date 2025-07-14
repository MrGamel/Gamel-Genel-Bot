const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error('DB bağlantı hatası:', err);
  else console.log('SQLite bağlandı:', dbPath);
});

db.run(`
  CREATE TABLE IF NOT EXISTS mod_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    action TEXT NOT NULL,
    reason TEXT,
    timestamp TEXT NOT NULL
  )
`);

module.exports = db;
