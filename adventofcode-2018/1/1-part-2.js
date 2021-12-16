var fs = require('fs');

const encounteredTotals = {'0': true}
let total = 0
while (true) {
  const fileLines = fs.readFileSync('data.txt').toString().split("\n")  
  fileLines.forEach(line => {
    if (line === '') {
      return   
    }
    total += parseFloat(line)
    if (encounteredTotals[`${total}`]) {
      console.log('Already encountered', total)
      process.exit()
    }
    encounteredTotals[`${total}`] = true
  })
}
