import { atom } from 'recoil'
import Directions from '../components/types/directions';

type PacmanStateType = {
  direction: Directions;
  positionX: string;
  positionY: string;
}

const PacmanState = atom<PacmanStateType>({
  key: 'pacmanState', // unique ID (with respect to other atoms/selectors)
  default: {
    direction: 'left',
    positionX: '',
    positionY: '',
  }, // default value (aka initial value)
});

export default PacmanState