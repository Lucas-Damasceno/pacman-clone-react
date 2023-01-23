import React, { ReactComponentElement, ReactElement } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "./tile/tile";


function Maze(): ReactElement {
  const map = MazeMap.original;
  let mapFiltered = map.replace(/(\r\n|\n|\r)/gm, "");
  mapFiltered = mapFiltered.replaceAll(' ', '');
  const mapChars = mapFiltered.split('');
  const tileMap = mapChars.map((char: any, index)=> Tile(char, index, mapFiltered));

  return <>
    <S.maze>
      {tileMap.map(item => item)}
    </S.maze>
  </>
}

export default Maze