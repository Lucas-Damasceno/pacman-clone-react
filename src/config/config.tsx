import MazeMap from "../components/maze/mazeMap";

const config = {
  tileSizeInPx: 28,
  mazeColumns: MazeMap.original.replaceAll(' ', '').split('').findIndex((item, index) => item === '\n' && index !== 0) - 1,
  mazeRows: (MazeMap.original.match(/\n/g) || []).length - 1,
  //Controla a velocidade do jogo, quanto menor, mais rápido
  pacmanSpeed: .10,
  pointValue: 10,
  pointCssVar: '--without-point',
  maximumTimePoweredInTicks: 50,
} as const;

export default config