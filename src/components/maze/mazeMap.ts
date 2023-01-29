const MazeMap =
{original:
`
xxxxxxxxxxxxxxxxxxxx x xxxxxxxxxxxxxxxxxxxx
xx.................. x ..................xx
xx..xxxxxx..xxxxxx.. x ..xxxxxx..xxxxxx..xx
xxOOxxxxxx..xxxxxx.. x ..xxxxxx..xxxxxxOOxx
xx..xxxxxx..xxxxxx.. x ..xxxxxx..xxxxxx..xx
xx.................. . ..................xx
xx..xxxxxx..xx..xxxx x xxxx..xx..xxxxxx..xx
xx..........xx...... x ......xx..........xx
xxxxxxxxxx..xxxxxx.. x ..xxxxxx..xxxxxxxxxx
________xx..xx______ 1 ______xx..xx________
==xxxxxxxx..xx__xxxx - xxxx__xx..xxxxxxxx==
<<________..____xx2_ 3 _4xx____..________>>
==xxxxxxxx..xx__xxxx x xxxx__xx..xxxxxxxx==
________xx..xx______ _ ______xx..xx________
xxxxxxxxxx..xx__xxxx x xxxx__xx..xxxxxxxxxx
xx.................. x ..................xx
xx..xxxxxx..xxxxxx.. x ..xxxxxx..xxxxxx..xx
xxOO....xx.......... P ..........xx....OOxx
xxxxxx..xx..xx..xxxx x xxxx..xx..xx..xxxxxx
xx..........xx...... x ......xx..........xx
xx..xxxxxxxxxxxxxx.. x ..xxxxxxxxxxxxxx..xx
xx.................. . ..................xx
xxxxxxxxxxxxxxxxxxxx x xxxxxxxxxxxxxxxxxxxx
`,
  filteredMap: function() {
    return this.original.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  }
} as const;

export default MazeMap