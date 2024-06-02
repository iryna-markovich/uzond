import { VercelRequest, VercelResponse } from '@vercel/node';
import { startVercel } from '../src';

let delay = 10_000;

export default async function handle(req: VercelRequest, res: VercelResponse) {
  let timerId = setTimeout(async function request() {

    try {
      await startVercel(req, res);
    } catch (e: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>Server Error</h1><p>${e.toString()}</p>`);
      console.error(e.message);
      delay *= 2;
    }

    timerId = setTimeout(request, delay);

  }, delay);
}
