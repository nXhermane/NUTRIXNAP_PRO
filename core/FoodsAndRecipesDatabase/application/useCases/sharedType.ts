export type NutrientDto = {
   nutrientId: number;
   nutrientName: string;
   nutrientNameF: string;
   nutrientCode: string;
   nutrientUnit: string;
   tagname: string;
   nutrientDecimal: string;
   nutrientValue: number;
   originalValue: string;
};

export type QuantityDto = {
   unit: string;
   value: number;
};
