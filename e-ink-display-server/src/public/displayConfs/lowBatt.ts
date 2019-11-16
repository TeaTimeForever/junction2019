import { getImage } from "../img/load";

export async function render(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(await getImage("low_batt"), 0, 0);
}
