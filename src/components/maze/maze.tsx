import React, { ReactElement, useEffect } from "react";
import MazeMap from "./mazeMap";
import S from "./styles";
import Tile from "./tile/tile";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../states/maze.state";
import PossibleTiles from "../types/possibleTiles";
import Controls from "../controls/controls";



function Maze(): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);

  const map = MazeMap.original;
  const mapFiltered = map.replace(/(\r\n|\n|\r)/gm, "").replaceAll(' ', '');
  const mapChars = mapFiltered.split('') as PossibleTiles[];
  const tileMap = mapChars.map((char: any, index)=> Tile(char, index, mapFiltered));

  useEffect(() => {
    const newMazeState: MazeStateType[] = mapChars.map(char => {
      return {
        point: char === '.',
        power: char === 'O',
        status: char
      }
    });
    setMazeState(newMazeState);
  }, [])
  
  function teste(){
    console.log(mazeState)
  }
  
  return(
    <>
    <Controls>
      <>
      <S.maze>
        {tileMap.map(item => item)}
      </S.maze>

      {/* <button onClick={teste}>STATOS</button> */}
      </>
    </Controls>
    </>
  )
}

export default Maze