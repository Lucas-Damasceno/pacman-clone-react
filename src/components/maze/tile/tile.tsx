import React, { ReactElement, useEffect, useState } from "react"
import config from "../../../config/config";
import PacMan from "../../pacman/pacman";
import PossibleTiles from "../../types/possibleTiles";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../../states/maze.state";
import { Tiles } from "../../../enums/tiles.enum";


type Props = {
  tileChar: PossibleTiles;
  index: number;
  map: string;
}

function Tile(props: Props): ReactElement{
  console.count('TileRender')
  // const [mazeState, setMazeState] = useRecoilState(MazeState);
  // const [tileStyle, setTileStyle] = useState<React.CSSProperties>({})

  function generateTileStyle(mazeMap: string, mapColumns: number,index: number){

    const tileType = {
      wall: 'x',
      point: '.',
      withOutPoint: '_',
      power: 'O',
    }

    const tile = mazeMap[index] as PossibleTiles;
    const tileWall = tile === Tiles.wall;
    const tilePoint = tile === Tiles.point;
    const tilePower = tile === Tiles.power;
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

    // if(mazeState[index]?.status === Tiles.withoutPoint || mazeState[index]?.status === Tiles.pacman){
    //   //Some com os pontos na tela
    //   tileStyle.transition = 'all .5s';
    //   tileStyle.opacity = 0
    // }

    return tileStyle
  }
  
  const tileStyle = generateTileStyle(props.map, config.mazeColumns, props.index);

  if(props.tileChar === Tiles.pacman){
    return <PacMan index={props.index}/>
  }

  return(
    <div style={tileStyle}/>
  )

}

export default React.memo(Tile)