import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
import { CharacterStateType } from '../types/characterStateType';
import Directions from '../types/directions';


const getInitialIndexOfGhost = (ghostIdentification: '1' | '2' | '3' | '4') => {
  const map = MazeMap.filteredMap();
  return map.indexOf(ghostIdentification)
}

export const Ghost1State = atom<CharacterStateType>({
  key: 'ghost1State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    moving: false,
    index: getInitialIndexOfGhost('1'),
    type: 'ghost',
    color: ''
  }, // default value (aka initial value)
});

export const Ghost2State = atom<CharacterStateType>({
  key: 'ghost2State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    moving: false,
    index: getInitialIndexOfGhost('2'),
    type: 'ghost',
    color: ''
  }, // default value (aka initial value)
});

export const Ghost3State = atom<CharacterStateType>({
  key: 'ghost3State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    moving: false,
    index: getInitialIndexOfGhost('3'),
    type: 'ghost',
    color: ''
  }, // default value (aka initial value)
});

export const Ghost4State = atom<CharacterStateType>({
  key: 'ghost4State', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    moving: false,
    index: getInitialIndexOfGhost('4'),
    type: 'ghost',
    color: ''
  }, // default value (aka initial value)
});


export default Ghost1State