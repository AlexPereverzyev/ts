import KoaRouter from 'koa-router';

export function healthchek(ctx: KoaRouter.RouterContext): void {
    ctx.body = { status: 'OK' };
}
