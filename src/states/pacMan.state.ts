import { atom } from 'recoil'
import Directions from '../types/directions';

export type PacManStateType = {
  x: number;
  y: number;
  lives: number;
  moving: boolean;
  teleporting: boolean;
  direction: Directions;
  nextDirection: Directions;
  position: [number, number];
  powered: boolean;
}

const x = 13.5;
const y = 24;

const PacManState = atom<PacManStateType>({
  key: 'PacManState', // unique ID (with respect to other atoms/selectors)
  default: {
    x: x,
    y: y,
    lives: 3,
    moving: false,
    teleporting: false,
    direction: 'left',
    nextDirection: 'left',
    position: [x,y],
    powered: false
  }, // default value (aka initial value)
});

export default PacManState