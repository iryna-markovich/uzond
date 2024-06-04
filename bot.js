import TelegramBot from 'node-telegram-bot-api';
import { startCheckingDates, stopCheckingDates } from './utils/index.js';
import EventEmitter from 'events';

const TOKEN = process.env.TOKEN;
const eventEmitter = new EventEmitter();

let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

bot.onText(/\/start/, (msg) => {
  stopCheckingDates()
  bot.sendMessage(msg.chat.id, 'Bot helps to check the closest available date in Pomorskim Urzędzie Wojewódzkim w Gdańsku\nPick an option from menu for what purpose check dates or send a command\n/apply - Złożenie wniosku legalizującego pobyt\n/update - Uzupełnienie lub odbiór dokumentów');
});

bot.onText(/\/stop/, (msg) => {
  stopCheckingDates()
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
  bot.sendMessage(process.env.CHAT_ID, 'Send period from YYYY-MM-DD to YYYY-MM-DD you are interested\n e.g.: 2024-04-01 - 2024-12-01');

  bot.once('message', (msg) => {
    console.log('Message:', msg.text)
    if (msg.text === '/update' || msg.text === '/apply') return;

    const [from, rest, to] = msg.text.split(' ')

    if (from && to) {
      startCheckingDates(type, from, to)
    }
  });
})

export default bot;
