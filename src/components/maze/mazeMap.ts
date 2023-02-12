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
=====x.xxxxx_ xx _xxxxx.x=====
_____|.xxxxx_ xx _xxxxx.|_____
_____|.xx____ __ ____xx.|_____
_____|.xx_x== -- ==x_xx.|_____
=====x.xx_|b_ __ __|_xx.x=====
<_____.___|3_ 2_ 4_|___._____>
=====x.xx_|__ __ _e|_xx.x=====
_____|.xx_x== == ==x_xx.|_____
_____|.xx____ __ ____xx.|_____
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
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap