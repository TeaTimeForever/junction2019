import { yellow } from "../consts";
import { load } from "../fonts/fonts";
import { getImage } from "../img/load";
import { fitTextInBox } from "../widgets/cardWithShadow";

function alignImageInRect(img: HTMLImageElement, rectX: number, rectY: number, rectW: number, rectH: number) {
  const { width, height } = img;
  const rectRatio = rectW / rectH;
  const imgRatio = width / height;
  let dw: number;
  let dh: number;
  if (rectRatio < imgRatio) {
    dw = rectW;
    dh = dw / imgRatio;
  } else {
    dh = rectH;
    dw = dh * imgRatio;
  }

  return {
    dx: rectX + rectW - dw,
    dy: rectY,
    dw,
    dh,
  };
}

interface IFirebaseResponse {
  imgUrl: string;
  question: string;
  id: string;
}

async function getTextFromServer() {
  // TODO: Get the actual server endpoint
  const uid = 17;
  const serverUrl = `https://us-central1-junction2019-41c43.cloudfunctions.net/getChallenge?uid=${uid}`;
  const response: IFirebaseResponse = await fetch(`/imageProxy/${btoa(serverUrl)}`).then((res) => res.json());

  // return {
  //   image: "https://i.imgur.com/EogHf3I.png",
  //   task: "Try this: Buy a banana, and sell it in an auction (at an inflated price)",
  // };

  return {
    id: response.id,
    image: response.imgUrl,
    task: response.question,
  };
}

const fontFn = (s: number) => `900 ${s}px 'Avenir'`;

function renderBg(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = yellow;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 4;

  ctx.moveTo(-10, -10);
  ctx.lineTo(444, -20);
  ctx.lineTo(329, 421);
  ctx.lineTo(-10, 421);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
}

function renderMessage(ctx: CanvasRenderingContext2D, text: string) {
  const x = 28;
  const y = 26;
  const lineHeight = 1.2;
  const [ lines, fontSize ] = fitTextInBox(ctx, text, 331, 336, 52, fontFn, lineHeight);

  ctx.font = fontFn(fontSize);
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * fontSize * lineHeight);
  });
}

export async function render(ctx: CanvasRenderingContext2D) {
  renderBg(ctx);
  const [{ image, task, id }] = await Promise.all([getTextFromServer(), load]);

  renderMessage(ctx, task);
  const img = await getImage(image);
  const { dx, dy, dw, dh } = alignImageInRect(img, 435, 41, 193, 309);
  ctx.drawImage(img, dx, dy, dw, dh);

  return { challengeId: id };
}
