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
  // let graph = '';
  // inputData.forEach((value) => graph += value > sum ? '^' : '*');
  // console.log('Graph:', graph);
  let maxValue = Math.max(...inputData);
  const minValue = Math.min(...inputData);
  while (maxValue >= minValue) {
    let rowStr = '';
    for (const col in inputData) {
      const element = inputData[col];
      const symbol = element < maxValue ? ' ' : (element > sum ? '^' : '*');
      rowStr += symbol;
    }
    console.log(maxValue.toString().padStart(3), rowStr);
    maxValue--;
  }
})();