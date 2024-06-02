import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';
import { getDates } from './api';
import { formatDate } from './utils';
import { suitableDateFrom, suitableDateTo } from './const';

let delay = 30_000;
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';
const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

const gre = (msg: any) => {
  const chatId = msg.chat.id;
  console.log(chatId, '------------')
  bot.sendMessage(chatId, 'Received your message');
}
bot.on('message', gre);

export default async function handle(req?: VercelRequest, res?: VercelResponse) {
  let timerId = setTimeout(async function request() {
    try {
      console.log('hhhhhhhhh')
      const dates = await getDates(5, 307);

      const closestDate = dates.find((date: string) => new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo))

      if (closestDate) bot.sendMessage(CHAT_ID, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
    } catch (error) {
      console.log(error, '<---- increase delay')
      delay *= 2;
    }

    timerId = setTimeout(request, delay);

  }, delay);
}

// handle();