export default class LinearRegression {
    constructor(matrix: [[number]], size: number);

    updateMatrix(matrix: [[number]], size: number);

    calculate(min: number, max: number, incrementBy: number);

    getR2();
}