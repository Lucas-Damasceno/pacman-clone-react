import { atom } from 'recoil'
import MazeMap from '../components/maze/mazeMap';
import config from '../config/config';
import Directions from '../types/directions';

type PacmanStateType = {
  direction: Directions;
  nextDirection: Directions | null;
  positionX: number;
  positionY: number;
  index: number;
  moving: boolean;
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
    moving: false,
    index: getInitialIndexOfPacman(),
  }, // default value (aka initial value)
  effects: [
    // ({onSet}) => {
    //   onSet(pacmanStateValue => {
    //     document.documentElement.style.setProperty(`${config.pacmanXCssVar}`, `${pacmanStateValue.positionX}`);
    //     document.documentElement.style.setProperty(`${config.pacmanYCssVar}`, `${pacmanStateValue.positionY}`);

    //     const pacManDirectionStyle = {
    //       up: '90deg',
    //       down: '-90deg',
    //       left: '0deg',
    //       right: '180deg',
    //     }
    //     document.documentElement.style.setProperty(`${config.pacmanDirection}`, `${pacManDirectionStyle[pacmanStateValue.direction]}`);
    //   })
    // }
  ]
});

export default PacmanState