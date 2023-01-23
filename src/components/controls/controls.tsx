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
    if (directions === 'right' && mazeState[pacmanState.index + 1].status !== Tiles.wall) {
      return true
    }

    if (directions === 'left' && mazeState[pacmanState.index - 1].status !== Tiles.wall) {
      return true
    }

    const topTile = mazeState[pacmanState.index - config.mazeColumns];
    if (directions === 'up' && topTile !== undefined && topTile.status !== Tiles.wall) {
      return true
    }

    const downTile = mazeState[pacmanState.index + config.mazeColumns];
    if (directions === 'down' && downTile !== undefined && downTile.status !== Tiles.wall) {
      return true
    }

    return false
  }

  const createNewMazeState = (directions: Directions, index: number): MazeStateType[] => {
    const newMazeState = [...mazeState];

    const actualTileValue: MazeStateType = {
      point: false,
      power: false,
      status: '_'
    }

    const nextTileValue: MazeStateType = {
      point: false,
      power: false,
      status: 'P'
    }

    newMazeState[index] = actualTileValue;

    if (directions === 'down') {
      newMazeState[index + config.mazeColumns] = nextTileValue;
    }

    if (directions === 'left') {
      newMazeState[index - 1] = nextTileValue;
    }

    if (directions === 'right') {
      newMazeState[index + 1] = nextTileValue;
    }

    if (directions === 'up') {
      newMazeState[index - config.mazeColumns] = nextTileValue;
    }

    return newMazeState
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

        setMazeState(createNewMazeState('right', pacmanState.index));
      }

      if (keyPressed === 'ArrowLeft' && canMove('left')) {
        setPacmanState({
          ...pacmanState,
          index: pacmanState.index - 1,
          direction: 'left',
          positionX: pacmanState.positionX - config.tileSizeInPx,
        });

        setMazeState(createNewMazeState('left', pacmanState.index));
      }

      if (keyPressed === 'ArrowDown' && canMove('down')) {
        setPacmanState({
          ...pacmanState,
          index: pacmanState.index + config.mazeColumns,
          direction: 'down',
          positionY: pacmanState.positionY + config.tileSizeInPx,
        });

        setMazeState(createNewMazeState('down', pacmanState.index));
      }

      if (keyPressed === 'ArrowUp' && canMove('up')) {
        setPacmanState({
          ...pacmanState,
          index: pacmanState.index - config.mazeColumns,
          direction: 'up',
          positionY: pacmanState.positionY - config.tileSizeInPx,
        });

        setMazeState(createNewMazeState('up', pacmanState.index));
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