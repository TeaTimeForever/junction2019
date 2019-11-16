import { fontFn, yellow } from "../consts";
import { load } from "../fonts/fonts";

function card(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  width: number, height: number,
  invert = false,
) {
  const shadow = invert ? yellow : "white";
  const fill = invert ? "white" : yellow;

  // Start with the shadow
  ctx.lineJoin = "miter";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.fillStyle = shadow;
  ctx.fillRect(x + 10, y + 10, width, height);
  ctx.strokeRect(x + 10, y + 10, width, height);

  // Foreground
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
}

export async function textCard(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  width: number, height: number,
  content: Promise<string>,
) {
  card(ctx, x, y, width, height);

  const [ text ] = await Promise.all([ content, load ]);
  const margin = 7;
  const textWidth = width - margin * 2;
  const textHeight = height - margin * 1.5;
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const [ lines, fontSize ] = fitTextInBox(ctx, text, textWidth, textHeight, 14, fontFn);

  ctx.font = fontFn(fontSize);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x + margin, y + margin + fontSize * i);
  }
}

export async function cardWithHeader(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  width: number, height: number,
  title: string, content: Promise<string>,
  invert = false,
) {
  card(ctx, x, y, width, height, invert);
  const [ text ] = await Promise.all([ content, load ]);

  // Render heading
  ctx.font = fontFn(16);
  ctx.fillStyle = invert ? yellow : "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(title, x + width / 2, y + 12);

  // Render content
  ctx.font = fontFn(29);
  ctx.fillStyle = "black";
  ctx.fillText(text, x + width / 2, y + 33, width - 4);
}

export function fitTextInBox(
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number, height: number,
  fontSize: number, font: (size: number) => string,
  lineHeight = 1,
): [ string[], number ] {
  const words = text.split(" ");
  let lines: string[];

  do {
    ctx.font = font(fontSize);
    lines = flowWordsInLines(ctx, words, width);
    fontSize--;
  } while (lines.length * ((fontSize + 1) * lineHeight) > height);

  return [ lines, fontSize + 1 ];
}

function flowWordsInLines(ctx: CanvasRenderingContext2D, words: string[], width: number): string[] {
  const lines: string[] = [];
  let currentLine = words[0];

  for (const word of words.slice(1)) {
    const nLine = currentLine + " " + word;
    if (ctx.measureText(nLine).width <= width) {
      currentLine = nLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine);
  return lines;
}
