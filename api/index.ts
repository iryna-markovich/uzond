import { VercelRequest, VercelResponse } from '@vercel/node';
import { startVercel } from '../src';

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    setInterval(async () => await startVercel(req, res), 10_000)
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Server Error</h1><p>${e.toString()}</p>`);
    console.error(e.message);

  }
}
