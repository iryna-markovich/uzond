import { Update } from 'telegraf/typings/core/types/typegram';
import TelegramBot from 'node-telegram-bot-api';

const development = async (bot: TelegramBot) => {
  // const botInfo = (await bot.telegram.getMe()).username;

  // await bot.telegram.deleteWebhook();

  // await bot.launch();

  // process.once('SIGINT', () => bot.stop('SIGINT'));
  // process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export { development };
