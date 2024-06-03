import TelegramBot from 'node-telegram-bot-api';
import { formatDate, getDates } from './utils/index.js';
import EventEmitter from 'events';

const TOKEN = process.env.TOKEN;
const eventEmitter = new EventEmitter();

let delay = 10_000;
let timerId;
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bot helps to check the closest available date in Pomorskim Urzędzie Wojewódzkim w Gdańsku\nPick an option from menu for what purpose check dates or send a command\n/apply - Złożenie wniosku legalizującego pobyt\n/update - Uzupełnienie lub odbiór dokumentów');
});

bot.onText(/\/apply/, (msg) => {
  stopCheckingDates()
  eventEmitter.emit('command', msg.text);
});

bot.onText(/\/update/, (msg) => {
  stopCheckingDates()
  eventEmitter.emit('command', msg.text);
});

eventEmitter.on('command', (type) => {
  console.log('Type:', type)
  bot.sendMessage(process.env.CHAT_ID, 'Send period from YYYY-MM-DD to YYYY-MM-DD you are interested\n e.g.: 2024-04-01 - 2024-12-01');

  bot.once('message', (msg) => {
    console.log('Message:', msg.text)
    if (msg.text === '/update' || msg.text === '/apply') return;

    const [from, rest, to] = msg.text.split(' ')

    if (from && to) {
      if (type === '/apply') checkDates(8, 202, from, to) // 5, 304
      if (type === '/update') checkDates(8, 199, from, to) // 5, 307
    }
  });
})

let timerIds = [];

export const checkDates = (branch, type, fromDate, toDate) => {
  timerId = setTimeout(async function request() {
    console.log('Request initiated');
    const tt = type === 202 ? 'apply' : 'update'

    try {
      const dates = await getDates(branch, type);
      console.log('Dates received:', dates);

      const closestDate = dates.find(date => {
        const formattedDate = new Date(formatDate(date));
        return formattedDate >= new Date(fromDate) && formattedDate <= new Date(toDate);
      });

      if (closestDate) {
        console.log('Closest date found:', closestDate);
        bot.sendMessage(process.env.CHAT_ID, `📅 ${closestDate} ${tt}\nhttps://kolejkagdansk.ajhmedia.pl/branch/${branch}\nPosted ${new Date()}`);
      }

    } catch (error) {
      // console.error('Error occurred:', error);
      delay *= 2;
    }

    timerId = setTimeout(request, delay);
    // console.log('Next request scheduled with delay:', delay);
  }, delay);
};

export const stopCheckingDates = () => {
  if (timerId) {
    clearTimeout(timerId);
    console.log('Timer stopped----------');
  }
};

export default bot;