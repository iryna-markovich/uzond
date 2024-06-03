import TelegramBot from 'node-telegram-bot-api';
import { formatDate } from './utils/index.js';

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

const suitableDateFrom = '2024-07-01'
const suitableDateTo = '2024-12-01'

let delay = 10_000;

async function getDates() {
  console.log('----> working')
  const response = await fetch("https://kolejkagdansk.ajhmedia.pl/admin/API/date/5/307/pl");
  const { DATES } = await response.json();
  return DATES
}

let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');


let timerId = setTimeout(async function request() {
  try {
    const dates = await getDates();

    const closestDate = dates.find(date => new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo))

    if (closestDate) bot.sendMessage(chatId, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
  } catch (error) {
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);

export default bot;