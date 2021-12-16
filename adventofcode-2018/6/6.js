var fs = require('fs');


const processLine = line => {
  // ...

  const coords = line.split(', ')
  const x = parseInt(coords[0])
  const y = parseInt(coords[1])

  console.log('plotting at ', x, y)
  // set all pre x's
  for(let i = 0; i <= x + 1; i++ ) {
    if(!grid[i]) {
      grid[i] = []
    }
    for(let j = 0; j < y; j++ ) {
      if(!grid[i][j]) {
        grid[i][j] = '.'
      }
    }
  }

  grid[x][y] = ++idx

  coords.push({ x, y })

}

const findNearestChord = (x, y)

let idx = 0

const dist = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)
const coords = []
const fileLines = fs.readFileSync('sample').toString().split('\n')
const grid = []


// transfer strings into objects
fileLines.forEach(line => { 
  processLine(line)
})




for(let i = 0; i < grid.length; i++ ) {
  for(let j = 0; j < grid[i].length; j++ ) {
      if(!grid[i][j]) {
        grid[i][j] = '.'
      }
    }
  }





console.log(grid)
