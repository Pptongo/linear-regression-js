/**
 * @class
 * @name LinearRegression
 * @description Class used to calculate a linear regression for a gived matrix.
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since v1.0
 * @license ISC
 */
class LinearRegression {

    /**
     * @constructor
     * @description Received a bidimensional array that contains the matrix for X values and Y Values.
     * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
     * @param {Array} matrix The given matrix to calculate the linear regression.
     * @param {Number} size The length for X and Y axis values.
     * @example
     * new LinearRegression([[0, 1, 2, 4, 5], [3, 4, 2, 4, 5]])
     */
    constructor(matrix, size = 0) {
        this.updateMatrix(matrix, size);
    }

    /**
     * @function
     * @description Update the matrix variables for the linear regression calculation.
     * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
     * @version 1.0
     * @since 1.0
     * @param {Array} matrix The matrix to be used to calcuate the linear regression.
     * @param {Number} size The length for X and Y axis.
     * @example
     * updateMatrix([[1, 2, 3], [-1, 3, 4]], 3)
     */
    updateMatrix(matrix, size = 0) {
        this.matrix = matrix;

        this._x = getAverage(this.matrix[0]);
        this._y = getAverage(this.matrix[1]);

        this.size = size > 0 ? size : this.matrix[0].length;
    }

    /**
     * @method
     * @description Calculate the entired linear regression for the matrix and min and max X axis values.
     * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
     * @version 1.0
     * @since 1.0
     * @param {Number} min The initial value in X axis
     * @param {Number} max The last value in X axis
     * @example
     * calculate(1, 5, 1) -> returns [[0, 1, 2, 3, 4, 5], [2.8, 3.2, 3.6, 4, 4.4]]
     */
    calculate(min = null, max = null, incrementBy = 1) {
        this.linearRegression = [[], []];

        this._m = calculateM(this.size, this.matrix, this._x, this._y);
        this._c = calculateC(this._m, this._x, this._y);

        const lastPoint = max | Math.max(...this.matrix[0]);
        let curPoint = min | Math.min(...this.matrix[0]);

        while (curPoint <= lastPoint) {
            this.linearRegression[0].push(curPoint);
            this.linearRegression[1].push(calculateYPoint(this._m, curPoint, this._c));

            curPoint += incrementBy;
        }

        return this.linearRegression;
    }

    /**
     * @method
     * @description Calculate the R2 coefficiente to validate the distance between linear regression with the current matrix.
     * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
     * @version 1.0
     * @since 1.0
     * @example
     * getR2() -> returns 0.3076923076923078
     */
    getR2() {
        if (this.linearRegression) {
            return calculateR2Coefficient(this.matrix[1], this._y, this.linearRegression[1]);
        }

        return null;
    }

}

/**
 * @method
 * @description Get the average of a set of values in an array. Formula: avg = ∑(n) / n~
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since 1.0
 * @param {Array} values A set of values in an array.
 * @returns {Number} The average result from the array.
 * @example
 * getAverage([1, 2, 3, 4, 5]) -> returns 3
 */
 function getAverage(values = []) {
    const sum = values ? values.reduce((a, b) => a + b, 0) : undefined;
    return sum ? sum / values.length : undefined;
}

/**
 * @method
 * @description Calculate the M value for the matrix, size and X and Y axis average. Formula: m = ∑(x - x~)(y - y~) / ∑(x - x~)^2
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since 1.0
 * @param {Number} size The lenght of the arrays in the matrix.
 * @param {Array} matrix The Matrix with X and Y axis values.
 * @param {Number} _x The average value for X axis. 
 * @param {Number} _y The average value for Y axis.
 * @returns {Number} The M value.
 * @example
 * calculateM(5, [[1, 2, 3, 4, 5], [3, 4, 2, 4, 5]], 3, 3.6) -> returns 0.4
 */
function calculateM(size = 0, matrix = [], _x = undefined, _y = undefined) {
    let m = undefined;

    if (matrix && _x && _y && size > 0) {
        let r = 0;
        const dividend = [];

        while (r < size) {
            dividend.push((matrix[0][r] - _x) * (matrix[1][r] - _y));
            r++;
        }

        m = dividend.reduce((a, b) => a + b) / (matrix[0].map(x => ((x - _x) ** 2)).reduce((a, b) => a + b));
    }

    return m;
}

/**
 * @method
 * @description Calculate the C value for the Linear Regression formula. Formula: y = mx + c
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since 1.0
 * @param {Number} m The M value from Linear Regression formula.
 * @param {Number} _x The average from X axis.
 * @param {Number} _y The average from Y axis.
 * @returns {Number} The calculated value for C.
 * @example
 * calculateC(0.4, 3, 3.6) -> returns 2.4
 */
function calculateC(m = undefined, _x = undefined, _y = undefined) {
    return (m && _x && _y) ? _y - (m * _x) : undefined;
}

/**
 * @method
 * @description Get the Y axis point for the current X point. Formula: y = mx + c
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since 1.0
 * @param {Number} m The M value from Linear Regression formula.
 * @param {Number} x The current X point for calculate Y point.
 * @param {Number} c The C value from Linear Regression formula.
 * @returns {Number} The Y point for current X point.
 * @example
 * calculateYPoint(0.4, 1, 2.4) -> returns 2.8
 */
function calculateYPoint(m, x, c) {
    return (m * x) + c;
}

/**
 * @method
 * @description Calculate the R2 coefficient for the given linear regression. Formula: R^2 = ∑(yp - y~)^2 / ∑(y - y~)^2
 * @author José Luis Pérez Olvera <sistem_pp@hotmail.com>
 * @version 1.0
 * @since 1.0
 * @param {Array} ys The array with Y axis values.
 * @param {Number} _y The average of Y axis values.
 * @param {Array} yps The array with all predictable Y axis values from linear regression.
 * @example
 * calculateR2Coefficient([3, 4, 2, 4, 5], 3.6, [2.8, 3.2, 3.6, 4.0, 4.4]) -> returns 0.3076923076923078
 */
function calculateR2Coefficient(ys, _y, yps) {
    const dividend = yps.map(yp => (yp - _y) ** 2).reduce((a, b) => a + b, 0);
    const divider = ys.map(y => (y - _y) ** 2).reduce((a, b) => a + b, 0);

    return dividend / divider;
}

export default LinearRegression;