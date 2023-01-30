const MazeMap =
{original:
`
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
x............ xx ............x
x.xxxxx.xxxx. xx .xxxx.xxxxx.x
xOxxxxx.xxxx. xx .xxxx.xxxxxOx
x.xxxxx.xxxx. xx .xxxx.xxxxx.x
x............ .. ............x
x.xxxxx.xx.xx xx xx.xx.xxxxx.x
x.xxxxx.xx.xx xx xx.xx.xxxxx.x
x.......xx... xx ...xx.......x
======x.xxxx. xx .xxxx.x======
______|.xxxx. xx .xxxx.|______
______|.xx___ 1_ ___xx.|______
======x.xx_x= -- =x_xx.x======
_<_____.___|2 3_ 4|___._____>_
======x.xx_x= == =x_xx.x======
______|.xx___ __ ___xx.|______
______|.xx_xx xx xx_xx.|______
======x.xx_xx xx xx_xx.x======
x............ xx ............x
x.xxxxx.xxxx. xx .xxxx.xxxxx.x
x.xxxxx.xxxx. xx .xxxx.xxxxx.x
xO...xx...... P. ......xx...Ox
xxxx.xx.xx.xx xx xx.xx.xx.xxxx
xxxx.xx.xx.xx xx xx.xx.xx.xxxx
x.......xx... xx ...xx.......x
x.xxxxxxxxxx. xx .xxxxxxxxxx.x
x.xxxxxxxxxx. xx .xxxxxxxxxx.x
x............ .. ............x
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
xxxxxxxxxxxxx xx xxxxxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap