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
exports.getAverage = (values = []) => {
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
exports.calculateM = (size = 0, matrix = [], _x = undefined, _y = undefined) => {
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
exports.calculateC = (m = undefined, _x = undefined, _y = undefined) => {
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
exports.calculateYPoint = (m, x, c) => {
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
exports.calculateR2Coefficient = (ys, _y, yps) => {
    const dividend = yps.map(yp => (yp - _y) ** 2).reduce((a, b) => a + b, 0);
    const divider = ys.map(y => (y - _y) ** 2).reduce((a, b) => a + b, 0);

    return dividend / divider;
}