import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { noWait, useRecoilState } from 'recoil';
import config from "../../config/config";
import { Tiles } from "../../enums/tiles.enum";
import FullMazeState, { FullMazeStateType, MazeStateType } from "../../states/fullMaze.state";
import { CharacterStateType } from "../../types/characterStateType";
import { CharacterType } from "../../types/characterType";
import Directions from "../../types/directions";
import { IndexObject } from "../../types/indexObject";
import { GhostKey } from "../../types/ghostKey";
import PossibleTiles, { CharacterChar } from "../../types/possibleTiles";
import MazeMap from "../maze/mazeMap";

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

type ChoosedDirection = {
  use: 'newDirection' | 'direction',
  direction: Directions,
  canMove: boolean,
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

  const canMove = (charType: CharacterType, direction: Directions, characterIndex: number, newMazeState: MazeStateType[], ghostEyes: boolean = false) => {
    const blockableTilesFor: IndexObject<CharacterType, PossibleTiles[]> = {
      ghost: [Tiles.wall, Tiles.wallHorizontal, Tiles.wallVertical ],
      pacman: [Tiles.wall, Tiles.wallHorizontal, Tiles.ghostGate, Tiles.wallVertical],
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

    if(tileToMove.originalTile === Tiles.ghostGate && direction === 'down' && ghostEyes === false){
      return false
    }

    return canMoveToTile
  }

  const isTeleporting = (character: CharacterStateType) => {
    if(character.index === -1) {
      return false
    }

    const teleports: PossibleTiles[] = [Tiles.teleportLeft, Tiles.teleportRight];
    const actualTile = fullMazeState.mazeState[character.index];

    if (teleports.includes(actualTile.originalTile) && character.teleporting === false) {
      console.log(true)
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
  const directionOrNewDirection = (character: CharacterStateType, mazeState: MazeStateType[]): ChoosedDirection => {
    if (character.nextDirection !== null) {
      const canMovenewDirection: boolean = canMove(character.type, character.nextDirection, character.index, mazeState);
      if (canMovenewDirection) {
        return {
          use: 'newDirection',
          direction: character.nextDirection,
          canMove: canMovenewDirection
        }
      }
    }

    const canMoveDirection: boolean = canMove(character.type, character.direction, character.index, mazeState);
    return {
      use: 'direction',
      direction: character.direction,
      canMove: canMoveDirection
    }
  }

  const getTileStatus = (tileStatus: PossibleTiles[], itemToAdd: PossibleTiles) => {
    const newStatus = [...tileStatus].filter(tile => tile !== Tiles.point && tile !== Tiles.power);

    if (tileStatus.includes(itemToAdd)) {
      return newStatus
    } else {
      return [...newStatus, itemToAdd]
    }
  }

  const createNextMazeState = (fullMazeState: FullMazeStateType) => {
    const newMazeState = [...fullMazeState.mazeState];
    const newCharacterState: CharacterStateType[] = [];
    let newScore = fullMazeState.score;

    fullMazeState.charactersState.forEach(character => {
      const choosedDirection: ChoosedDirection = directionOrNewDirection(character, fullMazeState.mazeState);      
            
      let characterPowered = character.powered;
      let countingPoweredForManyTicks = character.poweredForManyTicks;
      const isTeleportingChar = isTeleporting(character);
      
      if(characterPowered){
        countingPoweredForManyTicks = countingPoweredForManyTicks + 1;

        if(countingPoweredForManyTicks >= config.maximumTimePoweredInTicks){
          characterPowered = false;
          countingPoweredForManyTicks = 0;
        }
      }

      //Se o personagem nao andou
      if (choosedDirection.canMove === false && isTeleportingChar === false) {
        newCharacterState.push({
          ...character,
          powered: characterPowered,
          poweredForManyTicks: countingPoweredForManyTicks,
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
            return !ghosts.includes(char);
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
        //Adiciona ponto ao Score se ponto ou poder
        if(newMazeState[movedToTileIndex]){
          const point = newMazeState[movedToTileIndex].status.includes(Tiles.point);
          const power = newMazeState[movedToTileIndex].status.includes(Tiles.power);
          
          characterPowered = characterPowered || power;
          countingPoweredForManyTicks = power ? 0 : countingPoweredForManyTicks;

          if(point){
            newScore = newScore + config.pointValue;
          }
        }

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

      const newState: CharacterStateType = {
        ...character,
        index: movedToTileIndex,
        positionX: newPositionX,
        positionY: newPositionY,
        direction: choosedDirection.direction,
        teleporting: isTeleportingChar,
        moving: true,
        powered: characterPowered,
        poweredForManyTicks: countingPoweredForManyTicks,
        nextDirection: choosedDirection.use === 'newDirection' ? null : character.nextDirection,
      }

      newCharacterState.push(newState)
    })

    return { mazeState: newMazeState, charactersState: newCharacterState, score: newScore }
  }

  const handleGameTick = () => {
    setFullMazeState(currentValue => {
      const fullMazeValue = ghostIA(currentValue);

      const newState = createNextMazeState(fullMazeValue);

      return {
        ...currentValue,
        score: newState.score,
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

  const getAdjacentTilesIndex = (index: number) => {
    const adJacentTilesIndex: IndexObject<Directions, number> = {
      up: index - config.mazeColumns,
      down: index + config.mazeColumns,
      left: index - 1,
      right: index + 1
    }

    return adJacentTilesIndex
  }

  const getXY = (index: number) => {
    const positionX = Math.floor(index % config.mazeColumns);
    const positionY = Math.floor(index / config.mazeColumns);

    return [positionX, positionY]
  }

  const getDirectionsDistance = (tileIndex: number, targetIndex: number) => {
    const adTiles = getAdjacentTilesIndex(tileIndex);
    const directionsDistance: number[] = [];
    Object.entries(adTiles).forEach(directionTile => {
      const directionName: Directions = directionTile[0] as Directions;
      const directionValue = directionTile[1];
      const [positionX, positionY] = getXY(directionValue);
      const [targetX, targetY] = getXY(targetIndex);
      const distance = Math.sqrt((positionX - targetX) ** 2 + (positionY - targetY) ** 2);

      //segue a ordem do box model
      const directionIndex: IndexObject<Directions, number> = {
        up: 0,
        right: 1,
        down: 2,
        left: 3
      }
      directionsDistance[directionIndex[directionName]] = distance;
    })

    const directionArr:{direction: Directions, distance: number}[] = [
      {direction: 'up', distance: directionsDistance[0]},
      {direction: 'right', distance: directionsDistance[1]},
      {direction: 'down', distance: directionsDistance[2]},
      {direction: 'left', distance: directionsDistance[3]},
    ]

    //Reordena pela menor distancia primeiro
    directionArr.sort((a,b) => {
      if(a.distance < b.distance){
        return -1
      }

      if(a.distance > b.distance){
        return 1
      }

      return 0
    })

    // return directionsDistance
    return directionArr
  }

  const getContraryDirection = (direction: Directions) => {
    const directions: IndexObject<Directions, Directions> = {
      up: "down",
      right: "left",
      down: "up",
      left: "right",
    }

    return directions[direction]
  }

  const getTargets = (pacManIndex: number, pacManDirection: Directions) => {
    const pinkyPossibleTarget: IndexObject<Directions, number> = {
      up: pacManIndex - (config.mazeColumns * 4) - 4,
      down: pacManIndex + (config.mazeColumns * 4),
      right: pacManIndex + 4,
      left: pacManIndex - 4,
    }

    const blinkyPossibleTarget: IndexObject<Directions, number> = {
      up: pacManIndex + (config.mazeColumns * 4) - 4,
      down: pacManIndex - (config.mazeColumns * 4),
      right: pacManIndex - 4,
      left: pacManIndex + 4,
    }

    const max = config.mazeColumns * config.mazeRows;
    const min = 1;
    const clydeTarget = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
      pinky: pinkyPossibleTarget[pacManDirection],
      blinky: blinkyPossibleTarget[pacManDirection],
      clyde: clydeTarget
    }
  }

  //GHOST IA
  const ghostIA = (currentFullMazeState: FullMazeStateType): FullMazeStateType => {
    const mazeState = {...currentFullMazeState};

    const ghostCaracters = currentFullMazeState.charactersState.filter(character => character.type === 'ghost');
    const pacManState = currentFullMazeState.charactersState.find(character => character.type === 'pacman')!;
    const pacManIndex = pacManState.index;
    
    
    const newGhostsState = ghostCaracters.map(ghostCharacter => {
      let movedGhost: boolean = false;
      const ghost = {...ghostCharacter};

      const targetsObj = getTargets(pacManIndex, pacManState.direction);

      const targets: IndexObject<GhostKey, number> = {
        //Blinky, red Ghost
        "1": pacManIndex,
        //Inky, cyan Ghost
        "2": targetsObj.blinky,
        //Pinky, pink Ghost
        "3": targetsObj.pinky,
        //Clyde, orange Ghost
        "4": targetsObj.clyde,
      }

      let target: number = targets[ghost.identification as GhostKey];
      
      let [ghostCageBeginX, ghostCageBeginY] = getXY(config.ghostCage.begin);
      let [ghostCageEndX, ghostCageEndY] = getXY(config.ghostCage.end);
      const [ghostX, ghostY] = getXY(ghost.index);
      
      //Necessário por conta do ghostGate
      ghostCageBeginY = ghostCageBeginY - 1;

      if(ghostX >= ghostCageBeginX && ghostX < ghostCageEndX && ghostY >= ghostCageBeginY && ghostY <= ghostCageEndY ){
        //Se estiver na gaiola, manda ele pra posição inicial do primeiro
        target = MazeMap.filteredMap().indexOf('1');
      }
      
      const directionsDistance = getDirectionsDistance(ghost.index, target);

      directionsDistance.forEach(possibleMovement => {
        const contraryDirection = getContraryDirection(possibleMovement.direction);
        
        if(movedGhost === false && ghost.direction !== contraryDirection){
          const ghostCanMove = canMove(ghost.type, possibleMovement.direction, ghost.index, currentFullMazeState.mazeState);
          if(ghostCanMove) {
            ghost.direction = possibleMovement.direction;
            movedGhost = true;
          }

        }
      })

      return ghost
    })

    // debugger

    return {
      ...mazeState,
      charactersState: [ pacManState, ...newGhostsState]
    }
  }

  //gameTick
  useEffect(function gameTick() {
    const timeOutSpeed = 1;
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