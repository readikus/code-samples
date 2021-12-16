var fs = require('fs');

const processLine = line => {
  for( let i = 0; i < line.length - 1; i++ ){
    const char = line.charAt(i)
    const char1 = line.charAt(i+1)
    if (char.toLowerCase() === char1.toLowerCase() && char1 !== char) {
      line = line.slice(0, i) + line.slice(i+2)
      i = -1
    }
  }
  return line
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const fileLines = fs.readFileSync('input').toString().split("\n")  
// transfer strings into objects
fileLines.forEach(line => { 
  let result = processLine(line)
  //console.log('result', result, result.length)
  const alphaCount = []
  // part 2...
  alphabet.forEach(char => {
   // const strippedLine = line.replace(new RegExp('a'))  
   const strippedLine = line.replace(new RegExp(char+'|'+char.toUpperCase(), 'g'), '')
   const reactedStrippedLine = processLine(strippedLine)

   alphaCount.push( { char, length: reactedStrippedLine.length } )
  })
  alphaCount.sort((a,b) => b.length - a.length)
  console.log(alphaCount)
})
// 10368