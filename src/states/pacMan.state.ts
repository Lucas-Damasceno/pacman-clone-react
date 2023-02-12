import { atom } from 'recoil'
import Directions from '../types/directions';

type PacManStateType = {
  x: number;
  y: number;
  lives: number;
  moving: boolean;
  teleporting: boolean;
  direction: Directions;
  nextDirection: Directions | undefined;
  position: [number, number];
  powered: boolean;
}

const PacManState = atom<PacManStateType>({
  key: 'PacManState', // unique ID (with respect to other atoms/selectors)
  default: {
    x: 13.5,
    y: 18,
    lives: 3,
    moving: false,
    teleporting: false,
    direction: 'left',
    nextDirection: undefined,
    position: [0,0],
    powered: false
  }, // default value (aka initial value)
});

export default PacManState