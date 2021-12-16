var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

let total = 0
const encountered = {}

function func(data) {
    total += parseFloat(data)
    encountered[data] = true
  console.log('Line: ' + data, total);
}

var input = fs.createReadStream('data.txt');
readLines(input, func);
console.log('Total', total)
