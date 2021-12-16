var fs = require('fs');

const areSimilar = (a, b) => {
  for(let i = 0; i < a.length; i++){
    const aa = a.slice(0, i) + a.slice(i + 1)
    const bb = b.slice(0, i) + b.slice(i + 1)
    if (aa === bb) {
      console.log('aa', aa)
    }
  }
}

    

const fileLines = fs.readFileSync('data.txt').toString().split("\n")  

for(let i = 0; i < fileLines.length; i++) {
  for(let j = i + 1; j < fileLines.length; j++) {
      areSimilar(fileLines[i], fileLines[j])
  }
}

console.log('finished')
