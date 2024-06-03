// require("dotenv").config();

// var bot = require('./bot');
// require('./web')(bot);

import 'dotenv/config.js';
import bot from './bot.js';
import initWeb from './web.js';

initWeb(bot);

export default bot;