import MazeMap from "../components/maze/mazeMap"
import { GhostStateType } from "../states/ghosts.state"
import { PacManStateType } from "../states/pacMan.state"
import { CharacterType } from "../types/characterType"
import Directions from "../types/directions"
import { IndexObject } from "../types/indexObject"
import PossibleTiles from "../types/possibleTiles"

const getAdjacentTiles = (positionXY: [number, number]): IndexObject<Directions, PossibleTiles>  => {
  const mazeMap = MazeMap.mazeMapXY
  const x = Math.floor(positionXY[0]);
  const y = Math.floor(positionXY[1]);

  const up = y - 1;
  const down = y + 1;
  const right = x + 1;
  const left = x - 1;

  const adjacentTiles = {
    up: mazeMap[up]?.[x],
    down: mazeMap[down]?.[x],
    left: mazeMap[y]?.[left],
    right: mazeMap[y]?.[right]
  } as IndexObject<Directions, PossibleTiles>

  return adjacentTiles
}

export const canMove = (characterState: GhostStateType | PacManStateType) => {
  const adjacentTiles = getAdjacentTiles(characterState.position);
  const possibleBlockableTiles: PossibleTiles[] = ['x', '-', '|', '='];
  let blockableTiles: PossibleTiles[] = [...possibleBlockableTiles];

  if('onlyEyes' in characterState){
    blockableTiles = possibleBlockableTiles.filter(tile => tile !== '-');
  }

  const _canMove: IndexObject<Directions, boolean> = {
    up: !blockableTiles.includes(adjacentTiles.up),
    right: !blockableTiles.includes(adjacentTiles.right),
    left: !blockableTiles.includes(adjacentTiles.left),
    down: !blockableTiles.includes(adjacentTiles.down),
  }

  return _canMove
}

export const getNewPositionXY = (positionXY: [number,number], direction: Directions): [number,number] => {
  const [x, y] = positionXY;
  let newX = Math.floor(x);
  let newY = Math.floor(y);

  const position = {
    up: y - 1,
    down: y + 1,
    right: x + 1,
    left: x - 1,
  }

  if(direction === 'right' || direction === 'left'){
    newX = position[direction]
  }

  if(direction === 'up' || direction === 'down'){
    newY = position[direction]
  }

  return [newX, newY]
}

export const getContraryDirection = (direction: Directions) => {
  const directions: IndexObject<Directions, Directions> = {
    up: "down",
    right: "left",
    down: "up",
    left: "right",
  }

  return directions[direction]
}
