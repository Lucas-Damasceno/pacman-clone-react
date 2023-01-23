import React, { ReactElement } from "react"
import PacMan from "../../pacman/pacman";
import S from './styles'

type PossibleTiles = 'x' | '.' | '_' | 'O' | 'P';

function Tile(tileChar: PossibleTiles, index: number, map: string): ReactElement{

  function generateTileStyle(mazeMap: string, mapColumns: number,index: number){
    const tileType = {
      wall: 'x',
      point: '.',
      withOutPoint: '_',
      power: 'O',
    }

    const tile = mazeMap[index] as PossibleTiles;
    const tileWall = tile === 'x';
    const tilePoint = tile === '.';
    const tilePower = tile === 'O';
    const rightTile = mazeMap[index + 1];
    const leftTile = mazeMap[index -1];
    const topTile = mazeMap[index - mapColumns];
    const bottomTile = mazeMap[index + mapColumns];

    let tileStyle: React.CSSProperties = {};

    if(tileWall){
      const borderStyle = '2px solid blue';

      tileStyle = {
        borderRadius: '20px',
        borderTop: borderStyle,
        borderRight: borderStyle,
        borderBottom: borderStyle,
        borderLeft: borderStyle,
      };

      if(rightTile === tileType.wall){
        tileStyle.borderRight = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderBottomRightRadius = '0';
      }

      if(leftTile === tileType.wall){
        tileStyle.borderLeft = 'none'
        tileStyle.borderTopLeftRadius = '0';
        tileStyle.borderBottomLeftRadius = '0';
      }

      if(topTile === tileType.wall){
        tileStyle.borderTop = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderTopLeftRadius = '0';
      }
    
      if(bottomTile === tileType.wall){
        tileStyle.borderBottom = 'none'
        tileStyle.borderBottomRightRadius = '0';
        tileStyle.borderBottomLeftRadius = '0';
      }
    }

    if(tilePoint){
      tileStyle = {
        width: '6px',
        height: '6px',
        background: 'yellow',
        justifySelf: 'center',
        alignSelf: 'center',
        borderRadius: '50%',
      }
    }

    if(tilePower){
      tileStyle = {
        width: '16px',
        height: '16px',
        background: 'yellow',
        justifySelf: 'center',
        alignSelf: 'center',  
        borderRadius: '50%',
      }
    }

    return tileStyle
  }
  //TODO retirar esse magic Number
  const mazeColumns = 23;
  const tileStyle = generateTileStyle(map, mazeColumns, index);


  if(tileChar === 'P'){
    return <PacMan key={index}/>
  }

  return(
    <div key={index} style={tileStyle} />
  )

}

export default Tile