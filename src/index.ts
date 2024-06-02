import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

bot.sendMessage(CHAT_ID, `📅 dia.pl/branch/5\nPosted ${new Date()}`);

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {

  } else {
    res.status(200).json('Listening to bot events...');
  }
};

