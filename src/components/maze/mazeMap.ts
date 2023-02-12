const originalMap =
`
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
x............ xx ............x
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
xOxxxx.xxxxx. xx .xxxxx.xxxxOx
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
x............ .. ............x
x.xxxx.xx.xxx xx xxx.xx.xxxx.x
x.xxxx.xx.xxx xx xxx.xx.xxxx.x
x......xx.... xx ....xx......x
=====x.xxxxx_ xx _xxxxx.x=====
_____|.xxxxx_ xx _xxxxx.|_____
v____|.xx____ __ ____xx.|____v
_____|.xx_x== -- ==x_xx.|_____
=====x.xx_|b_ __ __|_xx.x=====
<_____.___|3_ 2_ 4_|___._____>
=====x.xx_|__ __ _e|_xx.x=====
_____|.xx_x== == ==x_xx.|_____
v____|.xx____ __ ____xx.|____v
_____|.xx_xxx xx xxx_xx.|_____
=====x.xx_xxx xx xxx_xx.x=====
x............ xx ............x
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
xO..xx...1... P_ .......xx..Ox
xxx.xx.xx.xxx xx xxx.xx.xx.xxx
xxx.xx.xx.xxx xx xxx.xx.xx.xxx
x......xx.... xx ....xx......x
x.xxxxxxxxxx. xx .xxxxxxxxxx.x
x.xxxxxxxxxx. xx .xxxxxxxxxx.x
x............ .. ............x
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
`

const mazeColumns = originalMap.replaceAll(' ', '').split('').findIndex((item, index) => item === '\n' && index !== 0) - 1;
const filteredMap = originalMap.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
const createMazeBidimensionArray = (mazeArray: string[], mazeColumns: number) => {
  const perChunk = mazeColumns;

  const bidimensionalMaze = mazeArray.reduce((resultArray: string[][], item, index) => { 
    const chunkIndex = Math.floor(index/perChunk);
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item);
  
    return resultArray
  }, [])
  
  return bidimensionalMaze
}

const MazeMap = {
  original: originalMap,
  filteredMap: filteredMap,
  mazeColumns: mazeColumns,
  mazeMapXY: createMazeBidimensionArray(filteredMap.split(''), mazeColumns)
} as const;

console.log(MazeMap.mazeMapXY)
export default MazeMap