// tslint:disable no-console
import { config } from 'dotenv';
config();
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const PORT = 3000;
const HOST = process.env.HOST || 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url as string, true);
      handle(req, res, parsedUrl);
    });
    server.on('error', (err: Error & { code: string }) => {
      if (err.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
          server.close();
          server.listen(PORT, HOST);
        }, 1000);
      }
      console.log('ERROR: %s', err.message);
    });
    server.listen(PORT, () => {
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
