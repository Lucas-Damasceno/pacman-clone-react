const config = {
  tileSizeInPx: 40,
  mazeColumns: 21,
  mazeRows: 22,
  pacmanSpeed: 1,
  pointCssVar: '--without-point',

  pacmanXCssVar: '--pacManX',
  pacmanYCssVar: '--pacmanY',
  pacmanDirection: '--pacmanRotate'
} as const;

export default config