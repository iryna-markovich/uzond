import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TG_TOKEN;

export const bot = new TelegramBot(token, { polling: true });

export const chatId = process.env.CHAT_ID;
export const suitableDateFrom = '2024-07-01'
export const suitableDateTo = '2024-12-01'

let delay = 30_000;

export const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDateString = `${year}-${month}-${day}`;
  
    return formattedDateString;
  }

  
async function getDates() {
    console.log('----> working')
    const response = await fetch("https://kolejkagdansk.ajhmedia.pl/admin/API/date/5/307/pl");
    const { DATES } = await response.json();
    return DATES
}

let timerId = setTimeout(async function request() {
    try {
        const dates = await getDates();

        const closestDate = dates.find(date => new Date(formatDate(date)) >= new Date(suitableDateFrom) && new Date(formatDate(date)) <= new Date(suitableDateTo))

        if (closestDate) bot.sendMessage(chatId, `📅 ${closestDate}\nhttps://kolejkagdansk.ajhmedia.pl/branch/5\nPosted ${new Date()}`);
    } catch (error) {
        console.log(error, '<---- increase delay')
        delay *= 2;
    }

    timerId = setTimeout(request, delay);

}, delay);
