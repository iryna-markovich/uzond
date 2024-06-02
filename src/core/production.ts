import { VercelRequest, VercelResponse } from '@vercel/node';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import TelegramBot from 'node-telegram-bot-api';

// const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
// const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: TelegramBot,
) => {
  // if (!VERCEL_URL) {
  //   throw new Error('VERCEL_URL is not set.');
  // }

  if (req.method === 'POST') {

  } else {
    res.status(200).json('Listening to bot events...');
  }
};

export { production };
