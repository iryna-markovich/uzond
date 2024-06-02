import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

const gre = (msg: any) => {
  const chatId = msg.chat.id;
  console.log(chatId, '------------')
  bot.sendMessage(chatId, 'Received your message');
}
bot.on('message', gre);

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {

  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(e.message);
  }
}
