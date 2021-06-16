import LinearRegression from './index';

describe("Integration Test", () => {
    it("Validate that the calculaion works successfully.", () => {
        const linearRegression = new LinearRegression([[1, 2, 3, 4, 5], [3, 4, 2, 4, 5]]);
        const regression = linearRegression.calculate(1, 5, 1);
        const r2 = linearRegression.getR2();

        expect(regression).toStrictEqual([[1, 2, 3, 4, 5], [2.8, 3.2, 3.6, 4.0, 4.4]]);
        expect(r2).toStrictEqual(0.3076923076923078);
    });
});