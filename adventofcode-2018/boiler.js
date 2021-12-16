var fs = require('fs');

const processLine = line => {
  // ...
}

const fileLines = fs.readFileSync('input').toString().split('\n')
// transfer strings into objects
fileLines.forEach(line => { 
  let result = processLine(line)
  console.log(alphaCount)
})
