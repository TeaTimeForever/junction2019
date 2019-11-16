const puppeteer = require("puppeteer");
const { secondsToNextUpdate } = require("./secondsToNextUpdate");

const browser = puppeteer.launch();

const callbacks = new Map();

exports.pngRender = async function(ctx) {
  const { params: { type, displayId } } = ctx;
  ctx.assert(["png", "eink"].includes(type), 404, "Invalid request");
  ctx.assert(["lowbatt", "upbeat"].includes(displayId), 404, "Such display setup does not exist");

  console.log(`${displayId} client connected`);

  ctx.type = `image/${ctx.params.type}`;

  const callbackId =
    (((Math.random() * 0xf00000) << 0)  + 0x100000).toString(16)
    + (Date.now() & 0xfffffff).toString(16);

  let rej;

  const p = new Promise((resolve, reject) => {
    rej = reject;
    // Add request timeout for cases when puppeteer doesn't respond within 30s
    setTimeout(() => {
      reject(new Error("Waiting for puppeteer resulted in a timeout"));
      if (!page.isClosed()) page.close();
      callbacks.delete(callbackId);
    }, 15000);

    callbacks.set(callbackId, (stream, length, sleep, challengeId) => {
      ctx.status = 200;
      ctx.response.length = length;
      ctx.body = stream;

      // Include a header with the time until the next request
      ctx.set("Sleep", parseInt(sleep) || secondsToNextUpdate());
      ctx.set("ChallengeId", challengeId);
      resolve();
    });
  });

  const page = await (await browser).newPage();

  page.on("console", (cons) => {
    if (cons.text() === "CLOSE") {
      page.close();
    } else if (cons.text() === "FAILURE") {
      page.close();
      rej("Page failed");
    }
    console.info(`Page console: ${callbackId}`, cons.type(), cons.text());
  });

  const url = `http://localhost:${process.env.PORT || 3000}/index.html?cb=${callbackId}&type=${type}&displayId=${displayId}`;
  console.info("GOTO: ", url);
  page.goto(url);

  await p;
};

exports.canvasCallback = async function(ctx) {
  ctx.assert(ctx.request.ip === "::1", 403, "This API is not intended for external use");

  const { callbackId } = ctx.params;
  const cb = callbacks.get(callbackId);
  ctx.assert(!!cb, 404, "Canvas callback not found");

  cb(ctx.req, ctx.request.length, ctx.request.headers["x-sleep"], ctx.request.headers["x-challengeid"]);

  ctx.status = 200;
  ctx.body = { ok: "Thanks" };
};
