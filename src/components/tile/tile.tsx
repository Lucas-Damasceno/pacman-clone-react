import React, { ReactElement } from "react"
import config from "../../config/config";
import PacMan from "../pacman/pacman";
import PossibleTiles from "../../types/possibleTiles";
import { Tiles } from "../../enums/tiles.enum";
import Ghost from "../ghosts/ghosts";
import { useRecoilState } from 'recoil';

type Props = {
  tileChar: PossibleTiles;
  index: number;
  map: string;
}

function Tile(props: Props): ReactElement{

  function generateTileStyle(mazeMap: string, mapColumns: number,index: number){
    const tile = mazeMap[index] as PossibleTiles;

    const rightTile = mazeMap[index + 1];
    const leftTile = mazeMap[index -1];
    const topTile = mazeMap[index - mapColumns];
    const bottomTile = mazeMap[index + mapColumns];

    let tileStyle: React.CSSProperties = {};

    if(tile === Tiles.wall || tile === Tiles.wallHorizontal){
      const borderStyle = '2px solid blue';

      tileStyle = {
        borderRadius: '20px',
        borderTop: borderStyle,
        borderRight: borderStyle,
        borderBottom: borderStyle,
        borderLeft: borderStyle,
      };

      if(rightTile === Tiles.wall || rightTile === Tiles.wallHorizontal){
        tileStyle.borderRight = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderBottomRightRadius = '0';
      }

      if(leftTile === Tiles.wall || leftTile === Tiles.wallHorizontal){
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

      if(tile === Tiles.wallHorizontal){
        tileStyle = {
          borderRadius: '0',
          borderTop: borderStyle,
          borderBottom: borderStyle,
          borderRight: 'none',
          borderLeft: 'none',  
        }
      }
    }

    if(tile === Tiles.point){
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

    if(tile === Tiles.power){
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

    if(tile === Tiles.ghostGate){
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

  // if(props.tileChar === Tiles.pacman){
  //   return <PacMan/>
  // }

  // if(props.tileChar === Tiles.ghost1){
  //   return <Ghost type="ghost1"/>
  // }

  // if(props.tileChar === Tiles.ghost2){
  //   return <Ghost type="ghost2"/>
  // }

  // if(props.tileChar === Tiles.ghost3){
  //   return <Ghost type="ghost3"/>
  // }

  // if(props.tileChar === Tiles.ghost4){
  //   return <Ghost type="ghost4"/>
  // }

  return(
      <div style={tileStyle}>
        <small style={{fontSize: '12px', position: 'absolute', marginTop: '5px', marginLeft: '-5px', opacity: '0.5'}}>
          {props.index}
        </small>
      </div>
  )

}

export default React.memo(Tile)