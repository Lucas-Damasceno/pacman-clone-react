import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
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

/* Refatorar depois */
const validButtons = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'] as const;
type ValidButtons = typeof validButtons[number];
type CharacterStateSetter = Dispatch<SetStateAction<CharacterStateType>>;

type CharacterMazeIndex = {
  char: CharacterChar;
  direction: Directions;
  newDirection: Directions | null;
  state: CharacterStateSetter;
  tileIndex: number
}

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

    // const newDirection: Directions = keyPressedToDirection[keyPressed];

    setPacmanState(currentState => {
      let newDirection: Directions = keyPressedToDirection[keyPressed];

      return {
        ...currentState,
        nextDirection: newDirection
      }
    })
  }

  const getAdjacentTiles = (index: number, newMazeState: MazeStateType[]) => {
    const adjacentTiles: IndexObject<Directions, MazeStateType> = {
      up: newMazeState[index - config.mazeColumns],
      right: newMazeState[index + 1],
      down: newMazeState[index + config.mazeColumns],
      left: newMazeState[index - 1]
    }

    return adjacentTiles
  }

  const canMove = (charType: CharacterType, direction: Directions, characterIndex: number, newMazeState: MazeStateType[]) => {
    const blockableTilesFor: IndexObject<CharacterType, PossibleTiles[]> = {
      ghost: [Tiles.wall, Tiles.ghost1, Tiles.ghost2, Tiles.ghost3, Tiles.ghost4],
      pacman: [Tiles.wall, Tiles.ghostGate],
    }

    let blockableTiles: PossibleTiles[] = [];
    if (charType === 'ghost') {
      blockableTiles = blockableTilesFor.ghost
    }

    if (charType === 'pacman') {
      blockableTiles = blockableTilesFor.pacman
    }

    if (characterIndex === -1) return false

    const tileToMove = getAdjacentTiles(characterIndex, newMazeState)[direction];
    // if(tileToMove === false) return false
    const canMoveToTile = !blockableTiles.includes(tileToMove.status);

    return canMoveToTile
  }

  const move = (direction: Directions, setCharacterState: CharacterStateSetter) => {
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
        up: positionY - tileSize,
        down: positionY + tileSize,
      }

      if (direction === 'right' || direction === 'left') {
        positionX = calculateX[direction]
      } else {
        positionY = calculateY[direction]
      }

      return {
        ...currentState,
        direction: direction,
        positionX: positionX,
        positionY: positionY,
        // moving: true,
      }
    });
  }

  const pacmanEncounterWithGhost = () => {

  }

  const convertCharacterCharToType = (char: CharacterChar): CharacterType => {
    const convert: IndexObject<CharacterChar, CharacterType> = {
      P: 'pacman',
      "1": 'ghost',
      "2": 'ghost',
      "3": 'ghost',
      "4": 'ghost'
    }

    return convert[char]
  }

  const createNextMazeState = (mazeState: MazeStateType[]) => {
    const newMazeState = [...mazeState];
    const charactersMazeIndex: CharacterMazeIndex[] = [
      { char: 'P', direction: pacmanState.direction, newDirection: pacmanState.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === 'P'), state: setPacmanState },
      { char: '1', direction: ghost1State.direction, newDirection: ghost1State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '1'), state: setGhost1State },
      { char: '2', direction: ghost2State.direction, newDirection: ghost2State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '2'), state: setGhost2State },
      { char: '3', direction: ghost3State.direction, newDirection: ghost3State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '3'), state: setGhost3State },
      { char: '4', direction: ghost4State.direction, newDirection: ghost4State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '4'), state: setGhost4State },
    ];

    charactersMazeIndex.forEach(character => {
      const characterType = convertCharacterCharToType(character.char);

      let charCanMoveNewDirection: boolean = false;
      if(character.newDirection){
        charCanMoveNewDirection = canMove(characterType, character.newDirection, character.tileIndex, newMazeState);
      }

      const charCanMove = canMove(characterType, character.direction, character.tileIndex, newMazeState);

      const canMoveToDirection = (charCanMoveNewDirection || charCanMove);

      if (canMoveToDirection === false) return


      //Novo estado do tile que ele estava
      newMazeState[character.tileIndex] = {
        point: false,
        power: false,
        status: '_'
      }

      const moveToIndex: IndexObject<Directions, number> = {
        up: character.tileIndex - config.mazeColumns,
        down: character.tileIndex + config.mazeColumns,
        left: character.tileIndex - 1,
        right: character.tileIndex + 1
      }

      const movedToTileIndex = charCanMoveNewDirection ? moveToIndex[character.newDirection as Directions] : moveToIndex[character.direction];

      newMazeState[movedToTileIndex] = {
        point: false,
        power: false,
        status: character.char
      }

    })
    return newMazeState
  }

  const handleGameTick = () => {
    setMazeState(currentValue => createNextMazeState(currentValue));
  }

  const handlePacmanMove = () => {
    const stateIndexObject = {
      'P': setPacmanState,
      '1': setGhost1State,
      '2': setGhost2State,
      '3': setGhost3State,
      '4': setGhost4State,
    }

    const charactersMazeIndex: CharacterMazeIndex[] = [
      { char: 'P', direction: pacmanState.direction, newDirection: pacmanState.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === 'P'), state: setPacmanState },
      { char: '1', direction: ghost1State.direction, newDirection: ghost1State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '1'), state: setGhost1State },
      { char: '2', direction: ghost2State.direction, newDirection: ghost2State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '2'), state: setGhost2State },
      { char: '3', direction: ghost3State.direction, newDirection: ghost3State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '3'), state: setGhost3State },
      { char: '4', direction: ghost4State.direction, newDirection: ghost4State.nextDirection, tileIndex: mazeState.findIndex(tile => tile.status === '4'), state: setGhost4State },
    ];

    charactersMazeIndex.forEach(character => {
      const charType = convertCharacterCharToType(character.char)
      const canBeMoved = canMove(charType, character.direction, character.tileIndex, mazeState);

      let canBeNew = !!character.newDirection
      let canBeMovedNew = false;
      if(canBeNew){
        canBeMovedNew = canMove(charType, character.newDirection as Directions, character.tileIndex, mazeState);
      }

      if (canBeMovedNew) {
        move(character.newDirection as Directions, stateIndexObject[character.char])
      }else if(canBeMoved){
        if(canBeMoved) move(character.direction, stateIndexObject[character.char]);
      }

      // add stop animation
      if (character.char === 'P') {
        setPacmanState(currentState => {
          return {
            ...currentState,
            moving: canBeMoved
          }
        })
      }

    })
  }

  function randomDirection(): Directions {
    const possibleDirections: Directions[] = ['up', 'down', 'left', 'right'];
    return possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
  }

  //addEventListener KeyDown
  useEffect(function addEventListenerKeyDown() {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mazeState])

  //gameTick
  useEffect(function gameTick() {
    const timeOutSpeed = config.pacmanSpeed * 1000;
    const timer = setInterval(() => {

      handleGameTick();

    }, timeOutSpeed)

    return () => {
      clearInterval(timer)
    }
  }, [mazeState]);

  //characters Update
  useEffect(function characterMove() {
    handlePacmanMove();
  }, [mazeState]);

  //control point visibility
  useEffect(function setTilePointToHidden() {
    mazeState.forEach((tile, index) => {
      if (tile.point === false && (tile.status === Tiles.withoutPoint || tile.status === Tiles.pacman)) {
        document.documentElement.style.setProperty(`${config.pointCssVar}${index}`, '0');
      }
    })
  }, [mazeState])

  return <></>
}

export default PacmanControls