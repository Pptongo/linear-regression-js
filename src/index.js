const { getAverage, calculateM, calculateC, calculateYPoint, calculateR2Coefficient } = require("./calcs");

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

export default LinearRegression;