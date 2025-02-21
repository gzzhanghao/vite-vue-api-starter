import http from 'node:http';
import { type AddressInfo } from 'node:net';
import path from 'node:path';

import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaConnect from 'koa-connect';
import KoaLogger from 'koa-logger';
import { createServer } from 'vite';

async function run() {
  const app = new Koa();
  const router = new Router();

  const server = http.createServer(app.callback());

  app.use(KoaLogger());
  app.use(bodyParser());

  const vite = await createServer({
    root: path.resolve('packages/client'),
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: 'spa',
  });

  router.get('/api/hello', (ctx) => {
    ctx.body = 'Hello Vite';
  });

  app.use(router.routes()).use(router.allowedMethods());
  app.use(koaConnect(vite.middlewares));

  import.meta.hot?.accept(() => {
    server.close();
    console.log('Server closed due to hot reload');
  });
  server.listen(7382).on('listening', () => {
    const addr = server.address() as AddressInfo;
    console.log(`Server listening at http://127.0.0.1:${addr.port}/`);
  });
}

run();
