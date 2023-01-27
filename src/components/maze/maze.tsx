import React, { ReactElement, useEffect, useState } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "../tile/tile";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../states/maze.state";
import PossibleTiles from "../../types/possibleTiles";
import Controls from "../controls/controls";
import { Tiles } from "../../enums/tiles.enum";
import GhostControls from "../ghost-controls/ghost-controls";
import PacmanControls from "../pacman-controls/pacman-controls";
import GameStart from "../../states/gameStart.state";


function Maze(): ReactElement {
  const [gameStart, setStartGame] = useRecoilState(GameStart);
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [tileMap, setTileMap] = useState<JSX.Element[]>([]);

  const filteredMap = MazeMap.filteredMap()

  const mapChars = filteredMap.split('') as PossibleTiles[];

  const startGame = () => {
    setStartGame(true)
  }

  //Seta o valor inicial do labirinto
  useEffect(() => {
    const tileMapState = mapChars.map((char: any, index) => <Tile key={index} index={index} tileChar={char} map={filteredMap}></Tile>);
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
      {/* <Controls/> */}
      <PacmanControls />
      <GhostControls/>
      {/* <button onClick={startGame}>start</button> */}
      <S.maze>
        {tileMap}
      </S.maze>
    </>
  )
}

export default Maze