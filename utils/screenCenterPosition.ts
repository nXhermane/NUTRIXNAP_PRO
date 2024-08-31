import diagonal from './screenDiagonal';

export default function (width: number, height: number): { x: number; y: number } {
   const A = { x: 0, y: height };
   const B = { x: width, y: 0 };

   const center = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

   return center;
}
