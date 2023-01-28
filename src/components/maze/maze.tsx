import React, { ReactElement, useEffect, useState } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "../tile/tile";
import { useRecoilState } from 'recoil';
import PossibleTiles from "../../types/possibleTiles";
import PacmanControls from "../pacman-controls/pacman-controls";
import GameStart from "../../states/gameStart.state";
import Pacman from "../pacman/pacman";


function Maze(): ReactElement {
  const [gameStart, setStartGame] = useRecoilState(GameStart);
  const [tileMap, setTileMap] = useState<JSX.Element[]>([]);
  const [init, setInit] = useState(false);

  const filteredMap = MazeMap.filteredMap()
  const mapChars = filteredMap.split('') as PossibleTiles[];

  const startGame = () => {
    setStartGame(true)
  }

  
  //Seta o valor inicial do labirinto
  useEffect(() => {
    if(init === false){
      const tileMapState = mapChars.map((char: PossibleTiles, index) => <Tile key={index} index={index} tileChar={char} map={filteredMap}></Tile>);
      setTileMap(tileMapState);
    }
  }, [])

  return (
    <>
      { gameStart ? <PacmanControls/> : null}
      <button onClick={startGame}>start</button>
      <S.mazeWrapper>
        <Pacman/>
        <S.maze>
          {tileMap}
        </S.maze>
      </S.mazeWrapper>
    </>
  )
}

export default Maze