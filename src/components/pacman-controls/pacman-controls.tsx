import React, { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useRecoilState } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import Ghost1State, { Ghost2State, Ghost3State, Ghost4State } from "../../states/ghosts.state";
import MazeState, { MazeStateType } from "../../states/maze.state";
import PacmanState from "../../states/pacman.state";
import { CharacterStateType } from "../../types/characterStateType";
import { CharacterType } from "../../types/characterType";
import Directions from "../../types/directions";
import { IndexObject } from "../../types/indexObject";
import PossibleTiles, { CharacterChar } from "../../types/possibleTiles";
import MazeMap from "../maze/mazeMap";

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];
type CharacterStateSetter = Dispatch<SetStateAction<CharacterStateType>>;

function PacmanControls(): ReactElement {
  const [mazeState, setMazeState] = useRecoilState(MazeState);
  const [pacmanState, setPacmanState] = useRecoilState(PacmanState);
  const [ghost1State, setGhost1State] = useRecoilState(Ghost1State);
  const [ghost2State, setGhost2State] = useRecoilState(Ghost2State);
  const [ghost3State, setGhost3State] = useRecoilState(Ghost3State);
  const [ghost4State, setGhost4State] = useRecoilState(Ghost4State);


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

    //For tests purposes
    handleMovement(direction, 'P');
  }

  const getAdjacentTiles = (index: number) => {
    const adjacentTiles: IndexObject<Directions, MazeStateType> = {
      up: mazeState[index - config.mazeColumns],
      right: mazeState[index + 1],
      down: mazeState[index + config.mazeColumns],
      left: mazeState[index - 1]
    }

    return adjacentTiles
  }

  const canMove = (direction: Directions, characterIndex: number) => {
    const blockableTiles: PossibleTiles[] = [Tiles.wall, Tiles.ghostGate];

    const tileToMove = getAdjacentTiles(characterIndex)[direction];

    // const ghosts = ['1','2','3','4'];
    // const nextTileIsGhost = ghosts.includes(tileToMove.status);

    // if(nextTileIsGhost && character === 'pacman'){
    //   pacmanEncounterWithGhost();
    // }

    const canMoveToTile = !blockableTiles.includes(tileToMove.status);

    return canMoveToTile
  }

  const move = (direction: Directions, character: CharacterChar, setCharacterState: CharacterStateSetter) => {
    let characterState: CharacterStateType;
    setCharacterState(currentState => {
      characterState = currentState;

      let positionX = currentState.positionX;
      let positionY = currentState.positionY;
      const tileSize = config.tileSizeInPx;

      const calculateX = {
        right: positionX + tileSize,
        left: positionX - tileSize
      }

      const calculateY = {
        up: positionY + tileSize,
        down: positionY - tileSize,
      }

      if(direction === 'right' || direction === 'left'){
        positionX = calculateX[direction]
      }else{
        positionY = calculateY[direction]
      }
      
  
      return {
        ...currentState,
        direction: direction,
        positionX: positionX,
        positionY: positionY,
        moving: true,
      }
    });

    // setMazeState(currentMazeState => {
    //   const charIndex = currentMazeState.findIndex(mazeTile => mazeTile.status === character);
    //   console.log(charIndex)
    //   return [
    //     ...currentMazeState
    //   ]
    // })
  }

  const pacmanEncounterWithGhost = () => {

  }

  const handleMovement = (direction: Directions, characterType: CharacterChar) => {
    const characterMazeIndex: IndexObject<CharacterChar, number> = {
      'P': mazeState.findIndex(item => item.status === 'P'),
      '1': mazeState.findIndex(item => item.status === '1'),
      '2': mazeState.findIndex(item => item.status === '2'),
      '3': mazeState.findIndex(item => item.status === '3'),
      '4': mazeState.findIndex(item => item.status === '4'),
    }

    const character: CharacterType = (characterType === 'P' ? 'pacman' : 'ghost');

    const characterIndex = characterMazeIndex[characterType];
    const characterCanMove = canMove(direction, characterIndex);

    if (characterCanMove) {
      const stateIndexObject = {
        'P': setPacmanState,
        '1': setGhost1State,
        '2': setGhost2State,
        '3': setGhost3State,
        '4': setGhost4State,
      }

      move(direction, characterType, stateIndexObject[characterType])
    }
    // const directions: {[Key in Directions]: () => boolean} = {
    //   up: () => canMove(direction, characterType, ),
    //   right: () => canMove,
    //   down:() => canMove,
    //   left:() => canMove,
    // }
  }

  // //Controla o mazeState
  // useEffect(() => {

  // }, [pacmanState, ghost1State, ghost2State, ghost3State, ghost4State])

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