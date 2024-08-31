import Sizes from './../constants/Sizes';
export default {
   size: {
      sb: Sizes.s2,
      st: Sizes.s3 + Sizes.s1 / 2,
      mb: Sizes.s3,
      mt: Sizes.s4,
      lb: Sizes.s4,
      lt: Sizes.s6,
   },
   ls: {
      s: Sizes.s1 / 2,
      m: Sizes.s1,
      l: Sizes.s1 * 1.5,
   },
};

export type TypographyType = {
   size: {
      sb: number;
      st: number;
      mb: number;
      mt: number;
      lb: number;
      lt: number;
   };
   ls: {
      s: number;
      m: number;
      l: number;
   };
};
