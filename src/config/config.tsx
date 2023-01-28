const config = {
  tileSizeInPx: 40,
  mazeColumns: 21,
  mazeRows: 22,
  //Controla a velocidade do jogo, quanto menor, mais rápido
  pacmanSpeed: .3,
  pointValue: 50,
  pointCssVar: '--without-point',

  pacmanXCssVar: '--pacManX',
  pacmanYCssVar: '--pacmanY',
  pacmanDirection: '--pacmanRotate'
} as const;

export default config