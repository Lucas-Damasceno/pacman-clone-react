import React, { ReactElement, useEffect, useState } from "react";
import PacmanState from "../../states/pacman.state";
import { useRecoilState } from 'recoil';
import MazeState, { MazeStateType } from "../../states/maze.state";
import Directions from "../../types/directions";
import { Tiles } from "../../enums/tiles.enum";
import config from "../../config/config";
import { Direction } from "../../enums/direction.enum";
import MovingState from "../../states/moving.state";

interface Props {
  children?: ReactElement
}

function Controls(props: Props) {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  const [moving, setMoving] = useState(false);
  const [nextDirection, setNextDirection] = useState<Directions>('left');

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

  const canMove = (directions: Directions): boolean => {
    if (directions === 'right' && mazeState[pacmanState.index + 1].status !== Tiles.wall) {
      return true
    }

    if(mazeState[pacmanState.index - 1]?.status === undefined){
      return false
    }
    if (directions === 'left' && mazeState[pacmanState.index - 1].status !== Tiles.wall) {
      return true
    }

    const topTile = mazeState[pacmanState.index - config.mazeColumns];
    if (directions === 'up' && topTile !== undefined && topTile.status !== Tiles.wall && topTile.status !== Tiles.ghostGate) {
      return true
    }

    const downTile = mazeState[pacmanState.index + config.mazeColumns];
    if (directions === 'down' && downTile !== undefined && downTile.status !== Tiles.wall && downTile.status !== Tiles.ghostGate) {
      return true
    }

    return false
  }

  const autoMove = () => {
    const timeOutSpeed = config.pacmanSpeed * 1000;

    if(moving === false){
      return
    }

    const timer = setTimeout(() => {  
      // const moved = move(Direction[pacmanState.direction]);
      const moved = move(Direction[nextDirection]) || move(Direction[pacmanState.direction]);

      setMoving(moved);
      
    }, timeOutSpeed)

    return () =>{
      clearTimeout(timer)
    }
  }

  const handleMove = (keyPressed: string) => {
    if(moving === false){
      setMoving(true)
      const moved = move(keyPressed);
    }

    if(keyPressed === 'ArrowUp') setNextDirection('up');
    if(keyPressed === 'ArrowDown') setNextDirection('down');
    if(keyPressed === 'ArrowRight') setNextDirection('right');
    if(keyPressed === 'ArrowLeft') setNextDirection('left');
  }

  const move = (keyPressed: string): boolean => {
    if (keyPressed === 'ArrowRight' && canMove('right')) {
      setPacmanState({
        ...pacmanState,
        index: pacmanState.index + 1,
        direction: 'right',
        positionX: pacmanState.positionX + config.tileSizeInPx,
      });

      setMazeState(createNewMazeState('right', pacmanState.index));
      return true
    }

    if (keyPressed === 'ArrowLeft' && canMove('left')) {
      setPacmanState({
        ...pacmanState,
        index: pacmanState.index - 1,
        direction: 'left',
        positionX: pacmanState.positionX - config.tileSizeInPx,
      });

      setMazeState(createNewMazeState('left', pacmanState.index));
      return true
    }

    if (keyPressed === 'ArrowDown' && canMove('down')) {
      setPacmanState({
        ...pacmanState,
        index: pacmanState.index + config.mazeColumns,
        direction: 'down',
        positionY: pacmanState.positionY + config.tileSizeInPx,
      });

      setMazeState(createNewMazeState('down', pacmanState.index));
      return true
    }

    if (keyPressed === 'ArrowUp' && canMove('up')) {
      setPacmanState({
        ...pacmanState,
        index: pacmanState.index - config.mazeColumns,
        direction: 'up',
        positionY: pacmanState.positionY - config.tileSizeInPx,
      });

      setMazeState(createNewMazeState('up', pacmanState.index));
      return true
    }

    return false
  }

  const _handleKeyDown = (event: KeyboardEvent) => {
    const keyPressed = event.key as any;
    handleMove(keyPressed);
  }

  useEffect(() => {
    window.addEventListener('keydown', _handleKeyDown);

    return () => {
      window.removeEventListener('keydown', _handleKeyDown)
    }
  }, [mazeState, moving])


  useEffect(() => {
    return autoMove()
  }, [mazeState, nextDirection, moving])


  //Controla o sumiço dos pontos
  useEffect(() => {
    mazeState.forEach((tile, index) => {
      if(tile.status === Tiles.withoutPoint){
        document.documentElement.style.setProperty(`${config.pointCssVar}${index}`, '0');
      }
    })
  }, [mazeState])

  return (
    <>
    </>
  )
}

export default Controls