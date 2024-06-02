import { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';
import { formatDate } from './utils';
import { suitableDateFrom, suitableDateTo } from './consts';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

// const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

let delay = 10_000;

async function getDates() {
  console.log('-----------------')
  const response = await fetch("https://kolejkagdansk.ajhmedia.pl/admin/API/date/5/307/pl");
  const { DATES } = await response.json();

  return DATES
}

// let timerId = setTimeout(async function request() {
//   console.log('--------TIMER---')

//   try {
//     const dates = await getDates();
//     console.log(dates, '-----dates---')

//     const closestDate = dates.find((date: string) => new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo))
//     console.log(closestDate, '-----closestDate---')

//     if (closestDate) bot.sendMessage(CHAT_ID, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);

//   } catch (error) {
//     console.log('--------TIMER---', (error as Error).toString())

//     delay *= 2;
//   }

//   timerId = setTimeout(request, delay);

// }, delay);
setInterval(() => { console.log('2222') }, 60_000)

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  // let timerId = setTimeout(async function request() {
  //   try {
  //     const dates = await getDates();

  //     const closestDate = dates.find((date: string) => new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo))

  //     if (closestDate) bot.sendMessage(CHAT_ID, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
  //     res.status(200).json('Listening to bot events...');
  //   } catch (error) {
  //     delay *= 2;
  //   }

  //   timerId = setTimeout(request, delay);

  // }, delay);
  setInterval(() => { console.log('3333') }, 60_000)
  res.status(200).json('Listening to bot events...');
  setInterval(() => { console.log('11111') }, 60_000)
};
