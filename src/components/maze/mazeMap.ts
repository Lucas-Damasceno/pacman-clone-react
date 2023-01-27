
const MazeMap =
{original:
`
xxxxxxxxxx x xxxxxxxxxx
x......... x .........x
xOxxx.xxx. x .xxx.xxxOx
x.xxx.xxx. x .xxx.xxx.x
x......... . .........x
x.xxx.x.xx x xx.x.xxx.x
x.....x... x ...x.....x
xxxxx.xxx. x .xxx.xxxxx
____x.x___ _ ___x.x____
xxxxx.x_xx - xx_x.xxxxx
T____.__xO _ Ox__.____T
xxxxx.x_xx x xx_x.xxxxx
____x.x___ _ _2_x.x____
xxxxx.x_xx x xx_x.xxxxx
x......... x .........x
x.xxx.xxx. x .xxx.xxx.x
xO..x..... P .....x..Ox
xxx.x.x.xx x xx.x.x.xxx
x.....x... x ...x.....x
x.xxxxxxx. x .xxxxxxx.x
x......... . .........x
xxxxxxxxxx x xxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap