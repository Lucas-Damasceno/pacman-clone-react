const config = {
  tileSizeInPx: 40,
  mazeColumns: 21,
  mazeRows: 22,
  pacmanSpeed: .3,
  pointCssVar: '--without-point',

  pacmanXCssVar: '--pacManX',
  pacmanYCssVar: '--pacmanY',
  pacmanDirection: '--pacmanRotate'
} as const;

export default config