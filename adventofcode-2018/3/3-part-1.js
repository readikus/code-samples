var fs = require('fs');

const countChar = (s, c) => s.split( new RegExp( c, "gi" ) ).length-1

const processLine = line => {
    const a = line.split(' ')
    if( a.length != 4) return
 
    //console.log('a', a)
    // '#1 @ 1,3: 4x4'
    const xAndY = a[2].substring(0, a[2].length - 1).split(',')
    const widthAndHeight = a[3].split('x')
 
    //console.log(xAndY, widthAndHeight)
    setFabric(
      parseInt(xAndY[0]),
      parseInt(xAndY[1]),
      parseInt(widthAndHeight[0]),
      parseInt(widthAndHeight[1]))
 }

 const reprocessLine = line => {
    const a = line.split(' ')
    if( a.length != 4) return
 
    const xAndY = a[2].substring(0, a[2].length - 1).split(',')
    const widthAndHeight = a[3].split('x')
 
    const x = parseInt(xAndY[0])
    const y = parseInt(xAndY[1])
    const width = parseInt(widthAndHeight[0])
    const height = parseInt(widthAndHeight[1])

    //console.log(xAndY, widthAndHeight)
    for(let i = x; i < x + width; i++){
      for(let j = y; j < y + height; j++){
        if(fabric[i][j] === undefined){
          console.log(a[0] + ' has unset value at', i, j)
        }
        if(fabric[i][j] > 1){
          return
        }
      }
    }
    console.log(a[0] + ' seems to be fine')  
         

}
  
const fabric = []

const setFabric = (x, y, width, height) => {

   // console.log('setting at', x, y, 'for', width, height)
  // 
  const maxX = x + width
  const maxY = y + height    
  // set all pre x's
  for(let i = 0; i < maxX; i++ ) {
    if(!fabric[i]) {
      fabric[i] = []
    }
    for(let j = 0; j < maxY; j++ ) {
      if(!fabric[i][j]) {
        fabric[i][j] = 0
      }
    }
  }
  // set all pre x's
//  for(let i = 0; i <= y; i++ ) {
 //   if(!fabric[x][i]) {
   //    fabric[x][i] = 0
//    }
  //}
//  console.log('initial grid:', fabric)

  for(let i = x; i < x + width; i++ ) {
    for(let j = y; j < y + height; j++ ) {
      if(!fabric[i][j]){
        fabric[i][j] = 0
      }
      fabric[i][j]++
    }
  }
}

const fileLines = fs.readFileSync('input').toString().split("\n")  
fileLines.forEach(line => {
  processLine(line)
})

//console.log('fabric at', fabric[808][793], fabric[808][793])
//process.exit()

fileLines.forEach(line => {
  reprocessLine(line)
})


//console.log(fabric, overlaps)