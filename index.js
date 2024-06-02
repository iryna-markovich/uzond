import { bot, chatId } from './telegramInstance.js';
import { formatDate } from './utils/index.js'

const suitableDateFrom = '2024-07-01'
const suitableDateTo = '2024-09-01'

let delay = 30_000;

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
