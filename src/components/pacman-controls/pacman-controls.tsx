import React, { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import MazeState from "../../states/maze.state";
import PacmanState from "../../states/pacman.state";
import { CharacterStateType } from "../../types/characterStateType";
import { CharacterType } from "../../types/characterType";
import Directions from "../../types/directions";
import MazeMap from "../maze/mazeMap";

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];

type CharacterStateSetter = Dispatch<SetStateAction<CharacterStateType>>;

type IndexObject<T extends string | number | symbol, K> = {[Key in T]: K}

function PacmanControls (): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);

  const handleKeyDown = (event: KeyboardEvent) => {
    /*Checagem se a tecla apertada é valida */
    const invalidKey = !validButtons.includes(event.key as any);
    if(invalidKey) return;
    
    const keyPressed = event.key as ValidButtons;

    const keyPressedToDirection: IndexObject<ValidButtons, Directions> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }
    
    handleMovement(keyPressed, 'pacman', setPacmanState);
  }

  const canMove = (direction: Directions, characterIndex: number) => {
    const topTile = mazeState[characterIndex - config.mazeColumns];
    const bottomTile = mazeState[characterIndex + config.mazeColumns];

    const validation: {[Key in Directions]: boolean} = {
      right: mazeState[characterIndex].status !== Tiles.wall,
      left: mazeState[characterIndex].status !== Tiles.wall,
      up: topTile !== undefined && topTile.status !== Tiles.wall && topTile.status !== Tiles.ghostGate,
      down: bottomTile !== undefined && bottomTile.status !== Tiles.wall && bottomTile.status !== Tiles.ghostGate,
    }

    return validation[direction];
  }

  const move = (characterState: CharacterStateSetter, direction: Directions) => {
    
  }

  const handleMovement = (keyPressed: ValidButtons, characterType: CharacterType, characterState: CharacterStateSetter) => {
    
    
    const directions: {[Key in Directions]: () => boolean} = {
      up: () => canMove(),
      right: () => canMove,
      down:() => canMove,
      left:() => canMove,
    }
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