import React, { ReactElement, useEffect, useState } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "./tile/tile";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../states/maze.state";
import PossibleTiles from "../types/possibleTiles";
import Controls from "../controls/controls";
import { Tiles } from "../../enums/tiles.enum";
import Pacman from "../pacman/pacman";



function Maze(): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [tileMap, setTileMap] = useState<JSX.Element[]>([]);

  const map = MazeMap.original;
  const mapFiltered = map.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  const mapChars = mapFiltered.split('') as PossibleTiles[];
  // const tileMap = mapChars.map((char: any, index) => Tile(char, index, mapFiltered));

  useEffect(() => {
    const tileMapState = mapChars.map((char: any, index) => <Tile key={index} index={index} tileChar={char} map={mapFiltered}></Tile>);
    setTileMap(tileMapState);

    const newMazeState: MazeStateType[] = mapChars.map(char => {
      return {
        point: char === Tiles.point,
        power: char === Tiles.power,
        status: char
      }
    });
    setMazeState(newMazeState);
  }, [])

  return (
    <>
      <Controls />
      {/* <Pacman index={1} /> */}
      <S.maze>
        {tileMap}
      </S.maze>
    </>
  )
}

export default Maze