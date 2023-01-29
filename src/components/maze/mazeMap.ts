const MazeMap =
{original:
`
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
x............. xx .............x
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
xOxxxxx.xxxxx. xx .xxxxx.xxxxxOx
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
x............. .. .............x
x.xxxxx.xx.xxx xx xxx.xx.xxxxx.x
x.xxxxx.xx.xxx xx xxx.xx.xxxxx.x
x.......xx.... xx ....xx.......x
xxxxxxx.xxxxx. xx .xxxxx.xxxxxxx
_____xx.xxxxx. xx .xxxxx.xx_____
_____xx.xx____ 11 ____xx.xx_____
=xxxxxx.xx_xxx -- xxx_xx.xxxxxxx
<______.___xx2 33 4xx___.______>
=xxxxxx.xx_xxx xx xxx_xx.xxxxxxx
_____xx.xx_xxx xx xxx_xx.xx_____
_____xx.xx____ __ ____xx.xx_____
_____xx.xx_xxx xx xxx_xx.xx_____
xxxxxxx.xx_xxx xx xxx_xx.xxxxxxx
x............. xx .............x
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
xO...xx....... PP .......xx...Ox
xxxx.xx.xx.xxx xx xxx.xx.xx.xxxx
xxxx.xx.xx.xxx xx xxx.xx.xx.xxxx
x.......xx.... xx ....xx.......x
x.xxxxxxxxxxx. xx .xxxxxxxxxxx.x
x.xxxxxxxxxxx. xx .xxxxxxxxxxx.x
x............. .. .............x
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap