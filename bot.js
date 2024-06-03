const formatDate = require('./util.js')

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

const suitableDateFrom = '2024-07-01'
const suitableDateTo = '2024-12-01'

let delay = 30_000;

async function getDates() {
  console.log('----> working')
  const response = await fetch("https://kolejkagdansk.ajhmedia.pl/admin/API/date/5/307/pl");
  const { DATES } = await response.json();
  return DATES
}

const TelegramBot = require('node-telegram-bot-api');
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
  bot.sendMessage(chatId, `📅 ${'closestDate'}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
});

module.exports = bot;
