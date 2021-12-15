import { Server } from 'http';

import Koa from 'koa';
import KoaRouter from 'koa-router';
import serve from 'koa-static';
import send from 'koa-send';
import { absolutePath } from 'swagger-ui-dist';

import * as api from './api';

export default class App {
    private app: Koa | undefined;
    private server: Server | undefined;

    async start(port = 8080): Promise<void> {
        const router = new KoaRouter();

        // API
        router.get('/health', api.healthchek);

        // Swagger UI
        router.get('/swagger.json', (ctx: KoaRouter.RouterContext) =>
            send(ctx, './build/src/swagger.json')
        );
        router.get('/', async (ctx: KoaRouter.RouterContext, next: () => Promise<void>) => {
            if (!ctx.query.url) {
                ctx.redirect('?url=swagger.json');
            } else {
                await next();
            }
        });

        // start server
        this.app = new Koa();
        this.app.use(router.routes());
        this.app.use(serve(absolutePath()));
        this.server = this.app.listen(port);

        console.info(`REST server started at port ${port}`);
    }

    stop(): void {
        if (!this.server) {
            return;
        }
        this.server.close();

        console.info(`\nREST server stopping`);
    }
}
