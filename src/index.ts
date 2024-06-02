import { Telegraf } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Update } from 'telegraf/typings/core/types/typegram';

// import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const VERCEL_URL = `${process.env.VERCEL_URL}`;

const bot = new Telegraf(TG_BOT_TOKEN);
// export const bot = new TelegramBot(token, { polling: true });

bot.command('about', about());
bot.on('message', greeting());


export default async function handle2(req: VercelRequest, res: VercelResponse) {
  try {
    await startVercel(req, res);
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(e.message);
  }
}



export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.');
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    await bot.telegram.deleteWebhook();
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  }

  if (req.method === 'POST') {
    await bot.handleUpdate(req.body as unknown as Update, res);
  } else {
    res.status(200).json('Listening to bot events...');
  }
};
