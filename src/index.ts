import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

bot.sendMessage(CHAT_ID, `📅 dia.pl/branch/5\nPosted ${new Date()}`);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
