import React, { ReactElement } from "react"
import config from "../../config/config";
import PacMan from "../pacman/pacman";
import PossibleTiles from "../../types/possibleTiles";
import { Tiles } from "../../enums/tiles.enum";
import Ghost from "../ghosts/ghosts";
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import Directions from "../../types/directions";

type Props = {
  tileChar: PossibleTiles;
  index: number;
  map: string;
}

interface TileWrapperProps{
  adjacentsBorders: Directions[];
}

const TileWrapper = styled.div<TileWrapperProps>`
  position: relative;
  z-index: 1;
    ${p => p.adjacentsBorders.includes('down') && `
      &:before{
        width: 100%;
        height: 10px;
        display: block;
        content: '';
        margin-top: -10px;
        border-left: 2px solid blue;
        border-right: 2px solid blue;
        margin-left: -2px;
      }
    `}

    ${p => p.adjacentsBorders.includes('up') && `
      &:before{
        width: 100%;
        height: 10px;
        display: block;
        content: '';
        margin-top: 40px;
        border-left: 2px solid blue;
        border-right: 2px solid blue;
        margin-left: -2px;
      }
    `}

`

function Tile(props: Props): ReactElement{

  function generateTileStyle(mazeMap: string, mapColumns: number,index: number){
    const tile = mazeMap[index] as PossibleTiles;

    const rightTile = mazeMap[index + 1];
    const leftTile = mazeMap[index -1];
    const topTile = mazeMap[index - mapColumns];
    const bottomTile = mazeMap[index + mapColumns];
    const rightTopTile = mazeMap[index - mapColumns + 1];
    const leftTopTile = mazeMap[index - mapColumns - 1];
    const rightBottomTile = mazeMap[index + mapColumns + 1];
    const leftBottomTile = mazeMap[index + mapColumns - 1];



    let tileStyle: React.CSSProperties = {};
    let adjacentsBorders: Directions[] = [];

    if(tile === Tiles.wall || tile === Tiles.wallHorizontal){
      const borderStyle = '2px solid blue';

      tileStyle = {
        borderRadius: '20px',
        borderTop: borderStyle,
        borderRight: borderStyle,
        borderBottom: borderStyle,
        borderLeft: borderStyle,
        margin: '8px',
        // scale: '.5',
      };

      if(rightTile === Tiles.wall || rightTile === Tiles.wallHorizontal){
        tileStyle.borderRight = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderBottomRightRadius = '0';
        tileStyle.marginRight = '0'
      }

      if(leftTile === Tiles.wall || leftTile === Tiles.wallHorizontal){
        tileStyle.borderLeft = 'none'
        tileStyle.borderTopLeftRadius = '0';
        tileStyle.borderBottomLeftRadius = '0';
        tileStyle.marginLeft = '0';
      }

      if(topTile === Tiles.wall){
        tileStyle.borderTop = 'none'
        tileStyle.borderTopRightRadius = '0';
        tileStyle.borderTopLeftRadius = '0';
        tileStyle.marginTop= '0';
      }
    
      if(bottomTile === Tiles.wall){
        tileStyle.borderBottom = 'none'
        tileStyle.borderBottomRightRadius = '0';
        tileStyle.borderBottomLeftRadius = '0';
        tileStyle.marginBottom = '0';
      }

      if(tile === Tiles.wallHorizontal){
        tileStyle = {
          borderRadius: '0',
          borderTop: borderStyle,
          borderBottom: borderStyle,
          borderRight: 'none',
          borderLeft: 'none',
          marginTop: '8px',
          marginBottom: '8px',
        }
      }

      if(tile === Tiles.wall && 
          rightTopTile === Tiles.wall && leftTopTile === Tiles.wall &&
          leftBottomTile !== Tiles.wall && rightBottomTile !== Tiles.wall &&
          rightTile !== Tiles.wall && leftTile !== Tiles.wall
      ){
        adjacentsBorders.push('down');
      }

      if(tile === Tiles.wall && 
        rightTopTile !== Tiles.wall && leftTopTile !== Tiles.wall &&
        leftBottomTile === Tiles.wall && rightBottomTile === Tiles.wall &&
        rightTile !== Tiles.wall && leftTile !== Tiles.wall
      ){
        adjacentsBorders.push('up');
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
        transition: 'all',
        transitionDelay: config.pacmanSpeed+'s',
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
        transition: 'all',
        transitionDelay: config.pacmanSpeed+'s',
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

    return {tileStyle, adjacentsBorders}
  }
  
  const style = generateTileStyle(props.map, config.mazeColumns, props.index);

  return(
      <TileWrapper adjacentsBorders={style.adjacentsBorders} style={style.tileStyle}>
        {/* <small style={{fontSize: '12px', position: 'absolute', marginTop: '5px', marginLeft: '-5px', opacity: '0.5'}}>
          {props.index}
        </small> */}
      </TileWrapper>
  )

}

export default React.memo(Tile)