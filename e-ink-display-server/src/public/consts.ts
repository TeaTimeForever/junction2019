import { Duration } from "luxon";

export const yellow = "#E9B103";
export const width = 640;
export const height = 384;

export type Color = number;

export function fontFn(s: number) { return `900 ${s}px 'Avenir'`; }

export function capitalize(s: string) { return s[0].toUpperCase() + s.slice(1); }

export function durationToISO({ hours, minutes }: IDuration = { hours: 0, minutes: 0 }): string {
  return `PT${hours}H${minutes}M`;
}

interface IDuration {
  hours: number;
  minutes: number;
}

export interface IFlightResponse {
  timeForever: IDuration;
  timeThisMonth: IDuration;
  timePerAircraft: { [key: string]: IDuration };
}

export function formatDuration(d: string): string {
  const seconds = Duration.fromISO(d).as("seconds");
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  return `${h ? `${h}h ` : ""}${m || !h ? `${m}m` : ""}`;
}

export type RenderFn = (ctx: CanvasRenderingContext2D) => Promise<number>;
