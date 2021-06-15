const calcs = require('./calcs')

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
     * @param {Array} matrix
     * @example
     * new LinearRegression([[0, 1, 2, 4, 5], [3, 4, 2, 4, 5]])
     */
    constructor(matrix, size = 0) {
        this.matrix = matrix;

        this._x = calcs.getAverage(this.matrix[0]);
        this._y = calcs.getAverage(this.matrix[1]);

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
     * calculate(0, 5, 1) -> returns [[0, 1, 2, 3, 4, 5], [2.4, 2.8, 3.2, 3.6, 4, 4.4]]
     */
    calculate(min = null, max = null, incrementBy = 1) {
        this.linearRegression = [[], []];

        this._m = calcs.calculateM(this.size, this.matrix, this._x, this._y);
        this._c = calcs.calculateC(this._m, this._x, this._y);

        let step = min;

        while (step <= max) {
            this.linearRegression[0].push(step);
            this.linearRegression[1].push(calcs.calculateYPoint(this._m, step, this._c));

            step += incrementBy;
        }

        return this.linearRegression;
    }

}

exports.linearRegression = matrix => new LinearRegression(matrix);