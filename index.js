import { bot, chatId } from './telegramInstance.js';
import { chatId, suitableDateFrom, suitableDateTo } from './const.js';
import { formatDate } from './utils/index.js'

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
