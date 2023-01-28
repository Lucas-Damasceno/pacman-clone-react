import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
import config from '../config/config';
import { Tiles } from '../enums/tiles.enum';
import { CharacterStateType } from '../types/characterStateType';
import PossibleTiles, { CharacterChar } from '../types/possibleTiles';

export type MazeStateType = {
  status: PossibleTiles[],
  point: boolean,
  power: boolean,
  originalTile: PossibleTiles,
}

export type FullMazeStateType = {
  charactersState: CharacterStateType[],
  mazeState: MazeStateType[],
  score: number
}

const initMazeState = () => {
  const filteredMap = MazeMap.filteredMap();
  const mapChars = filteredMap.split('') as PossibleTiles[];

  const initialMazeMapState = mapChars.map(char => {
    return {
      point: char === Tiles.point,
      power: char === Tiles.power,
      status: [char],
      originalTile: char
    }
  });

  return initialMazeMapState
}

const getInitialIndexOfPacman = (): number => {
  const map = MazeMap.filteredMap();
  return  map.indexOf('P')
}

const getInitialIndexOfGhost = (ghostIdentification: '1' | '2' | '3' | '4') => {
  const map = MazeMap.filteredMap().split('');
  return map.indexOf(ghostIdentification)
}

const initCharactersState = (): CharacterStateType[] => {
  const ghosts = ['1', '2', '3', '4'] as const;
  const generateGhostsState = () => {
    return ghosts.map(ghost => {
      const ghostSpawnIndex = getInitialIndexOfGhost(ghost)
      return {
        identification: ghost,
        direction: 'right',
        nextDirection: null,
        positionX: Math.floor(ghostSpawnIndex % config.mazeColumns) * config.tileSizeInPx,
        positionY: Math.floor(ghostSpawnIndex / config.mazeColumns) * config.tileSizeInPx,
        moving: false,
        teleporting: false,
        index: ghostSpawnIndex,
        type: 'ghost',
        color: undefined
      } as CharacterStateType
    })
  }

  const pacmanSpawnIndex = getInitialIndexOfPacman();
  const pacmanInitialState: CharacterStateType = {
    identification: 'P',
    direction: 'left',
    nextDirection: null,
    positionX: Math.floor(pacmanSpawnIndex % config.mazeColumns) * config.tileSizeInPx,
    positionY: Math.floor(pacmanSpawnIndex / config.mazeColumns) * config.tileSizeInPx,
    moving: false,
    teleporting: false,
    index: pacmanSpawnIndex,
    type: 'pacman',
    color: undefined
  };

  console.log(generateGhostsState())
  return [pacmanInitialState, ...generateGhostsState()]
}

const FullMazeState = atom<FullMazeStateType>({
  key: 'FullMazeState', // unique ID (with respect to other atoms/selectors)
  default: {
    charactersState: initCharactersState(),
    mazeState: initMazeState(),
    score: 0,
  },
});

export default FullMazeState