type HourCalculatorProps = {
  y: number;
  cell: number;
};

const hourCalculator = ({ y, cell }: HourCalculatorProps): string => {
  "worklet";
  const d = y / cell;
  const [hours, minutes] = stringSplitByDecimal(d);

  return formatTime(hours, minutes);
};

const stringSplitByDecimal = (value: number): [string, string] => {
  const [intPart, decPart] = value.toString().split(".");
  return [intPart, decPart || "00"];
};

const formatTime = (hours: string, minutes: string): string => {
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

type PositionCalculatorProps = {
  hour: string;
  cell: number;
};

const positionCalculator = ({ hour, cell }: PositionCalculatorProps): number => {
  "worklet";
  const [H, M] = hour.split(":").map(Number);
  return H * cell + M * (cell / 60);
};

type SelectorTapPositionCalculatorProps = {
  tapValue: number;
  format: number;
  globSize: number;
  size?: number;
};

const selectorTapPositionCalculator = ({
  tapValue,
  format,
  globSize,
  size
}: SelectorTapPositionCalculatorProps): number => {
  "worklet";
  const val = size || globSize / format;
  const possiblePositionX: number[] = [];
  let min = 0;
  let max = 0;

  for (let i = 0; i <= format; i++) {
    const current = possiblePositionX[i - 1] + val || 0;

    if (current > tapValue) {
      max = current;
      min = possiblePositionX[i - 1];
      break;
    }
    possiblePositionX.push(current);
  }

  const diffmin = tapValue - val * 0.5 - min;
  const diffmax = max - (tapValue - val * 0.5);

  return diffmax < diffmin ? max : min;
};

const fixFloot = (value: number): number => {
  const flootPart = value.toString().split(".");
  const around = flootPart[1] ? (Number(`0.${flootPart[1]}`) >= 0.5 ? 1 : 0) : 0;

  return Number(flootPart[0]) + around;
};
