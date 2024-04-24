import { diagonal } from "./screenDiagonal";

interface Point {
  x: number;
  y: number;
}

export default function getCenterPoint(
  width: number,
  height: number
): Point {
  const A: Point = { x: 0, y: height };
  const B: Point = { x: width, y: 0 };

  const center: Point = {
    x: width / 2,
    y: height / 2,
  };

  return center;
}

// Additional helper function to calculate screen diagonal
export function diagonal(width: number, height: number): number {
  return Math.sqrt(width ** 2 + height ** 2);
}
