// @ts-ignore
import floydSteinberg from "floyd-steinberg";
// @ts-ignore
import images from "./*.png";

function imageUrl(image: string) {
  return /^https?\:\/\//.test(image) ?
    `/imageProxy/${btoa(image)}` :
    images[image];
}

export function getImage(image: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { resolve(img); };
    img.onerror = (err) => { reject(err); };
    img.src = imageUrl(image);
  });
}

export function ditherImage(img: HTMLImageElement, width: number, height: number): ImageData {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0);
  return floydSteinberg(ctx.getImageData(0, 0, width, height));
}
