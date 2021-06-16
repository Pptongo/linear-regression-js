# linear-regression-js
Library used to calculate a linear regression using an existing matrix with X and Y axis.

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Linear Regression

## Installation
`$ npm install --save linear-regression-js`

## Usage

```js
import LinearRegression from 'linear-regression-js';

const matrix = [[1, 2, 3, 4, 5], [3, 4, 2, 4, 5]];
const regression = new LinearRegression(matrix);

const serie = regression.calculate(); // [[1, 2, 3, 4, 5], [2.8, 3.2, 3.6, 4.0, 4.4]]
const r2 = regression.getR2(); // 0.3076923076923078
```
## License

    [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/linearregressionjs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/linearregressionjs
[ci-image]: https://github.com/Pptongo/linear-regression-js/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/Pptongo/linear-regression-js/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/linearregressionjs.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/linearregressionjs