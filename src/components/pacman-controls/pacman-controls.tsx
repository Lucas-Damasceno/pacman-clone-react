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

type HorizontalDirections = 'right' | 'left';


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

  const isTeleporting = (character: CharacterStateType) => {
    const teleports: PossibleTiles[] = [Tiles.teleportLeft, Tiles.teleportRight];
    const actualTile = fullMazeState.mazeState[character.index];
    if (teleports.includes(actualTile.originalTile) && character.teleporting === false) {
      return true
    }

    return false
  }

  const teleportToIndex = (direction: 'left' | 'right'): number => {
    const teleportTo = {
      right: fullMazeState.mazeState.findIndex(item => item.originalTile === Tiles.teleportLeft),
      left: fullMazeState.mazeState.findIndex(item => item.originalTile === Tiles.teleportRight),
    }

    return teleportTo[direction]
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
    if (newDirection !== null) {
      const canMovenewDirection: boolean = canMove(characterType, newDirection, tileIndex, mazeState);
      if (canMovenewDirection) {
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

  const getTileStatus = (tileStatus: PossibleTiles[], itemToAdd: PossibleTiles) => {
    const newStatus = [...tileStatus].filter(tile => tile !== Tiles.point);

    if (tileStatus.includes(itemToAdd)) {
      return newStatus
    } else {
      return [...newStatus, itemToAdd]
    }
  }

  const createNextMazeState = (fullMazeState: FullMazeStateType) => {
    const newMazeState = [...fullMazeState.mazeState];
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
      const tileIndex = newMazeState[character.index];

      if (character.type === 'pacman') {
        newMazeState[character.index] = {
          ...tileIndex,
          point: false,
          power: false,
          status: tileIndex.status.filter(char => char !== Tiles.pacman)
        }
      }

      if (character.type === 'ghost') {
        newMazeState[character.index] = {
          ...newMazeState[character.index],
          status: tileIndex.status.filter(char => {
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

      let movedToTileIndex = moveToIndex[choosedDirection.direction];

      let nexTileIndex = fullMazeState.mazeState[movedToTileIndex];

      const isTeleportingChar = isTeleporting(character);

      if(isTeleportingChar){
        const teleportIndexObject: IndexObject<'<' | '>' , HorizontalDirections> = {
          '<': 'left',
          '>': 'right'
        }

        const teleportDirection: HorizontalDirections = teleportIndexObject[tileIndex.originalTile as '<' | '>'];
        movedToTileIndex = teleportToIndex(teleportDirection);
        nexTileIndex = fullMazeState.mazeState[movedToTileIndex];
      }

      if (character.type === 'pacman') {
        newMazeState[movedToTileIndex] = {
          ...nexTileIndex,
          point: false,
          power: false,
          status: getTileStatus(nexTileIndex.status, character.identification)
        }
      }

      if (character.type === 'ghost') {
        newMazeState[movedToTileIndex] = {
          ...nexTileIndex,
          status: getTileStatus(nexTileIndex.status, character.identification)
        }
      }

      const newPositionY = Math.floor(movedToTileIndex / config.mazeColumns) * config.tileSizeInPx;
      const newPositionX = Math.floor(movedToTileIndex % config.mazeColumns) * config.tileSizeInPx;

      newCharacterState.push({
        ...character,
        index: movedToTileIndex,
        positionX: newPositionX,
        positionY: newPositionY,
        direction: choosedDirection.direction,
        teleporting: isTeleportingChar,
        moving: true,
        nextDirection: choosedDirection.use === 'newDirection' ? null : character.nextDirection,
      })
    })

    return { mazeState: newMazeState, charactersState: newCharacterState }
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

  //TODO adicionar um sistema de Debounce para não travar o Pacman
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




  //GHOST IA

  //gameTick
  useEffect(function gameTick() {
    const timeOutSpeed = 10;
    const timer = setInterval(() => {
      const timeNow = new Date().getTime();
      if ((lastTime + (config.pacmanSpeed * 1000)) < timeNow) {
        setLastTime(timeNow);
        handleGameTick();
      }
    }, timeOutSpeed)
    return () => clearInterval(timer)
  }, [fullMazeState, lastTime]);

  //control point visibility
  useEffect(function setTilePointToHidden() {
    fullMazeState.mazeState.forEach((tile, index) => {
      if ( 
        tile.originalTile === Tiles.point && tile.point === false ||
        tile.originalTile === Tiles.power && tile.power === false 
      ) {
        document.documentElement.style.setProperty(`${config.pointCssVar}${index}`, '0');
      }
    })

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