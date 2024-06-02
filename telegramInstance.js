import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TG_TOKEN;

export const bot = new TelegramBot(token, { polling: true });
export const chatId = 503447389