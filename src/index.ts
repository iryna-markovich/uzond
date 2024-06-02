import { Telegraf } from 'telegraf';

// import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new Telegraf(TG_BOT_TOKEN);
const bot2 = new TelegramBot(TG_BOT_TOKEN, { polling: true });

// bot.command('about', about());
bot.on('message', greeting());
bot2.sendMessage(CHAT_ID, `📅 dia.pl/branch/5\nPosted ${new Date()}`);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
