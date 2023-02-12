import React, { ReactElement, useEffect, useState } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "../tile/tile";
import { useRecoilState, useRecoilValue } from 'recoil';
import PossibleTiles from "../../types/possibleTiles";
import PacmanControls from "../pacman-controls/pacman-controls";
import GameStart from "../../states/gameStart.state";
import Pacman from "../pacman/pacman";
import Ghosts from "../ghosts/ghosts";
import FullMazeState from "../../states/fullMaze.state";
import GameOver from "../game-over/game-over";
import GameTick from "../game-tick/game-tick";
import config from "../../config/config";


function Maze(): ReactElement {
  const [gameStart, setStartGame] = useRecoilState(GameStart);
  const [tileMap, setTileMap] = useState<JSX.Element[]>([]);
  const fullMazeState = useRecoilValue(FullMazeState);

  const filteredMap = MazeMap.filteredMap;
  const mapChars = filteredMap.split('') as PossibleTiles[];

  const startGame = () => {
    setStartGame(true)
  }
  
  //Seta o valor inicial do labirinto
  useEffect(() => {
      const tileMapState = mapChars.map((char: PossibleTiles, index) => <Tile key={index} index={index} tileChar={char} map={filteredMap}></Tile>);
      setTileMap(tileMapState);
  }, [])

  return (
    <>
      {fullMazeState.gameOver ? <GameOver></GameOver> : null}
      <S.gameWrapper>
        <div>
          {fullMazeState.score}
          <br/>
          {/* { gameStart ? <PacmanControls/> : null} */}
          {gameStart ? <GameTick/> : null}
          <button onClick={startGame}>start</button>
        </div>
        <S.mazeWrapper>
          <Pacman/>
          <Ghosts ghostName="blinky"/>
          <Ghosts ghostName="clyde"/>
          <Ghosts ghostName="inky"/>
          <Ghosts ghostName="pinky"/>
          <S.maze>
            {tileMap}
          </S.maze>
        </S.mazeWrapper>
      </S.gameWrapper>
    </>
  )
}

export default Maze