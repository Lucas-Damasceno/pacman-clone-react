const MazeMap =
{original:
`
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
xx............ xx ............xx
xx.xxxxx.xxxx. xx .xxxx.xxxxx.xx
xxOxxxxx.xxxx. xx .xxxx.xxxxxOxx
xx.xxxxx.xxxx. xx .xxxx.xxxxx.xx
xx............ .. ............xx
xx.xxxxx.xx.xx xx xx.xx.xxxxx.xx
xx.xxxxx.xx.xx xx xx.xx.xxxxx.xx
xx.......xx... xx ...xx.......xx
=======x.xxxx. xx .xxxx.x=======
______xx.xxxx. xx .xxxx.xx______
______xx.xx___ 1_ ___xx.xx______
=======x.xx_xx -- xx_xx.x=======
<<______.___x_ __ _x___.______>>
=======x.xx_x= == =x_xx.x=======
______xx.xx___ __ ___xx.xx______
______xx.xx_xx xx xx_xx.xx______
=======x.xx_xx xx xx_xx.x=======
xx............ xx ............xx
xx.xxxxx.xxxx. xx .xxxx.xxxxx.xx
xx.xxxxx.xxxx. xx .xxxx.xxxxx.xx
xxO...xx...... PP ......xx...Oxx
xxxxx.xx.xx.xx xx xx.xx.xx.xxxxx
xxxxx.xx.xx.xx xx xx.xx.xx.xxxxx
xx.......xx... xx ...xx.......xx
xx.xxxxxxxxxx. xx .xxxxxxxxxx.xx
xx.xxxxxxxxxx. xx .xxxxxxxxxx.xx
xx............ .. ............xx
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap