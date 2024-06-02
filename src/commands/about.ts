import { Context } from 'telegraf';
import { name, version } from '../../package.json';

const about = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n`;
  
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { about };
