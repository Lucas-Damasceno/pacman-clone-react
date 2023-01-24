import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
import Directions from '../types/directions';

type PacmanStateType = {
  direction: Directions;
  nextDirection: Directions | null;
  positionX: number;
  positionY: number;
  index: number;
}

const getInitialIndexOfPacman = (): number => {
  const map = MazeMap.filteredMap();
  return  map.indexOf('P')
}

const PacmanState = atom<PacmanStateType>({
  key: 'pacmanState', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    nextDirection: null,
    positionX: 0,
    positionY: 0,
    index: getInitialIndexOfPacman(),
  }, // default value (aka initial value)
});

export default PacmanState