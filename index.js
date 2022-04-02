const fs = require('fs').promises;
const path = require('path');

(async () => {
  // Read data from file
  const inputDataStr = await fs.readFile(path.join(__dirname, 'input.txt'));
  const inputData = inputDataStr.toString().split(',').map((value) => +value.trim());
  console.log('Input Data:', inputData);

  // Calculate mean
  const mean = inputData.reduce((a, b) => a + b, 0) / inputData.length;
  console.log('Mean:', mean);

  // Calculate standart deviation
  const standartDeviation = Math.sqrt(inputData.map(value => Math.pow(value - mean, 2)).reduce((a, b) => a + b) / inputData.length);
  console.log('Standart Devication:', standartDeviation);

  // Calculate standart error
  const standartError = standartDeviation / Math.sqrt(inputData.length);
  console.log('Standart Error:', standartError);

  // Get elements, bigger than mean + standartDeviation
  const sum = mean + standartDeviation;
  const elementsBiggerThanMeanAndStandartDeviation = inputData.filter((value) => value >= sum);
  console.log('Bigger elements:', elementsBiggerThanMeanAndStandartDeviation);

  // Print graph
  const maxValue = Math.max(...inputData);
  let minValue = Math.min(...inputData);
  const occurrences = inputData.reduce(function (obj, curr) {
    return obj[curr] ? ++obj[curr] : obj[curr] = 1, obj
  }, {});
  const maxVerticalLines = Math.max(...Object.values(occurrences));
  let strGraph = '';
  for (let i = maxVerticalLines; i > 0; i--) {
    let tmpMin = minValue;
    while (tmpMin <= maxValue) {
      const count = occurrences[tmpMin] || -1;
      const symbol = count >= i ? (tmpMin > sum ? '^' : '*') : ' ';
      strGraph += symbol;
      tmpMin++;
    }
    strGraph += '\n';
  }
  console.log(strGraph);
})();