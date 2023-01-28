import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { noWait, useRecoilState } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import FullMazeState, { FullMazeStateType, MazeStateType } from "../../states/fullMaze.state";
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
  const [lastTime, setLastTime] = useState(0);

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
    const canMoveToTile = !tileToMove.status.find(char => blockableTiles.includes(char));

    return canMoveToTile
  }

  const isTeleporting = (index: number) => {
    const teleports = ['<', '>'];
    const actualTile = fullMazeState.mazeState[index];
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
    // if(characterType === 'pacman'){
    //   console.log(direction, newDirection)
    // }
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

  const includesIfNotInArray = (tileStatus: PossibleTiles[], item: PossibleTiles) => {
    if(tileStatus.includes(item)){
      return tileStatus
    }else{
      return [...tileStatus, item]
    }
  }

  const createNextMazeState = (fullMazeState: FullMazeStateType) => {
    const newMazeState = {...fullMazeState.mazeState};
    const newCharacterState: CharacterStateType[] = [];

    fullMazeState.charactersState.forEach(character => {
      const choosedDirection = directionOrNewDirection(character.type, character.direction, character.nextDirection, character.index, fullMazeState.mazeState);

      if (choosedDirection.canMove === false) {
        newCharacterState.push({
          ...character,
          moving: false,
        })
        return
      }         

      //Novo estado do tile que ele estava
      const mazeStateIndex = newMazeState[character.index]

      if(character.type === 'pacman'){
        newMazeState[character.index] = {
          ...mazeStateIndex,
          point: false,
          power: false,
          status: mazeStateIndex.status.filter(char => char !== Tiles.pacman)
        }
      }

      if(character.type === 'ghost'){
        newMazeState[character.index] = {
          ...newMazeState[character.index],
          status: mazeStateIndex.status.filter(char => {
            const ghosts = ['1', '2', '3', '4'];
            return !ghosts.includes(char)
          })
        }
      }


      const moveToIndex: IndexObject<Directions, number> = {
        up: character.index - config.mazeColumns,
        down: character.index + config.mazeColumns,
        left: character.index - 1,
        right: character.index + 1
      }

      const movedToTileIndex = moveToIndex[choosedDirection.direction];

      const nexTileIndex = fullMazeState.mazeState[movedToTileIndex];

      if(character.type === 'pacman') {
        newMazeState[movedToTileIndex] = {
          ...nexTileIndex,
          point: false,
          power: false,
          status: includesIfNotInArray(nexTileIndex.status, character.identification)
        }
      }
      
      if(character.type === 'ghost') {
        newMazeState[movedToTileIndex] = {
          ...nexTileIndex,
          status: includesIfNotInArray(nexTileIndex.status, character.identification)
        }
      }

      const newPositionY = Math.floor(movedToTileIndex  / config.mazeColumns) * config.tileSizeInPx;
      const newPositionX = Math.floor(movedToTileIndex % config.mazeColumns) * config.tileSizeInPx;

      newCharacterState.push({
        ...character,
        index: movedToTileIndex,
        positionX: newPositionX,
        positionY: newPositionY,
        direction: choosedDirection.direction,
        moving: true,
        nextDirection: choosedDirection.use === 'newDirection' ? null : character.nextDirection,
      })
    })

    return {mazeState: newMazeState, charactersState: newCharacterState}
  }

  const handleGameTick = () => {
    setFullMazeState(currentValue => {

      const newState = createNextMazeState(currentValue)
      return {
        ...currentValue,
        mazeState: newState.mazeState,
        charactersState: newState.charactersState,
      }
    });
  }

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
    const newDirection: Directions = keyPressedToDirection[keyPressed];
    
    setFullMazeState(fullMazeState => {
      const newcharactersState = [...fullMazeState.charactersState.filter(character => character.type !== 'pacman')]
      
      const pacManState = {
        ...fullMazeState.charactersState.find(character => character.identification === Tiles.pacman),
        nextDirection: newDirection
      } as CharacterStateType;

      newcharactersState.unshift(pacManState);

      return {
        ...fullMazeState,
        charactersState: newcharactersState
      }
    })
  }


  //gameTick
  useEffect(function gameTick() {
    const timeOutSpeed = 100;
    const timer = setInterval(() => {
      const timeNow = new Date().getTime();

      if((lastTime + (config.pacmanSpeed * 1000)) < timeNow){
        setLastTime(timeNow);
        handleGameTick();
      }


    }, timeOutSpeed)

    return () => clearInterval(timer)
  }, [fullMazeState, lastTime]);


  //control point visibility
  useEffect(function setTilePointToHidden() {
    const maze = fullMazeState.mazeState;
    if(maze.length){
      fullMazeState.mazeState.forEach((tile, index) => {
        if (tile.point === false || tile.power === false && tile.originalTile === '_') {
          document.documentElement.style.setProperty(`${config.pointCssVar}${index}`, '0');
        }
      })
    }
  }, [fullMazeState])


  //control keyPressed
  useEffect(function addEventListenerKeyDown() {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fullMazeState])


  return <></>
}

export default PacmanControls