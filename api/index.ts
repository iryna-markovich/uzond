import { VercelRequest, VercelResponse } from '@vercel/node';
// import { startVercel } from '../src';
import TelegramBot from 'node-telegram-bot-api';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

async function getDates() {
  const response = await fetch("https://kolejkagdansk.ajhmedia.pl/admin/API/date/5/307/pl");
  const { DATES } = await response.json();

  return DATES
}

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    
      bot.sendMessage(CHAT_ID, `📅 \nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`)
    
    
    
    // await startVercel(req, res)
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Server Error</h1><p>${e.toString()}</p>`);
    console.error(e.message);

  }
}
