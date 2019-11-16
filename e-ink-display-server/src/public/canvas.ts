import { parse } from "querystring";
import { height, width } from "./consts";
import { normalizePixels, toInk } from "./normalize";

const canvas = document.getElementById("c") as HTMLCanvasElement;

const context = canvas.getContext("2d") as CanvasRenderingContext2D;

context.fillStyle = "#FFFFFF";
context.fillRect(0, 0, width, height);

paintCanvas(context, canvas);

async function paintCanvas(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) {
  try {
    const { cb, type, displayId } = parse(location.search.slice(1));

    let sleepSeconds: number = 0;
    let challengeId = "";

    if (displayId === "lowbatt") {
      await (await import("./displayConfs/lowBatt")).render(ctx);
    } else if (displayId === "upbeat") {
      challengeId = (await (await import("./displayConfs/upbeat")).render(ctx)).challengeId;
    }

    // Normalize the pixel values on canvas;
    normalizePixels(ctx);

    // Send the image to server
    const headers = {
      "X-ChallengeId": challengeId,
      "X-Sleep": sleepSeconds.toString(),
    };
    await fetch(`/canvasCallback/${cb}`, {
      body: type === "png" ? await toPng(c) : toInk(ctx),
      headers,
      method: "POST",
    });

    console.log("CLOSE"); // tslint:disable-line:no-console
  } catch (err) {
    // Notify the process of a failed page so that it stops waiting for response
    console.log("FAILURE", err); // tslint:disable-line:no-console
  }
}

const toPng = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => {
  c.toBlob((blob) => {
    if (blob) {
      res(blob);
    } else {
      rej(new Error("Could not convert canvas to Blob"));
    }
  });
});
