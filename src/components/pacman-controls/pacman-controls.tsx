import React, { ReactElement, useEffect } from "react";
import { useRecoilState } from 'recoil';
import MazeState from "../../states/maze.state";
import PacmanState from "../../states/pacman.state";
import Directions from "../../types/directions";
import MazeMap from "../maze/mazeMap";

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];


function PacmanControls (): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);

  const handleKeyDown = (event: KeyboardEvent) => {
    /*Checagem se a tecla apertada é valida */
    const invalidKey = !validButtons.includes(event.key as any);
    if(invalidKey) return;
    
    const keyPressed = event.key as ValidButtons;
    handleMovement(keyPressed);
  }

  const canMove = (direction: Directions, characterIndex: number) => {
    const map = MazeMap.filteredMap();


  }

  const move = () => {
    
  }

  const handleMovement = (keyPressed: ValidButtons) => {
    setPacmanState((cur) => {
      return {
        ...cur,
        moving: true
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mazeState])

  useEffect(() => {
    setPacmanState({
      ...pacmanState,
      nextDirection: 'right'
    })
  }, [])

  return <></>
}

export default PacmanControls