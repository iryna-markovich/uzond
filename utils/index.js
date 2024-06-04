import bot from '../bot.js';
import { ACTIONS, BASE_URL } from '../consts.js';

let delay = 10_000;
let timerId = null;
let controller = null;

export const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}

export const formatNowDateTime =()=>{
  const now = new Date();
  const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeString = now.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  const dateTimeString = `${dateString} ${timeString}`;

  return dateTimeString
}

export const findClosestDate = (dates, fromDate, toDate) => {
  const closestDate = dates.find(date => {
    const formattedDate = new Date(formatDate(date));
    return formattedDate >= new Date(fromDate) && formattedDate <= new Date(toDate);
  });

  return closestDate
}

export async function getDates(branch, id, signal) {
  const response = await fetch(`${BASE_URL}/admin/API/date/${branch}/${id}/pl`, { signal });
  const { DATES } = await response.json();

  return DATES
}

export const startCheckingDates = (type, fromDate, toDate) => {
  controller = new AbortController();
  const signal = controller.signal;

  const request = async () => {
    console.log('Request initiated');

    const { name, branch, id } = ACTIONS[type]

    try {
      const dates = await getDates(branch, id, signal);
      console.log('Dates received:', dates[0]);

      const closestDate = findClosestDate(dates, fromDate, toDate)
      const now = formatNowDateTime()

      if (closestDate) {
        bot.sendMessage(process.env.CHAT_ID, `📅 ${closestDate} ${name}\n${BASE_URL}/branch/${branch}\nPosted ${now}`);
      }
    } catch (error) {
      console.log(error.code, error.message)

      if (error.message !== 'This operation was aborted') {
        delay *= 2;
      }
    }
  };

  timerId = setInterval(request, delay)
  console.log('Next request scheduled with delay:', delay);
};

export const stopCheckingDates = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null

    console.log('Timer stopped');

    if (controller) {
      controller.abort();
      controller = null;

      console.log('Fetch request aborted');
    }
  }
};
