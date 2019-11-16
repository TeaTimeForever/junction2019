import { Color, height, width } from "./consts";

function colorDistance(a: Color, b: Color): number {
  const ar = (a & 0xff0000) >> 16;
  const ag = (a & 0x00ff00) >> 8;
  const ab = (a & 0x0000ff);

  const br = (b & 0xff0000) >> 16;
  const bg = (b & 0x00ff00) >> 8;
  const bb = (b & 0x0000ff);

  return Math.min(0x7f, (Math.sqrt((br - ar) ** 2 + (bg - ag) ** 2 + (bb - ab) ** 2) * 0.5) << 0);
}

const valueMap: { [k: number]: number } = {
  0x000000: 0,
  0xffffff: 1,
  0xe9b103: 3,
};

const possibleValues: Color[] = Object.keys(valueMap).map(Number);

function toColor(r: number, g: number, b: number): Color {
  return (r << 16) | (g << 8) | b;
}

function getClosestColor(i: Color): Color {
  return Math.min(...possibleValues.map((c) => c | (colorDistance(i, c) << 24)))
    & 0xffffff; // trim the distance to return just the color
}

export function normalizePixels(ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const color = getClosestColor(toColor(data[i], data[i + 1], data[i + 2]));
    data[i] = (color & 0xff0000) >> 16;
    data[i + 1] = (color & 0x00ff00) >> 8;
    data[i + 2] = color & 0x0000ff;
  }

  ctx.putImageData(imageData, 0, 0);
}

export function toInk(ctx: CanvasRenderingContext2D): ArrayBuffer {
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const uIntLength = data.length / 16; // Every element in the uintArray can hold values for 4 pixels (2 bits per px)
  const a = new Uint8Array(uIntLength);
  for (let i = 0; i < uIntLength; i++) {
    let val = 0;
    for (let j = 0; j < 4; j++) {
      const dataIdx = i * 16 + j * 4;
      val |= valueMap[toColor(data[dataIdx], data[dataIdx + 1], data[dataIdx + 2])] << (j * 2);
    }
    a[i] = val;
  }
  return a.buffer;
}
