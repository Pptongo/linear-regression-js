const LinearRegression = require('./index')
const assert = require('assert').strict;

describe("Integration Test", function() {
    it("Validate that the calculaion works successfully.", function() {
        const linearRegression = LinearRegression.linearRegression([[1, 2, 3, 4, 5], [3, 4, 2, 4, 5]]);
        const firstSeries = linearRegression.calculate(0, 5, 1);

        linearRegression.updateMatrix([[1, 4, 3], [-1, -2, 4]], 3);
        const secondSeries = linearRegression.calculate(0, 5, 1);

        assert.deepStrictEqual(firstSeries, [[0, 1, 2, 3, 4, 5], [2.4, 2.8, 3.2, 3.6, 4.0, 4.4]]);
        assert.deepStrictEqual(secondSeries, [[0, 1, 2, 3, 4, 5], [0.14285714285714304, 0.2142857142857144, 0.28571428571428575, 0.3571428571428571, 0.4285714285714285, 0.4999999999999998]]);
    });
});