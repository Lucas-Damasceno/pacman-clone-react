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


function Maze(): ReactElement {
  const [gameStart, setStartGame] = useRecoilState(GameStart);
  const [tileMap, setTileMap] = useState<JSX.Element[]>([]);
  const fullMazeState = useRecoilValue(FullMazeState);

  const filteredMap = MazeMap.filteredMap()
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
          { gameStart ? <PacmanControls/> : null}
          <button onClick={startGame}>start</button>
        </div>
        <S.mazeWrapper>
          <Pacman/>
          <Ghosts type="1"/>
          <Ghosts type="2"/>
          <Ghosts type="4"/>
          <Ghosts type="3"/>
          <S.maze>
            {tileMap}
          </S.maze>
        </S.mazeWrapper>
      </S.gameWrapper>
    </>
  )
}

export default Maze