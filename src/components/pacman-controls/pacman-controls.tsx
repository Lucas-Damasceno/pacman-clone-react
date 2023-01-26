import React, { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import MazeState, { MazeStateType } from "../../states/maze.state";
import PacmanState from "../../states/pacman.state";
import { CharacterStateType } from "../../types/characterStateType";
import { CharacterType } from "../../types/characterType";
import Directions from "../../types/directions";
import PossibleTiles from "../../types/possibleTiles";
import MazeMap from "../maze/mazeMap";

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];
type CharacterStateSetter = Dispatch<SetStateAction<CharacterStateType>>;
type IndexObject<T extends string | number | symbol, K> = { [Key in T]: K }

function PacmanControls(): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);

  const handleKeyDown = (event: KeyboardEvent) => {
    /*Checagem se a tecla apertada é valida */
    const invalidKey = !validButtons.includes(event.key as any);
    if (invalidKey) return;

    const keyPressed = event.key as ValidButtons;

    const keyPressedToDirection: IndexObject<ValidButtons, Directions> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }

    const direction: Directions = keyPressedToDirection[keyPressed];

    handleMovement(direction, 'pacman', setPacmanState);
  }

  const canMove = (direction: Directions, characterIndex: number) => {

    const adjacentTiles: IndexObject<Directions, MazeStateType> = {
      up: mazeState[characterIndex - config.mazeColumns],
      right: mazeState[characterIndex + 1],
      down: mazeState[characterIndex + config.mazeColumns],
      left: mazeState[characterIndex - 1]
    }

    const blockableTiles: PossibleTiles[] = [Tiles.wall, Tiles.ghostGate];

    const tileToMove = adjacentTiles[direction];

    return blockableTiles.includes(tileToMove.status)
  }


  const move = (characterState: CharacterStateSetter, direction: Directions) => {

  }

  const handleMovement = (direction: Directions, characterType: CharacterType, characterState: CharacterStateSetter) => {


    // const directions: {[Key in Directions]: () => boolean} = {
    //   up: () => canMove(),
    //   right: () => canMove,
    //   down:() => canMove,
    //   left:() => canMove,
    // }
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