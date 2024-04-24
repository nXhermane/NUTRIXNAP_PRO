export const hourCalculator = (y: number, cell: number): string => {
    "worklet";
    const d = y / cell;
    const strD = String(d);
    const strDArray = strD.split(".");

    const H = strDArray[0].length === 1 ? "0" + strDArray[0] : strDArray[0];

    let M = "00";
    if (!isNaN(Number(strDArray[1]))) {
        const intermediatFloat = Number("0." + strDArray[1]);
        const realVal = intermediatFloat * 60;
        M = String(Math.floor(realVal)).padStart(2, "0");
    }

    const formattedTime = H + ":" + M;
    return formattedTime;
};

export const positionCalculator = (hour: string, cell: number): number => {
    "worklet";
    const [H, M] = hour.split(":");
    const yH = parseInt(H, 10) * cell;
    const yM = (parseInt(M, 10) * cell) / 60;

    const y = yH + yM;

    return y;
};

export const selectorTapPositionCalculator = ({
    tapValue,
    format,
    globSize,
    size
}: {
    tapValue: number;
    format: number;
    globSize: number;
    size: number;
}): number => {
    "worklet";
    const possiblePositionX = [];
    let current = 0;
    const val = size || globSize / format;
    let max = 0;
    let min = 0;
    for (let i = 0; i <= format; i++) {
        current = possiblePositionX[i - 1] + val || 0;

        if (current > tapValue) {
            max = current;
            min = possiblePositionX[i - 1];
            break;
        }
        possiblePositionX.push(current);
    }
    let diffmin = tapValue - val * 0.5 - min;
    let diffmax = max - (tapValue - val * 0.5);
    let xPosition = 0;
    if (diffmax < diffmin) {
        xPosition = max;
    } else if (diffmax > diffmin) {
        xPosition = min;
    }
    return xPosition;
};


export const fixFloot = (value: number) => {
        let flootPart = value.toString().split(".");

        let around = 0;
        if (flootPart[1]) {
            const secontPart = Number("0." + flootPart[1]);
            if (secontPart >= 0.5) {
                around = 1;
            }
        }

        return Number(flootPart[0]) + around;
    }; 