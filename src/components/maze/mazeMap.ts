const MazeMap =
{original:
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
=====x.xxxxx. xx .xxxxx.x=====
_____|.xxxxx. xx .xxxxx.|_____
_____|.xx___. xx .___xx.|_____
_____|.xx____ 1_ ____xx.|_____
=====x.xx__x= -- =x__xx.x=====
_<____.____|2 3_ 4|____.____>_
=====x.xx__|_ __ _|__xx.x=====
_____|.xx__x= == =x__xx.|_____
_____|.xx____ __ ____xx.|_____
_____|.xx_xxx xx xxx_xx.|_____
=====x.xx_xxx xx xxx_xx.x=====
x............ xx ............x
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
x.xxxx.xxxxx. xx .xxxxx.xxxx.x
xO..xx....... P. .......xx..Ox
xxx.xx.xx.xxx xx xxx.xx.xx.xxx
xxx.xx.xx.xxx xx xxx.xx.xx.xxx
x......xx.... xx ....xx......x
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