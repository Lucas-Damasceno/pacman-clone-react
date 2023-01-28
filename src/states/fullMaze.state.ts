import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
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
  const map = MazeMap.filteredMap();
  return map.indexOf(ghostIdentification)
}

const initCharactersState = (): CharacterStateType[] => {
  const ghosts = ['1', '2', '3', '4'] as const;
  const generateGhostsState = () => {
    return ghosts.map(ghost => {
      return {
        identification: ghost,
        direction: 'up',
        nextDirection: null,
        positionX: 0,
        positionY: 0,
        moving: false,
        teleporting: false,
        index: getInitialIndexOfGhost(ghost),
        type: 'ghost',
        color: ''
      } as CharacterStateType
    })
  }
  
  const pacmanInitialState: CharacterStateType = {
    identification: 'P',
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    moving: false,
    teleporting: false,
    index: getInitialIndexOfPacman(),
    type: 'pacman',
    color: ''
  };

  return [pacmanInitialState, ...generateGhostsState()]
}

const FullMazeState = atom<FullMazeStateType>({
  key: 'FullMazeState', // unique ID (with respect to other atoms/selectors)
  default: {
    charactersState: initCharactersState(),
    mazeState: initMazeState(),
  },
});

export default FullMazeState