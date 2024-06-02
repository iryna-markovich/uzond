import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Update } from 'telegraf/typings/core/types/typegram';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const VERCEL_URL = `${process.env.VERCEL_URL}`;

// const bot = new Telegraf(TG_BOT_TOKEN);
const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

// bot.command('about', about());
// bot.on('message', greeting());
const gre = (msg: any) => {
  const chatId = msg.chat.id;
  console.log(chatId, '------------')
  // send a message to the chat acknowledging receipt of their message
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
