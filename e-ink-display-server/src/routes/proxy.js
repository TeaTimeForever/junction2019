const httpGet = require('http').get
const httpsGet = require('https').get

exports.proxy = async function(ctx) {
  const url = Buffer.from(ctx.params.url, 'base64').toString();
  console.log("url", url);
  const get = /^https/.test(url) ? httpsGet : httpGet;

  const resp = await new Promise((resolve, rej) => {
    get(url, (res) => {
      resolve(res);
    }).on('error', rej);
  });
  ctx.status = resp.statusCode;
  ctx.set(resp.headers);
  ctx.body = resp;
}