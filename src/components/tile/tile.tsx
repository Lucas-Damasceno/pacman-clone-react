import React, { ReactElement } from "react"
import config from "../../config/config";
import PacMan from "../pacman/pacman";
import PossibleTiles from "../types/possibleTiles";
import { Tiles } from "../../enums/tiles.enum";
import Ghost from "../ghosts/ghosts";


type Props = {
  tileChar: PossibleTiles;
  index: number;
  map: string;
}

function Tile(props: Props): ReactElement{
  // console.count('TileRender')

  function generateTileStyle(mazeMap: string, mapColumns: number,index: number){
    const tile = mazeMap[index] as PossibleTiles;
    const tileWall = tile === Tiles.wall;
    const tilePoint = tile === Tiles.point;
    const tilePower = tile === Tiles.power;
    const tileGate = tile === Tiles.ghostGate;
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

      if(rightTile === Tiles.wall){
        tileStyle.borderRight = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderBottomRightRadius = '0';
      }

      if(leftTile === Tiles.wall){
        tileStyle.borderLeft = 'none'
        tileStyle.borderTopLeftRadius = '0';
        tileStyle.borderBottomLeftRadius = '0';
      }

      if(topTile === Tiles.wall){
        tileStyle.borderTop = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderTopLeftRadius = '0';
      }
    
      if(bottomTile === Tiles.wall){
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
        opacity: `var(${config.pointCssVar}${index})`
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
        opacity: `var(${config.pointCssVar}${index})`
      }
    }

    if(tileGate){
      tileStyle = {
        width: '100%',
        height: '5px',
        backgroundColor: '#fff',
        placeSelf: 'center',  
      }
    }

    return tileStyle
  }
  
  const tileStyle = generateTileStyle(props.map, config.mazeColumns, props.index);

  if(props.tileChar === Tiles.pacman){
    return <PacMan index={props.index}/>
  }

  if(props.tileChar === Tiles.ghost1){
    return <Ghost type="1"/>
  }

  if(props.tileChar === Tiles.ghost2){
    return <Ghost type="2"/>
  }

  if(props.tileChar === Tiles.ghost3){
    return <Ghost type="3"/>
  }

  if(props.tileChar === Tiles.ghost4){
    return <Ghost type="4"/>
  }



  return(
    <div style={tileStyle}/>
  )

}

export default React.memo(Tile)