const MazeMap =
{original:
`
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
x............. xx .............x
x.xxxx.xxxxxx. xx .xxxxxx.xxxx.x
xOxxxx.xxxxxx. xx .xxxxxx.xxxxOx
x.xxxx.xxxxxx. xx .xxxxxx.xxxx.x
x............. .. .............x
x.xxxxx.xx.xxx xx xxx.xx.xxxxx.x
x.xxxxx.xx.xxx xx xxx.xx.xxxxx.x
x.......xx.... xx ....xx.......x
======x.xxxxx. xx .xxxxx.x======
______|.xxxxx. xx .xxxxx.|______
______|.xx___. xx .___xx.|______
______|.xx____ 1_ ____xx.|______
======x.xx__x= -- =x__xx.x======
_<_____.____|2 3_ 4|____._____>_
======x.xx__x= == =x__xx.x======
______|.xx____ __ ____xx.|______
______|.xx__xx xx xx__xx.|______
======x.xx__xx xx xx__xx.x======
x............. xx .............x
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
x.xxxxx.xxxxx. xx .xxxxx.xxxxx.x
xO...xx....... P. .......xx...Ox
xxxx.xx.xx.xxx xx xxx.xx.xx.xxxx
xxxx.xx.xx.xxx xx xxx.xx.xx.xxxx
x.......xx.... xx ....xx.......x
x.xxxxxxxxxxx. xx .xxxxxxxxxxx.x
x.xxxxxxxxxxx. xx .xxxxxxxxxxx.x
x............. .. .............x
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
xxxxxxxxxxxxxx xx xxxxxxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap