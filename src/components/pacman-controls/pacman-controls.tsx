import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import FullMazeState, { FullMazeStateType } from "../../states/fullMaze.state";
import GameStart from "../../states/gameStart.state";
import Ghost1State, { Ghost2State, Ghost3State, Ghost4State } from "../../states/ghosts.state";
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
  const [fullMazeState, setFullMazeState] = useRecoilState(FullMazeState);


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
    const canMoveToTile = !blockableTiles.includes(tileToMove.status);

    return canMoveToTile
  }

  const isTeleporting = (index: number) => {
    const teleports = ['<', '>'];
    const actualTile = mazeState[index];
    if(teleports.includes(actualTile.originalTile)){
      return true
    }

    return false
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

  //Refatorar essa função
  const directionOrNewDirection = (characterType: CharacterType, direction: Directions, newDirection: Directions | null, tileIndex: number, mazeState: MazeStateType[]) => {
    if(characterType === 'pacman'){
      console.log(direction, newDirection)
    }
    if(newDirection !== null){
      const canMovenewDirection: boolean = canMove(characterType, newDirection, tileIndex, mazeState);
      if(canMovenewDirection){
        return {
          use: 'newDirection',
          direction: newDirection,
          canMove: canMovenewDirection
        }
      }
    }

    const canMoveDirection: boolean = canMove(characterType, direction, tileIndex, mazeState);
    return {
      use: 'direction',
      direction: direction,
      canMove: canMoveDirection
    }
  }

  const createNextMazeState = (fullMazeState: FullMazeStateType) => {
    const newMazeState = {...fullMazeState};

    fullMazeState.charactersState.forEach(character => {
      
      const choosedDirection = directionOrNewDirection(character.type, character.direction, character.nextDirection, character.index, fullMazeState.mazeState);

      if (choosedDirection.canMove === false) return

      //Novo estado do tile que ele estava
      if(characterType === 'pacman'){
        newMazeState[character.tileIndex] = {
          ...newMazeState[character.tileIndex],
          point: false,
          power: false,
          status: '_'
        }
      }

      if(characterType === 'ghost'){
        newMazeState[character.tileIndex] = {
          ...newMazeState[character.tileIndex],
          status: '_',
        }

        const state = newMazeState[character.tileIndex];
        state.status = state.point ? state.status = '.' : '_';
        state.status = state.power ? state.status = 'O' : '_';
      }

      const moveToIndex: IndexObject<Directions, number> = {
        up: character.tileIndex - config.mazeColumns,
        down: character.tileIndex + config.mazeColumns,
        left: character.tileIndex - 1,
        right: character.tileIndex + 1
      }

      const movedToTileIndex = moveToIndex[choosedDirection.direction];

      if(characterType === 'pacman') {
        newMazeState[movedToTileIndex] = {
          ...newMazeState[character.tileIndex],
          point: false,
          power: false,
          status: character.char
        }
      }
      
      if(characterType === 'ghost') {
        newMazeState[movedToTileIndex] = {
          ...newMazeState[movedToTileIndex],
          status: character.char
        }
      }

    })
    return newMazeState
  }

  const handleGameTick = () => {
    setMazeState(currentValue => createNextMazeState(currentValue));
  }

  //gameTick
  useEffect(function gameTick() {
    const timeOutSpeed = config.pacmanSpeed * 1000;
    const timer = setInterval(() => {
      handleGameTick();
    }, timeOutSpeed)

    return () => clearInterval(timer)
  }, [fullMazeState]);

  //control point visibility
  useEffect(function setTilePointToHidden() {
    fullMazeState.mazeState.forEach((tile, index) => {
      if (tile.point === false && (tile.status.includes(Tiles.withoutPoint))) {
        document.documentElement.style.setProperty(`${config.pointCssVar}${index}`, '0');
      }
    })
  }, [fullMazeState])

  return <></>
}

export default PacmanControls