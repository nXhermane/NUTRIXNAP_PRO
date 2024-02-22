import SIZES from "./../constants/Sizes";
const screenDiagonal = (): number => {
    return Math.sqrt(SIZES.height * SIZES.height + SIZES.width * SIZES.width);
};
export default screenDiagonal