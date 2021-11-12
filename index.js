const express = require('express');

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean/:nums', function (req, res) {
  var numbers = [];
  var nums = req.params.nums.split(',');

  var sum = 0;
  for (let i = 0; i < nums.length; i++) {
    var num = parseInt(nums[i]);
    if (Number.isNaN(num)) {
      return res
        .status(400)
        .json({ response: `${nums[i]} is not a valid number ` });
    }
    sum = sum + num;
    numbers.push(num);
  }
  const value = sum / nums.length;
  return res.json({ response: { operation: 'mean', value: value } });
});

app.get('/median/:nums', function (req, res) {
  var numbers = [];
  var nums = req.params.nums.split(',');

  for (let i = 0; i < nums.length; i++) {
    var num = parseInt(nums[i]);
    if (Number.isNaN(num)) {
      return res
        .status(400)
        .json({ response: `${nums[i]} is not a valid number ` });
    }
    numbers.push(num);
  }
  const value = median(numbers);
  return res.json({ response: { operation: 'median', value: value } });
});

app.get('/mode/:nums', function (req, res) {
  var numbers = [];
  var nums = req.params.nums.split(',');

  for (let i = 0; i < nums.length; i++) {
    var num = parseInt(nums[i]);
    if (Number.isNaN(num)) {
      return res
        .status(400)
        .json({ response: `${nums[i]} is not a valid number ` });
    }
    numbers.push(num);
  }
  const value = findMode(numbers);
  return res.json({ response: { operation: 'mode', value: value } });
});
// helper function to find mode
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}
function createFrequencyCounter(arr) {
  return arr.reduce(function (acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}
// Helper function to calculate median
const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

app.listen(3000, function () {
  console.log('Started to listen on port 3000');
});
