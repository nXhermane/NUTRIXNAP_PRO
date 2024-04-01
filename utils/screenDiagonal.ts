import SIZES from "./../constants/Sizes";
const screenDiagonal = (height:number,width:number): number => {
    return Math.sqrt(height * height + width * width);
};
export default screenDiagonal