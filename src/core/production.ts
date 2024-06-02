import { VercelRequest, VercelResponse } from '@vercel/node';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import TelegramBot from 'node-telegram-bot-api';


const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: TelegramBot,
) => {
  if (req.method === 'POST') {

  } else {
    res.status(200).json('Listening to bot events...');
  }
};

export { production };
