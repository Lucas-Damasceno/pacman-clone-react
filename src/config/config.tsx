import MazeMap from "../components/maze/mazeMap";

const config = {
  tileSizeInPx: 40,
  mazeColumns: MazeMap.original.replaceAll(' ', '').split('').findIndex((item, index) => item === '\n' && index !== 0) - 1,
  mazeRows: (MazeMap.original.match(/\n/g) || []).length - 1,
  //Controla a velocidade do jogo, quanto menor, mais rápido
  pacmanSpeed: .3,
  pointValue: 50,
  pointCssVar: '--without-point',
  maximumTimePoweredInTicks: 30,

  pacmanXCssVar: '--pacManX',
  pacmanYCssVar: '--pacmanY',
  pacmanDirection: '--pacmanRotate'
} as const;

console.log(MazeMap)

export default config