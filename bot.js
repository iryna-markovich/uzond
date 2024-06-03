import TelegramBot from 'node-telegram-bot-api';
import { formatDate, getDates } from './utils/index.js';

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const suitableDateFrom = '2024-07-01'
const suitableDateTo = '2024-12-01'

let delay = 10_000;
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

let timerId = setTimeout(async function request() {
  try {
    const dates = await getDates();

    const closestDate = dates.find(date => {
      return new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo)
    })

    if (closestDate) bot.sendMessage(CHAT_ID, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
  } catch (error) {
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);

export default bot;