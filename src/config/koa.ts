import koa from 'koa';
import koaRouter from 'koa-router';
import ListingsController from "../controllers/ListingsController";

const app = new koa();
const router = new koaRouter();

router.get('/listings', ListingsController.get)

app.use(router.routes());

export { app };
