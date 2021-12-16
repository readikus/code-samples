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
const countChar = (s, c) => s.split( new RegExp( c, "gi" ) ).length-1

const processLine = line => {
  console.log(...line)
  let unique = [...new Set([...line])]
  let has2 = false
  let has3 = false

  console.log('unique', unique)
  unique.forEach( char => {
    var count = countChar(line, char)
    if (count === 2) {
      has2 = true
    }
    if (count === 3) {
      has3 = true
    }
  })
  return { has2, has3 }

}


const encounteredTotals = {'0': true}
let total = 0
let total2 = 0
let total3 = 0
  //console.log('here', total)
const fileLines = fs.readFileSync('data.txt').toString().split("\n")  
fileLines.forEach(line => {
const res  =processLine(line)
if ( res.has2 === true ){
    total2++
}
if ( res.has3 === true ){
    total3++
}
})

const char = 'c'
const line = 'cccc'
var count = countChar(line, char)

console.log('count foind', count)


console.log(total2, total3, (total2 * total3))
