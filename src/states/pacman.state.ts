import { atom } from 'recoil'
import Directions from '../components/types/directions';

type PacmanStateType = {
  direction: Directions;
  positionX: number;
  positionY: number;
  index: number;
}

const PacmanState = atom<PacmanStateType>({
  key: 'pacmanState', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: 0,
    positionY: 0,
    index: 0,
  }, // default value (aka initial value)
});

export default PacmanState