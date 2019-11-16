const Koa = require("koa");
const mount = require("koa-mount");
const serve = require("koa-static");
const router = require("koa-router")();
const path = require("path");
const Bundler = require("parcel-bundler");

const { pngRender, canvasCallback } = require("./routes/canvasRendering");
const { proxy } = require('./routes/proxy');

const app = new Koa();

const bundler = new Bundler(path.resolve(__dirname, "public", "index.html"), { watch: true });

router.get("/render/:displayId/:type", pngRender);
router.post("/canvasCallback/:callbackId", canvasCallback);
router.get("/voltage/:v", voltage);
router.get("/imageProxy/:url", proxy);

async function voltage(ctx) {
  console.log("VOLTAGE", ctx.params.v);
  ctx.body = "OK";
}

app.use(router.routes());
app.use(serve(path.resolve(__dirname, "../dist")));

const port = process.env.PORT || 3000;
app.listen(port);

bundler.bundle().then(() => {
  console.log(`Server up at localhost:${port}`);
});
