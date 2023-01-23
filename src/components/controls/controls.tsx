import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import PacmanState from "../../states/pacman.state";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../states/maze.state";
import Directions from "../types/directions";
import { Tiles } from "../../enums/tiles.enum";
import config from "../../config/config";

interface Props {
  children: ReactElement
}

function Controls(props: Props) {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);


  const canMove = (directions: Directions): boolean => {
    console.log(mazeState[pacmanState.index + 1])
    if(directions === 'right' && mazeState[pacmanState.index + 1].status !== Tiles.wall){
      return true
    }

    if(directions === 'left' && mazeState[pacmanState.index - 1].status !== Tiles.wall){
      return true
    }

    const topTile = mazeState[pacmanState.index - config.mazeColumns];
    if(directions === 'up' && topTile !== undefined && topTile.status !== Tiles.wall){
      return true
    }

    const downTile = mazeState[pacmanState.index + config.mazeColumns];
    if(directions === 'down' && downTile !== undefined && downTile.status !== Tiles.wall){
      return true
    }

    
    return false
  }

  const returnTilesValue = (): MazeStateType[] => {
    const newMazeState = [...mazeState];

        let actualTileValue: MazeStateType = {
          point: false,
          power: false,
          status: '_'
        }
        
        let nextTileValue: MazeStateType = {
          point: false,
          power: false,
          status: 'P'
        }

        if(){
          
        }
        newMazeState[pacmanState.index] = actualTileValue;
        newMazeState[pacmanState.index + 1] = nextTileValue;
    return []
  }

  const _handleKeyDown = (event: KeyboardEvent) => {
    const move = (keyPressed: string) => {
      if (keyPressed === 'ArrowRight' && canMove('right')) {
        setPacmanState({
          ...pacmanState,
          index: pacmanState.index + 1,
          direction: 'right',
          positionX: pacmanState.positionX + config.tileSizeInPx,
        });

        const newMazeState = [...mazeState];

        let actualTileValue: MazeStateType = {
          point: false,
          power: false,
          status: '_'
        }
        newMazeState[pacmanState.index] = actualTileValue;

        let nextTileValue: MazeStateType = {
          point: false,
          power: false,
          status: 'P'
        }
        newMazeState[pacmanState.index + 1] = nextTileValue;

        setMazeState(newMazeState);
      }

      if (keyPressed === 'ArrowLeft' && canMove('left')) {
        setPacmanState({
          ...pacmanState,
          direction: 'left',
          positionX: pacmanState.positionX - config.tileSizeInPx,
        });
      }

      if (keyPressed === 'ArrowDown' && canMove('down')) {
        console.log('Ta aqui')
        setPacmanState({
          ...pacmanState,
          direction: 'down',
          positionY: pacmanState.positionY + config.tileSizeInPx,
        });
      }

      if (keyPressed === 'ArrowUp' && canMove('up')) {
        setPacmanState({
          ...pacmanState,
          direction: 'up',
          positionY: pacmanState.positionY - config.tileSizeInPx,
        });
      }
    }

    const keyPressed = event.key as any;

    move(keyPressed);
  }

  useEffect(() => {    
    window.addEventListener('keydown', _handleKeyDown);

    return () => {
      window.removeEventListener('keydown', _handleKeyDown)
    }
  }, [mazeState, pacmanState])

  return (
    <>
      {props.children}
    </>
  )
}

export default Controls