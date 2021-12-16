var fs = require('fs');
/*

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
    console.log('encounteredTotals', encounteredTotals)
});
}

let total = 0


function func(data) {
  console.log('read', data)

  total += parseFloat(data)
  console.log('total: ', data +'\t'+ total);
}

let input = fs.createReadStream('data.txt');
*/
const encounteredTotals = {'0': true}
let total = 0
while (true) {
  //console.log('here', total)
  const fileLines = fs.readFileSync('data.txt').toString().split("\n")  
  fileLines.forEach(line => {
    if (line === '') {
      return   
    }
    total += parseFloat(line)
    //console.log('total', total)
    if (encounteredTotals[`${total}`]) {
      console.log('Already encountered', total)
      process.exit()
    }
    encounteredTotals[`${total}`] = true
    //}
    //encounteredTotals[`${total}`]++
    //console.log('line', line)
  })
//  readLines(input, func);
  //input = fs.createReadStream('data.txt');
}
